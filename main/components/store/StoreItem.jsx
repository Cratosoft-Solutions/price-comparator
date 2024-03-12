"use client";
import React, { useEffect, useState } from 'react';
import DragDropFiles from '@components/DragDropFiles';
import Modal from '@components/Modal';
import {
  PRODUCT_SAVE_CONFIRM_ACTION,
  CATEGORY_TYPES,
  IMAGE_MAX_PASSED,
  IMAGE_FAILED_CONFIRM_ACTION,
  GENERAL_UKNOWN_ERROR,
  GENERAL_SUCCESS_PROCESS,
  CURRENCY_LIST,
  GENERAL_YESNO,
  SERVICES_TYPES,
  MODALITY_TYPES,
  PROVINCES
} from "@utils/constants";
import { getSession, signIn } from "next-auth/react";
import Loading from '@app/loading';
import axios from 'axios';
import CurrencyInput from '@components/CurrencyInput';
import DropDownList from '@components/DropDownList';
import UploadedImage from '@components/UploadedImage';
import { useSelector } from "react-redux";
import { genericCompression } from '@utils/functions';
import CarInfo from './CarInfo';
import { IoIosCloseCircleOutline } from "react-icons/io";
import ServicesInfo from './ServicesInfo';



const StoreItem = ({ editMode=false, product, onCloseFunction }) => {
    const [loading, setLoading]  =  useState(true);
    const [showConfirmAction, setShowConfirmAction] = useState(false);
    const [modalActionInfo, setModalActionInfo] = useState({});
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [nameLabel, setNameLabel] = useState('Nombre del item.');
    const [descriptionLabel, setDescriptionLabel] = useState('Descripción del item.');
    const [priceLabel, setPriceLabel] = useState('Precio del item.');
    const [stock, setStock] = useState(1);
    const [description, setDescription] = useState('');
    const [negotiable, setNegotiable] = useState('NO');
    const [category, setCategory] = useState('PRODUCT');
    const [serviceType, setServiceType] = useState(SERVICES_TYPES[0].value);
    const [modalityType, setModalityType] = useState(MODALITY_TYPES[0].value);
    const [province, setProvince] = useState(PROVINCES[0].value);
    const [price, setPrice] = useState(null);
    const [specialPrice, setSpecialPrice] = useState(null);
    const [currency, setCurrency] = useState(CURRENCY_LIST[0].value);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [store, setStore] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const categoryList = CATEGORY_TYPES;
    const servicesList = SERVICES_TYPES;
    const modalityList = MODALITY_TYPES;
    const provinceList = PROVINCES;
    const { expandedNavBar } = useSelector(state => state.verticalnav.myStoreNav);
    const [carInfo, setCarInfo] = useState({brand:"SELECT", model:"",cc:"", style:"SELECT",passengers:1,year: new Date().getFullYear(), status:1, combustible:1, transmition:1,kms:"",kmstype:"1", taxes:"NO",otherCar:"NO",doors:1, province:"SJO", equipment:[]});

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
      setSelectedOption(value);
    };

    useEffect(() => {
      const securePage = async () => {
        const session = await getSession();
        if (!session) {
          signIn();
        } else {
            const storeInfo = await axios.get(`/api/user/${session.user.id}/store/`);
            console.log(storeInfo);
            setStore(storeInfo.data._id);
            if(product != undefined && product.category === 'SERVICES'){
              setNameLabel("Nombre del servicio.");
              setDescriptionLabel("Descripcion del servicio.");
              setPriceLabel("Precio del servicio.");
            }
            setLoading(false);
        }
      };
      securePage();

      if(editMode){
        setId(product.productId);
        setCategory(product.category);
        setName(product.productName);
        setDescription(product.productDescription);
        setStock(product.stock);
        setPrice(product.productPrice);
        setSpecialPrice(product.productSpecialPrice);
        setNegotiable(product.negotiable);
        setCurrency(product.currency);
        setImages(product.productImage);
        if (product.category === 'SERVICES') {
          setServiceType(product.serviceType);
          setModalityType(product.modalityType);
          setProvince(product.province);
        }
        if(product.category=="CAR"){
            setCarInfo(product.otherInformation);
        }
      }

    }, []);

    
    const restartForm = ()=>{
        setId(null);
        setName('');
        setDescription('');
        setPrice(null);
        setSpecialPrice(null);
        setCurrency(CURRENCY_LIST[0].value);
        setImages([]);
        setCategory(categoryList[0].value);
        setServiceType(SERVICES_TYPES[0].value);
        setModalityType(MODALITY_TYPES[0].value);
        setProvince(PROVINCES[0].value);
    }

    const restartFormWithoutCategory = ()=>{
        setId(null);
        setName('');
        setDescription('');
        setPrice(null);
        setSpecialPrice(null);
        setCurrency(CURRENCY_LIST[0].value);
        setImages([]);
        setServiceType(SERVICES_TYPES[0].value);
        setModalityType(MODALITY_TYPES[0].value);
        setProvince(PROVINCES[0].value);
    }

    const confirmAction = (e) =>{
        e.preventDefault();
        if(category=="CAR" && (carInfo.brand =="SELECT"|| carInfo.style =="SELECT")){+
            setModalActionInfo({ ...GENERAL_UKNOWN_ERROR,message: "Favor selecciona la marca y estilo del vehículo." });
        }else{
            setModalActionInfo(PRODUCT_SAVE_CONFIRM_ACTION);
        }
        setShowConfirmAction(true);
    }

    const onConfirm = async(processToExecute)=>{
            if (processToExecute === "SAVEPRODUCT") {
                    setLoading(true);
                    axios.post(`/api/product/save`, {
                        id:id,
                        store: store,
                        name: name,
                        description: description,
                        category:category,
                        stock:stock? stock.toString().replaceAll(",", ""):0,
                        price: price?price.toString().replaceAll(",", ""):0,
                        especialprice: specialPrice? specialPrice.toString().replaceAll(",", ""):0,
                        negotiable:  negotiable,
                        currency: currency,
                        image: genericCompression(images, "compress"),
                        otherItemInformation: category == "CAR"? JSON.stringify(carInfo):null,
                        serviceType: category === 'SERVICES'? serviceType : null,
                        modalityType: category === 'SERVICES'? modalityType : null,
                        province: category === 'SERVICES'? province : null
                      })
                      .then((response) => {
                        if(!editMode){
                            restartForm()
                        }
                        
                        setLoading(false);
                        setModalActionInfo(GENERAL_SUCCESS_PROCESS);
                        setShowConfirmAction(true);
                      })
                      .catch((error) => {
                        setLoading(false);
                        setModalActionInfo({
                          ...GENERAL_UKNOWN_ERROR,
                          message: error.message,
                        });
                        setShowConfirmAction(true);
                      });
            }else{
                setShowConfirmAction(false);
            }
    }

    const onCancel = ()=>{
        setShowConfirmAction(false);
    }

    const setInternalImage =(selectedImages, error)=>{
        console.log(selectedImages);
        if(selectedImages===null){
            setModalActionInfo({...IMAGE_FAILED_CONFIRM_ACTION, message:error})
            setShowConfirmAction(true);
        }
        else{
            if(images.length + selectedImages.length > 5){
                setModalActionInfo({...IMAGE_MAX_PASSED})
                setShowConfirmAction(true);
            }else{
                selectedImages.forEach(element => {
                    setImages(oldArray => [...oldArray, element]);    
                });
            }
            
        }        
    }

    const showInternalImage =(index) => {
        setSelectedImage(index);
        setShowImage(true);
    }

    const deleteImage =(indexFiltered)=>{
        setImages(images.filter((image, index) => index != indexFiltered))
    }

    
    const setInternalCarInfo =(field, value) => {
        if(field == "equipment"){
            let equipmentToSet = carInfo.equipment;
            if (equipmentToSet.filter(element => element == value)[0]){
                equipmentToSet = equipmentToSet.filter(element => element != value);   
            }else{
                equipmentToSet.push(value);
            }
            setCarInfo({...carInfo , [field]:equipmentToSet}); 
        }else{
            setCarInfo({...carInfo , [field]:value}); 
        }   
        console.log(carInfo);
    } 

    const setCategoryOnChange = (category) => {
      restartFormWithoutCategory();
      setCategory(category);
      switch (category) {
        case 'SERVICES':
          setNameLabel("Nombre del servicio.");
          setDescriptionLabel("Descripcion del servicio.");
          setPriceLabel("Precio del servicio.");
          break;
        default:
          setNameLabel("Nombre del item.");
          setDescriptionLabel("Descripción del item.");
          setPriceLabel("Precio del item.");
          break;
      }
    };
        
    if(loading)
      return <Loading/>

  return (
    <>
      <form
        method="POST"
        onSubmit={confirmAction}
        className={`relative bg-white mt-4 lg:mt-0 p-4 lg:bg-gray-100 lg:pl-6 lg:pr-6 ${
          expandedNavBar && !editMode
            ? "ml-0 lg:ml-52"
            : `ml-0 lg:ml-${editMode ? 0 : 10}`
        }`}
      >
        {" "}
        {
          <IoIosCloseCircleOutline
            className="absolute top-2 right-2 w-8 h-8"
            color="red"
            onClick={onCloseFunction}
          />
        }
        {showConfirmAction && (
          <Modal
            modalActionInfo={modalActionInfo}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
        <div className="w-full max-w-screen-lg">
          <h2 className=" mt-1 font-semibold text-2xl lg:text-4xl lg:h-12 text-black orange_gradient">
            Configuración de items
          </h2>
          <p className="text-black mb-1 lg:mb-6 ">
            ¡Bienvenido a la configuración de tu cuenta!
          </p>

          <div className=" storepages bg-white p-10 rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-black">
                <p className="font-medium text-lg">Configuración de items</p>
                <p>
                  Favor complete todos los campos para ingresar un nuevo item.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5 relative">
                    <DropDownList
                      additionalClass="rounded-t-lg"
                      onSelectValue={setCategoryOnChange}
                      values={categoryList}
                      type="text"
                      required
                      name="category"
                      id="category"
                      currentValue={category}
                    />
                    <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                      Sección en que se mostrará el producto.
                    </div>
                  </div>

                  <div className="md:col-span-5 relative">
                    <input
                      type="text"
                      required
                      name="name"
                      id="name"
                      className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        name
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      {nameLabel}
                    </div>
                  </div>
                  <div className="md:col-span-5 relative">
                    <input
                      type="text"
                      required
                      name="description"
                      id="description"
                      className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        description
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      {descriptionLabel}
                    </div>
                  </div>

                  {category === "SERVICES" && (
                    <>
                    <div className="md:col-span-5 relative">
                      <DropDownList
                        additionalClass="rounded-t-lg"
                        onSelectValue={setServiceType}
                        values={servicesList}
                        type="text"
                        required
                        name="serviceType"
                        id="serviceType"
                        onChange={(e) => {
                          setServiceType(e.target.value);
                        }}
                        currentValue={serviceType}
                      />
                      <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                        Categoría del servicio.
                      </div>
                    </div>
                    <div className="md:col-span-5 relative">
                      <DropDownList
                        additionalClass="rounded-t-lg"
                        onSelectValue={setModalityType}
                        values={modalityList}
                        type="text"
                        required
                        name="modalityType"
                        id="modalityType"
                        onChange={(e) => {
                          setModalityType(e.target.value);
                        }}
                        currentValue={modalityType}
                      />
                      <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                        Modalidad
                      </div>
                    </div>
                    <div className="md:col-span-5 relative">
                      <DropDownList
                        additionalClass="rounded-t-lg"
                        onSelectValue={setProvince}
                        values={provinceList}
                        type="text"
                        required
                        name="province"
                        id="province"
                        onChange={(e) => {
                          (e.target.value);
                        }}
                        currentValue={province}
                      />
                      <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                        Provincia
                      </div>
                    </div>
                  </>
                  )}
                  {category != "SERVICES" && (
                    <>
                      <div className="md:col-span-5 relative">
                        <CurrencyInput
                          type="stock"
                          value={stock}
                          onChange={(e) => {
                            setStock(e.target.value);
                          }}
                        />
                        <div
                          className={`${
                            stock
                              ? "labelsconfigurationwithvalue"
                              : "labelsconfiguration"
                          } text-gray-600 text-sm`}
                        >
                          Cantidad en stock.
                        </div>
                      </div>
                    </>
                  )}
                  <div className="md:col-span-5 relative">
                    <CurrencyInput
                      required
                      type="text"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        price
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      {priceLabel}
                    </div>
                  </div>

                  <div className="md:col-span-5 relative">
                    <CurrencyInput
                      type="text"
                      value={specialPrice}
                      onChange={(e) => {
                        setSpecialPrice(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        specialPrice
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      Precio especial (Sólo si aplica).
                    </div>
                  </div>

                  <div className="md:col-span-5 relative ">
                    <DropDownList
                      onSelectValue={setNegotiable}
                      values={GENERAL_YESNO}
                      type="text"
                      required
                      name="negotiable"
                      id="negotiable"
                      currentValue={negotiable}
                      onChange={(e) => {
                        setNegotiable(e.target.value);
                      }}
                    />
                    <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                      ¿Precio Negociable?.
                    </div>
                  </div>

                  <div className="md:col-span-5 relative ">
                    <DropDownList
                      additionalClass={
                        category == "PRODUCT" ? "rounded-b-lg" : ""
                      }
                      onSelectValue={setCurrency}
                      values={CURRENCY_LIST}
                      type="text"
                      required
                      name="currency"
                      id="currency"
                      currentValue={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value);
                      }}
                    />
                    <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                      Seleccione la moneda.
                    </div>
                  </div>

                  {category == "CAR" && (
                    <CarInfo
                      onChangeValues={setInternalCarInfo}
                      carInfo={carInfo}
                    />
                  )}

                  {images.length <= 4 && (
                    <div className="md:col-span-5 relative mt-4">
                      <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                        Seleccione las imágenes del item{" "}
                        <p className="font-bold inline-flex">
                          (Máximo 5 por item)
                        </p>
                        .
                      </div>
                      <DragDropFiles
                        required
                        name="image"
                        id="image"
                        onImageLoaded={setInternalImage}
                      />
                    </div>
                  )}

                  <div className="md:col-span-5 text-right relative mt-4">
                    <div className="grid grid-cols-3 lg:grid-cols-6 grid-rows-2 lg:grid-rows-1">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          className="w-12 h-auto mr-5 group-invalid:pointer-events-none group-invalid:opacity-30"
                          onClick={() => {
                            showInternalImage(index);
                          }}
                          alt="Productos y servicios. Encuéntralo Facil Costa Rica"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right mt-4">
                    <button type="submit" className="inline black_btn">
                      {editMode ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showImage && (
        <UploadedImage
          image={images[selectedImage]}
          onCloseFunction={setShowImage}
          onDeleteImage={deleteImage}
          index={selectedImage}
        />
      )}
    </>
  );
}

export default StoreItem;