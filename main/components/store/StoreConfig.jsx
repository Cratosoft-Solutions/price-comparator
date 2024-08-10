"use client";
import React, { useEffect, useState } from 'react';
import DragDropFiles from '@components/DragDropFiles';
import Modal from '@components/Modal';
import { STORE_SAVE_CONFIRM_ACTION, IMAGE_LOADED_CONFIRM_ACTION, IMAGE_FAILED_CONFIRM_ACTION, GENERAL_UKNOWN_ERROR, GENERAL_SUCCESS_PROCESS, IMAGE_PRINCIPAL_STORE_DIMENSION} from '@utils/constants';
import { getSession, signIn } from "next-auth/react";
//import { PhoneNumber } from '@utils/functions';
import Loading from '@app/loading';
import axios from 'axios';
import {BsFillImageFill} from 'react-icons/bs';
import UploadedImage from '@components/UploadedImage';
import { useSelector } from "react-redux";



const StoreConfig = () => {
    const [loading, setLoading]  =  useState(true);
    const [showConfirmAction, setShowConfirmAction] = useState(false);
    const [modalActionInfo, setModalActionInfo] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [showwhatssapicon, setShowWhatssapIcon] = useState(false);
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [storeId, setStoreId] = useState(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
      const securePage = async () => {
        const session = await getSession();
        if (!session) {
          signIn();
        } else {
          axios.get(`/api/store/${session.user.id}/user/get`)
            .then((response)  => {
                const data = response.data;
                if (data.length > 0) {
                    setName(data[0].name);
                    setDescription(data[0].description);
                    setEmail(data[0].email);
                    setImage(data[0].image);
                    setContactNumber(data[0].contactnumber);
                    setAddress(data[0].address);
                    setShowWhatssapIcon(data[0].showwhatssapicon);
                    setStoreId(data[0]._id);
                }
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                setModalActionInfo({...GENERAL_UKNOWN_ERROR, message: error.message});
                setShowConfirmAction(true);
              });;
        }
      };
      securePage();
    }, []);

      
    const confirmAction = (e) =>{
        e.preventDefault();
        setModalActionInfo(STORE_SAVE_CONFIRM_ACTION);
        setShowConfirmAction(true);
    }

    const onConfirm = async(processToExecute)=>{
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
            if (processToExecute === "SAVESTORE") {
              setLoading(true);
              axios
                .post(`/api/store/save`, {
                  id:storeId,
                  name: name,
                  description: description,
                  contactnumber: contactNumber.toString().replace(/[^\w]/g, ""),
                  email: email,
                  showwhatssapicon: showwhatssapicon,
                  image: image,
                  address: address,
                  user:session.user.id
                })
                .then((response) => {
                  setStoreId(response.data.id);
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
    }

    const onCancel = ()=>{
        setShowConfirmAction(false);
    }

    const setInternalImage =(image, error)=>{
        if(image===null){
            setModalActionInfo({...IMAGE_FAILED_CONFIRM_ACTION, message:error})
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
      <form method='POST' onSubmit={confirmAction} className={`lg:mt-0 p-4 lg:pl-6 lg:pr-6`}>
          {showConfirmAction && <Modal modalActionInfo={modalActionInfo} onConfirm={onConfirm} onCancel={onCancel} />}
          <div className="w-full">
          <div>             
              <div className="storepages bg-white border shadow-lg  mb-6">
              <div className="grid text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-black mb-4 lg:mb-0 bg-[#EEDECF] p-4">
              <p className="font-black text-2xl mb-4">Configuración General</p>
                  <p className='text-gray-800'>Favor complete todos los campos.</p>
                  <div className="w-full h-full flex items-start lg:mt-16 justify-center p-4">
                  <img className="w-ful h-fit z-50" src="/assets/images/create-item.svg" alt="Productos y servicios. Encuéntralo Facil Costa Rica"/>
                </div>
                  </div> 
      
                  <div className="lg:col-span-2 p-4 ">
                  <div className="grid  text-sm grid-cols-1 lg:grid-cols-5 ">
                      <div className="lg:col-span-5 relative">
                          <input type="text" name="full_name" id="full_name" className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border rounded-t-lg px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300" value={name} onChange={e => {setName(e.target.value);}}/>
                          <div className={`${name?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Nombre del comercio, persona u otro.</div>
                      </div>
      
                      <div className="lg:col-span-5 relative">
                          <input type="text" name="descrition" id="descrition" className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300" value={description} onChange={e => {setDescription(e.target.value);}} />
                          <div className={`${description?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Describe los productos/servicios que ofreces.</div>
                      </div>

                      <div className="lg:col-span-5 relative">
                        <input required type="email" name="email" id="email" className=" inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300"  value={email} onChange={e => {setEmail(e.target.value);}}/>
                        <div className={`${email?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Email de contacto.</div>
                      </div>

                      <div className="lg:col-span-5 relative">
                        <input name="contactnumber" className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300" id="contactnumber" value={contactNumber}  onChange={e => {setContactNumber(e.target.value);}}/>
                        <div className={`${contactNumber?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Número de contacto.</div>
                      </div>

                      <div className="lg:col-span-5 relative">
                        <input required type="input" name="address" id="address" className="inputconfiguration rounded-b-lg focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800  border border-gray-300"  value={address} onChange={e => {setAddress(e.target.value);}}/>
                        <div className={`${address?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Ubicación física (Sólo si aplica).</div>
                      </div>

                      <div className="lg:col-span-5 relative mt-4">
                      <div className="inline-flex items-center">
                          <img className='mr-2' src="/assets/images/ws-image.png" width={30} height={30} alt="Productos y servicios. Encuéntralo Facil Costa Rica"></img>
                          <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" checked={showwhatssapicon} onChange={() => {setShowWhatssapIcon(prev => !prev);}}/>
                          <label htmlFor="billing_same" className="text-black ml-2">Quiero habilitar el contacto por WhatsApp en mis productos o servicios.</label>
                      </div>
                      </div>

                      <div className="lg:col-span-5 relative mt-4">
                         <div className="labelsconfigurationwithvalue text-gray-600 text-sm">Proporciona el logo de tu comercio.</div>
                          <DragDropFiles id="image" name="image" onImageLoaded={setInternalImage} acceptedDimension={IMAGE_PRINCIPAL_STORE_DIMENSION}/>
                      </div>
              
                      <div className="lg:col-span-5 text-right relative mt-4">
                      <div className="inline-flex">
                         {image && <BsFillImageFill type="button" className="w-12 h-auto mr-5 group-invalid:pointer-events-none group-invalid:opacity-30" onClick={()=> {setShowImage(true)}}/>}
                          <button type="submit" className="black_btn">Guardar</button>
                      </div>
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

export default StoreConfig;
