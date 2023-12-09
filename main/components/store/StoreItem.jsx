"use client";
import React, { useEffect, useState } from 'react';
import DragDropFiles from '@components/DragDropFiles';
import Modal from '@components/Modal';
import { PRODUCT_SAVE_CONFIRM_ACTION,CATEGORY_TYPES, IMAGE_LOADED_CONFIRM_ACTION, IMAGE_FAILED_CONFIRM_ACTION, GENERAL_UKNOWN_ERROR, GENERAL_SUCCESS_PROCESS, CURRENCY_LIST, IMAGE_PRODUCT_STORE_DIMENSION, CATEGORY_DEFAULT_LIST, DROPDOWN_NEED_TB_SELECTED     } from '@utils/constants';
import { getSession, signIn } from "next-auth/react";
import Loading from '@app/loading';
import axios from 'axios';
import CurrencyInput from '@components/CurrencyInput';
import DropDownList from '@components/DropDownList';
import UploadedImage from '@components/UploadedImage';
import {BsFillImageFill} from 'react-icons/bs';
import { useSelector } from "react-redux";


const StoreItem = ({ params }) => {
    const [loading, setLoading]  =  useState(true);
    const [showConfirmAction, setShowConfirmAction] = useState(false);
    const [modalActionInfo, setModalActionInfo] = useState({});
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(CATEGORY_DEFAULT_LIST[0].value);
    const [price, setPrice] = useState(null);
    const [specialPrice, setSpecialPrice] = useState(null);
    const [currency, setCurrency] = useState(CURRENCY_LIST[0].value);
    const [image, setImage] = useState('');
    const [store, setStore] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const categoryList = CATEGORY_TYPES;
    const { expandedNavBar } = useSelector(state => state.verticalnav.myStoreNav);



    useEffect(() => {
      const securePage = async () => {
        const session = await getSession();
        if (!session) {
          signIn();
        } else {
            const storeInfo = await axios.get(`/api/user/${session.user.id}/store/`);
            console.log(storeInfo);
            setStore(storeInfo.data._id);
            setLoading(false);
        
            /*if(params.productId!="NEW")
            {
                axios.get(`/api/product/${params.productId}/product/get/`)
                .then((response)  => {
                    const data = response.data;
                    console.log(data);
                    if (typeof data?._id != undefined) {
                        setId(data._id);
                        setName(data.name);
                        setDescription(data.description);
                        setPrice(data.price);
                        setSpecialPrice(data?.specialprice?data.specialprice:0);
                        setCurrency(data.currency);
                        setImage(data.image);
                        setCategory(data.category);
                    }
                    setLoading(false);
                }).catch(error => {
                    setLoading(false);
                    setModalActionInfo({...GENERAL_UKNOWN_ERROR, message: error.message});
                    setShowConfirmAction(true);
                });
            }else{
                setLoading(false);
            }*/
        }
      };
      securePage();
    }, []);

    
    const restartForm = ()=>{
        setId(null);
        setName('');
        setDescription('');
        setPrice(null);
        setSpecialPrice(null);
        setCurrency(CURRENCY_LIST[0].value);
        setImage('');
        setCategory(categoryList[0].value);
    }

    const confirmAction = (e) =>{
        e.preventDefault();
        setModalActionInfo(PRODUCT_SAVE_CONFIRM_ACTION);
        setShowConfirmAction(true);
    }

    const onConfirm = async(processToExecute)=>{
            if (processToExecute === "SAVEPRODUCT") {
                if (category==CATEGORY_DEFAULT_LIST[0].value){
                    setModalActionInfo({...DROPDOWN_NEED_TB_SELECTED, message:"Por favor seleccione la categoria"});
                    setShowConfirmAction(true);     
                }else{
                    setLoading(true);
                    axios.post(`/api/product/save`, {
                        id:id,
                        store: store,
                        name: name,
                        description: description,
                        category:category,
                        price: price.toString().replaceAll(",", ""),
                        specialprice: specialPrice.toString().replaceAll(",", ""),
                        currency: currency,
                        image: image,
                      })
                      .then((response) => {
                        restartForm();
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
                }
            }else{
                setShowConfirmAction(false);
            }
    }

    const onCancel = ()=>{
        setShowConfirmAction(false);
    }

    const setInternalImage =(image, error)=>{
        if(image===null){
            setModalActionInfo({...IMAGE_FAILED_CONFIRM_ACTION, message:error})
            setImage(null);
            setShowConfirmAction(true);
        }else{
            setModalActionInfo(IMAGE_LOADED_CONFIRM_ACTION);
            setShowConfirmAction(true);
            setImage(image);
        }

        
    }
    
    
    if(loading)
      return <Loading/>

  return (
    <>
      <form method='POST' onSubmit={confirmAction} className={`bg-white lg:mt-0 p-4 lg:bg-gray-100 lg:pl-6 lg:pr-6 ${
        expandedNavBar ? "ml-0 lg:ml-52" : "ml-0 lg:ml-10"
      }`}>
            {showConfirmAction && <Modal modalActionInfo={modalActionInfo} onConfirm={onConfirm} onCancel={onCancel} />}
            <div className="w-full max-w-screen-lg">
                <h2 className=" mt-1 font-semibold text-2xl lg:text-4xl lg:h-12 text-black orange_gradient">Configuración de items</h2>
                <p className="text-black mb-1 lg:mb-6 ">¡Bienvenido a la configuración de tu cuenta!</p>
        
                <div className=" storepages bg-white p-10 rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-black">
                    <p className="font-medium text-lg">Configuración de items</p>
                    <p>Favor complete todos los campos para ingresar un nuevo item.</p>
                    </div>
        
                    <div className="lg:col-span-2">
                    <div className="grid text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5 relative">
                            <input type="text" required  name="name" id="name" className="inputconfiguration rounded-t-lg focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300" value={name} onChange={e => {setName(e.target.value);}}/>
                            <div className={`${name?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Nombre del item.</div>
                        </div>
        
                        <div className="md:col-span-5 relative">
                            <input type="text" required name="description" id="description" className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"  value={description} onChange={e => {setDescription(e.target.value);}} />
                            <div className={`${description?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Descripción del item.</div>
                        </div>

                        <div className="md:col-span-5 relative">
                             <DropDownList additionalClass="" onSelectValue={setCategory} values={categoryList} type="text" required name="category" id="category"  currentValue={category} onChange={e => {setCategory(e.target.value);}} />
                             <div className="labelsconfigurationwithvalue text-gray-600 text-sm">Sección en que se mostrará el producto.</div>
                        </div>

                        <div className="md:col-span-5 relative">
                            <CurrencyInput required type="text" value={price}  onChange={e => {setPrice(e.target.value);}} />
                            <div className={`${price?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Precio del item.</div>
                        </div>
                        
                        <div className="md:col-span-5 relative">
                            <CurrencyInput type="text" value={specialPrice}  onChange={e => {setSpecialPrice(e.target.value);}} />
                            <div className={`${specialPrice?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Precio especial (Sólo si aplica).</div>
                        </div>

                        <div className="md:col-span-5 relative ">
                            <DropDownList additionalClass="rounded-b-lg" onSelectValue={setCurrency} values={CURRENCY_LIST} type="text" required name="currency" id="currency"   currentValue={currency} onChange={e => {setCurrency(e.target.value);}}/>
                            <div className="labelsconfigurationwithvalue text-gray-600 text-sm">Seleccione la moneda.</div>
                        </div>


                        <div className="md:col-span-5 relative mt-4">
                            <div className="labelsconfigurationwithvalue text-gray-600 text-sm">Seleccione las imágenes del producto.</div>
                            <DragDropFiles required name="image" id="image"  onImageLoaded={setInternalImage} acceptedDimension={IMAGE_PRODUCT_STORE_DIMENSION}/>
                        </div>
                
                        <div className="md:col-span-5 text-right relative mt-4">
                        <div className="inline-flex">
                            {image && <BsFillImageFill type="button" className="w-12 h-auto mr-5 group-invalid:pointer-events-none group-invalid:opacity-30" onClick={()=> {setShowImage(true)}}/>}
                            <button type="submit" className="black_btn group-invalid:pointer-events-none group-invalid:opacity-30">Guardar</button>
                        </div>
                        </div>
        
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </form>
    {showImage && <UploadedImage image={image} onCloseFunction={setShowImage}/>} 
    
  </>
  )
}

export default StoreItem;
