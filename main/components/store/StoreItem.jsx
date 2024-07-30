"use client";
import React, { useEffect, useState } from "react";
import DragDropFiles from "@components/DragDropFiles";
import Modal from "@components/Modal";
import {
  CATEGORY_TYPES,
  IMAGE_MAX_PASSED,
  IMAGE_FAILED_CONFIRM_ACTION,
  GENERAL_UKNOWN_ERROR,
  CURRENCY_LIST,
  GENERAL_YESNO,
  SERVICES_TYPES,
  MODALITY_TYPES,
  PROVINCES,
  ITEM_CREATED_SUCCESFULLY,
  DEFAULT_CAR_ITEM_STRUCTURE,
  DEFAULT_HOUSE_ITEM_STRUCTURE,
  PROMOTIONS,
  PRODUCT_SAVE_CONFIRM_ACTION,
  PRODUCT_SAVE_NO_PROMOTION_CONFIRM_ACTION,
  PAYMENT_CONFIRM_ACTION,
} from "@utils/constants";
import { getSession, signIn } from "next-auth/react";
import Loading from "@app/loading";
import axios from "axios";
import CurrencyInput from "@components/CurrencyInput";
import DropDownList from "@components/DropDownList";
import UploadedImage from "@components/UploadedImage";
import { useSelector } from "react-redux";
import { calculatePercentage, genericCompression, prepareProductAdvertisingInfo, translateCategory } from "@utils/functions";
import CarInfo from "./CarInfo";
import HouseInfo from "./HouseInfo";
import { IoCloseOutline } from "react-icons/io5";
import PromotedOptions from "./PromotedOptions";
import { MdOutlineArrowRight } from "react-icons/md";
import PaymentModal from "@components/PaymentModal";
import Script from "next/script";
const StoreItem = ({
  editMode = false,
  product,
  onCloseFunction,
  nonAuthenticatedUser = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [showConfirmAction, setShowConfirmAction] = useState(false);
  const [modalActionInfo, setModalActionInfo] = useState({});
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [nameLabel, setNameLabel] = useState("Título de tu anuncio.");
  const [descriptionLabel, setDescriptionLabel] = useState(
    "Descripción del producto ."
  );
  const [priceLabel, setPriceLabel] = useState("Precio del producto.");
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  const [negotiable, setNegotiable] = useState("NO");
  const [category, setCategory] = useState("PRODUCT");
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
  const [socialMediaURL, setSocialMediaURL] = useState("");
  const categoryList = CATEGORY_TYPES;
  const servicesList = SERVICES_TYPES;
  const modalityList = MODALITY_TYPES;
  const provinceList = PROVINCES;
  const [contactNumber, setContactNumber] = useState("");
  const [showwhatssapicon, setShowWhatssapIcon] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [promotionSelected, setPromotionSelected] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [messageToShow, setMessageToShow] = useState(null);
  const [intentId, setIntentId] = useState(""); 



  const { expandedNavBar } = useSelector(
    (state) => state.verticalnav.myStoreNav
  );
  const [carInfo, setCarInfo] = useState(DEFAULT_CAR_ITEM_STRUCTURE);
  const [houseInfo, setHouseInfo] = useState(DEFAULT_HOUSE_ITEM_STRUCTURE);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const filteredPromotion = PROMOTIONS.filter((promotion)=> promotion.value == promotionSelected)[0];
  const iva = calculatePercentage(filteredPromotion.price,0.13);
  const discount = 0;

  const PAYMENTDETAIL = {
    itemType:translateCategory(category, "SEARCHTEXT"),
    callPaymentModal:filteredPromotion.appliesForPayment,
    itemName: name,
    detail: "Paquete " + filteredPromotion.name, 
    currency:"CRC",
    price:{
      original:filteredPromotion.price,
      iva:iva,
      discount:discount,  
      total:(filteredPromotion.price + iva)-discount     
    }
  }

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session && !nonAuthenticatedUser) {
        signIn();
      } else {
        if (session) {
           const storeInfo = await axios.get(
            `/api/user/${session.user.id}/store/`
          );
          setStore(product?.store?product.store:storeInfo.data._id);
          setEmail(product?.email?product.email:storeInfo.data.email);
          setAddress(product?.address?product.address:storeInfo.data.address);
          setContactNumber(product?.contactNumber?product.contactNumber:storeInfo.data.contactnumber);
          setShowWhatssapIcon(storeInfo.data.showwhatssapicon);
        } else {
          setStore("non-auth-user");
        }

        if (product != undefined && product.category === "SERVICES") {
          setNameLabel("Nombre del servicio.");
          setDescriptionLabel("Descripcion del servicio.");
          setPriceLabel("Precio del servicio.");
        }
        setLoading(false);
      }
    };
    securePage();

    if (editMode) {
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
      if (product.category === "SERVICES") {
        setServiceType(product.serviceType);
        setModalityType(product.modalityType);
        setProvince(product.province);
      }
      if (product.category == "CAR") {
        setCarInfo(product.otherInformation);
      }
      if (product.category == "HOUSES") {
        setHouseInfo(product.otherInformation);
      }
      setSocialMediaURL(product.socialMediaURL);
    }
  }, []);

  const restartForm = () => {
    setId(null);
    setName("");
    setDescription("");
    setPrice(null);
    setSpecialPrice(null);
    setCurrency(CURRENCY_LIST[0].value);
    setImages([]);
    setCategory(categoryList[0].value);
    setServiceType(SERVICES_TYPES[0].value);
    setModalityType(MODALITY_TYPES[0].value);
    setProvince(PROVINCES[0].value);
  };

  const restartFormWithoutCategory = () => {
    setId(null);
    setName("");
    setStock("");
    setEmail("");
    setAddress("");
    setContactNumber("");
    setDescription("");
    setPrice(null);
    setSpecialPrice(null);
    setCurrency(CURRENCY_LIST[0].value);
    setImages([]);
    setServiceType(SERVICES_TYPES[0].value);
    setModalityType(MODALITY_TYPES[0].value);
    setProvince(PROVINCES[0].value);
  };

  const validateItemIntegrity = () => {
    try {
      let result = { result: true, message: "" };
      if (category == "CAR" && carInfo.brand == "SELECT") {
          return formatResult("Favor seleccione la marca del vehículo.");
      }

      if (category == "CAR" && carInfo.style == "SELECT") {
          return formatResult("Favor seleccione el estílo del vehículo.");
      }

      if(images.length == 0){
        return formatResult("Favor adjunte al menos una imagen en su anuncio." +promotionSelected);
      }

      return result;
    } catch (error) {
      return { result: false, message: error.message };
    }
  };

  const formatResult = (messageToSet) => {
    return { result: false, message: messageToSet };
  };

  const confirmAction = (e) => {
      e.preventDefault();
    
    
    setMessageToShow("Creando tu anuncio, favor espera.");
    const generalValidation = validateItemIntegrity();

    if (!generalValidation.result) {
      //Error in item validation
      setModalActionInfo({...GENERAL_UKNOWN_ERROR, message: generalValidation.message});
      setShowConfirmAction(true);
    } else {
      //Item is good, show payment modal
      if(PAYMENTDETAIL.callPaymentModal){
        InitiatePaymentProcess();
      }else{
        setShowConfirmAction(true);
      }
      setModalActionInfo(PRODUCT_SAVE_NO_PROMOTION_CONFIRM_ACTION);
    }
  };

  const InitiatePaymentProcess = async () => {
    const response = await axios.post(`/api/payments/create/charge/`, {
      currency: PAYMENTDETAIL.currency,
      amount: PAYMENTDETAIL.price.total,
      description:"EncuentraloFacilCR - "+ PAYMENTDETAIL.detail
    })

    const {created, id, message} = await response.data;

    if(created){
      setIntentId(id);
      setModalActionInfo(PAYMENT_CONFIRM_ACTION);
      setShowPaymentModal(true)
    } else {
      setModalActionInfo({
        ...GENERAL_UKNOWN_ERROR,
        message: message,
      });
      setShowConfirmAction(true);
    }

  }

  const onConfirm = async (processToExecute, paymentData = {}) => {
    setShowConfirmAction(false);
    setShowPaymentModal(false);
    if (processToExecute === "CLEANPRODUCT") {
      if (!editMode) {
        restartForm();
      }
    }  else if (processToExecute === "SAVEPRODUCT") {      
      setLoading(true);
      axios
        .post(`/api/product/save`, {
          id: id,
          store: store,
          name: name,
          description: description,
          category: category,
          stock: stock ? stock.toString().replaceAll(",", "") : 0,
          price: price ? price.toString().replaceAll(",", "") : 0,
          especialprice: specialPrice
            ? specialPrice.toString().replaceAll(",", "")
            : 0,
          negotiable: negotiable,
          currency: currency,
          image: genericCompression(images, "compress"),
          socialMediaImage:images[0],
          otherItemInformation:
            category == "CAR"
              ? JSON.stringify(carInfo)
              : category == "HOUSES"
              ? JSON.stringify(houseInfo)
              : null,
          serviceType: category === "SERVICES" ? serviceType : null,
          modalityType: category === "SERVICES" ? modalityType : null,
          province: category === "SERVICES" ? province : null,
          advertising: JSON.stringify(prepareProductAdvertisingInfo(filteredPromotion)),
          paymentData: JSON.stringify(paymentData),
          savePaymentData:filteredPromotion.appliesForPayment,
          email:email,
          contactNumber:contactNumber,
          address:address,
          socialMediaURL: socialMediaURL
        })
        .then((response) => {
          setLoading(false);
          setModalActionInfo(
            !nonAuthenticatedUser
              ? ITEM_CREATED_SUCCESFULLY
              : {
                  ...ITEM_CREATED_SUCCESFULLY,
                  message:
                    "¡Felicidades! Anuncio creado correctamente. Favor guarda tu ID de Anuncio: " +
                    response.data.id,
                  showCopyButton: true,
                  textToCopy: response.data.id,
                  copyButtonLabel: "Copiar ID de Anuncio... "
                }
          );
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
    } else {
      setShowConfirmAction(false);
    }
  };

  const onCancel = () => {
    setShowConfirmAction(false);
  };

  const setInternalImage = (selectedImages, error) => {
    console.log(selectedImages);
    if (selectedImages === null) {
      setModalActionInfo({ ...IMAGE_FAILED_CONFIRM_ACTION, message: error });
      setShowConfirmAction(true);
    } else {
      if (images.length + selectedImages.length > 5) {
        setModalActionInfo({ ...IMAGE_MAX_PASSED });
        setShowConfirmAction(true);
      } else {
        selectedImages.forEach((element) => {
          setImages((oldArray) => [...oldArray, element]);
        });
      }
    }
  };

  const showInternalImage = (index) => {
    setSelectedImage(index);
    setShowImage(true);
  };

  const deleteImage = (indexFiltered) => {
    setImages(images.filter((image, index) => index != indexFiltered));
  };

  const setInternalCarInfo = (field, value) => {
    if (field == "equipment") {
      let equipmentToSet = carInfo.equipment;
      if (equipmentToSet.filter((element) => element == value)[0]) {
        equipmentToSet = equipmentToSet.filter((element) => element != value);
      } else {
        equipmentToSet.push(value);
      }
      setCarInfo({ ...carInfo, [field]: equipmentToSet });
    } else {
      setCarInfo({ ...carInfo, [field]: value });
    }
    console.log(carInfo);
  };

  const setInternalHouseInfo = (field, value) => {
    if (field == "benefits") {
      let benefitsToSet = houseInfo.benefits;
      if (benefitsToSet.filter((element) => element == value)[0]) {
        benefitsToSet = benefitsToSet.filter((element) => element != value);
      } else {
        benefitsToSet.push(value);
      }
      setHouseInfo({ ...houseInfo, [field]: benefitsToSet });
    } else {
      setHouseInfo({ ...houseInfo, [field]: value });
    }
    console.log(houseInfo);
  };

  const setCategoryOnChange = (category) => {
    restartFormWithoutCategory();
    setCategory(category);
    switch (category) {
      case "SERVICES":
        setDescriptionLabel("Descripcion del servicio.");
        setPriceLabel("Precio del servicio.");
        break;
      case "HOUSES":
        setDescriptionLabel("Descripcion de la propiedad.");
        setPriceLabel("Precio de la propiedad.");
        break;
      case "CAR":
        setDescriptionLabel("Descripcion del vehículo.");
        setPriceLabel("Precio del vehículo.");
        break;  
      default:
        setDescriptionLabel("Descripción del producto.");
        setPriceLabel("Precio del producto.");
        break;
    }
  };

  if (loading) return <Loading message={messageToShow}/>;

  return (
    <>
      {showConfirmAction && (
          <Modal modalActionInfo={modalActionInfo} onConfirm={onConfirm} onCancel={onCancel} />)}

      {showPaymentModal && <PaymentModal paymentDetail={PAYMENTDETAIL} paymentIntentId={intentId} onConfirm={onConfirm} modalActionInfo={PAYMENT_CONFIRM_ACTION}/>} 

      <form
        method="POST"
        onSubmit={confirmAction}
        className={`non-outline relative mt-4 lg:mt-0 p-4 lg:pl-6 lg:pr-6 ${
          expandedNavBar && !editMode
            ? "ml-0 lg:ml-52"
            : `ml-0 lg:ml-${editMode ? 0 : 10}`
        }`}
      >
        {" "}
        {editMode && (
          <IoCloseOutline
            className="absolute top-2 right-2 lg:-right-14 lg:top-0 lg:!stroke-white w-12 h-12 z-50"
            color="white"
            onClick={onCloseFunction}
          />
        )}
        
        <div className="w-full ">
          <div className=" storepages bg-white border shadow-lg mb-6">
            <div className="grid text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-black mb-4 lg:mb-0 bg-[#EEDECF] p-4">
                <p className="font-black text-2xl mb-4">¡Crea tu anuncio!</p>
                <p className="text-gray-800">
                  Favor completa todos los campos para ingresar un nuevo
                  anuncio.
                </p>
                <div className="w-full h-full flex items-start lg:mt-16 justify-center p-4">
                  <img
                    className="w-ful h-fit"
                    src="/assets/images/create-item.svg"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 p-4">
                <div className="inline flex items-center mb-4">
                  <MdOutlineArrowRight
                    className="-ml-4 hidden lg:block inline w-12 h-12"
                    color="black"
                  />
                  <p className="inline text-black w-full text-center lg:text-left font-black text-2xl">
                    Datos generales del anuncio
                  </p>
                </div>

                <div className="grid text-sm grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-5 relative">
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

                  <div className="lg:col-span-5 relative">
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
                  <div className="lg:col-span-5 relative">
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
                      <div className="lg:col-span-5 relative">
                        <DropDownList
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
                      <div className="lg:col-span-5 relative">
                        <DropDownList
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
                      <div className="lg:col-span-5 relative">
                        <DropDownList
                          onSelectValue={setProvince}
                          values={provinceList}
                          type="text"
                          required
                          name="province"
                          id="province"
                          onChange={(e) => {
                            e.target.value;
                          }}
                          currentValue={province}
                        />
                        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                          Provincia
                        </div>
                      </div>
                    </>
                  )}
                  {category != "SERVICES" && category != "HOUSES" && (
                    <>
                      <div className="lg:col-span-5 relative">
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
                  <div className="lg:col-span-5 relative">
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

                  <div className="lg:col-span-5 relative">
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

                  <div className="lg:col-span-5 relative ">
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

                  <div className="lg:col-span-5 relative ">
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

                  {category == "HOUSES" && (
                    <HouseInfo
                      onChangeValues={setInternalHouseInfo}
                      houseInfo={houseInfo}
                    />
                  )}

                  {images.length <= 4 && (
                    <div className="lg:col-span-5 relative mt-4">
                      <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                        Selección de imágenes.
                      </div>
                      <DragDropFiles
                        required
                        name="image"
                        id="image"
                        onImageLoaded={setInternalImage}
                      />
                    </div>
                  )}

                  <div className="lg:col-span-5 text-right relative mt-4">
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
                  <div className="lg:col-span-5 text-right relative ">
                    <div className="inline flex items-center mb-4">
                      <MdOutlineArrowRight
                        className="-ml-4 hidden lg:block inline w-12 h-12"
                        color="black"
                      />
                      <p className="inline text-black w-full text-center lg:text-left font-black text-2xl">
                        Datos de contacto
                      </p>
                    </div>{" "}
                  </div>
                  <div className="lg:col-span-5 relative">
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      className=" inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300 rounded-t-lg "
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        email
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      Email de contacto.
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <input
                      name="contactnumber"
                      className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300"
                      id="contactnumber"
                      value={contactNumber}
                      required
                      onChange={(e) => {
                        setContactNumber(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        contactNumber
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      Número de contacto.
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <input
                      required
                      type="input"
                      name="address"
                      id="address"
                      className="inputconfiguration rounded-b-lg focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <div
                      className={`${
                        address
                          ? "labelsconfigurationwithvalue"
                          : "labelsconfiguration"
                      } text-gray-600 text-sm`}
                    >
                      Ubicación física (Sólo si aplica).
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative mt-4">
                    <div className="inline-flex items-center">
                      <img
                        className="mr-2"
                        src="/assets/images/ws-image.png"
                        width={30}
                        height={30}
                        alt="Productos y servicios. Encuéntralo Facil Costa Rica"
                      ></img>
                      <input
                        className="w-4 h-4 accent-gray-900 dark:accent-white"
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        checked={showwhatssapicon}
                        onChange={() => {
                          setShowWhatssapIcon((prev) => !prev);
                        }}
                      />
                      <label
                        htmlFor="billing_same"
                        className="text-gray-600  ml-2"
                      >
                        Habilitar el contacto por WhatsApp en este anuncio.
                      </label>
                    </div>
                  </div>

                  <PromotedOptions onSelectedOption={setPromotionSelected} />

                  <div className="lg:col-span-5 text-right mt-4">
                    <button type="submit" className="inline black_btn">
                      {editMode ? "Actualizar" : "Continuar"}
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
};

export default StoreItem;
