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
import HorizontalCardList from '@components/HorizontalCardList';
import PaginationControls from '@components/PaginationController';
import MobileHorizontalCardList from '@components/MobileHorizontalCardList';
import ProductDetails from './ProductDetails';


const MyItems = ({ params }) => {
    const [loading, setLoading]  =  useState(true);
    const [showConfirmAction, setShowConfirmAction] = useState(false);
    const [modalActionInfo, setModalActionInfo] = useState({});
    const [showproduct, setShowproduct] = useState(false);
    const [items, setItems] = useState([]);
    const { size } = useSelector(state =>state.sitepagination);
    const [product, setProduct] = useState({});
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
            setStore(storeInfo.data._id);
            const productsInfo = await axios.get(`/api/search/local/myitems/${storeInfo.data._id}/all`);
            setItems(productsInfo.data.companyProducts)
            setLoading(false);
        }
      };
      securePage();
    }, []);

    
    const adminSelectedItem =(productId)=>{
      console.log(productId)
      const filteredProduct =items.filter((product)=> product.productId ==productId)[0];
      console.log(filteredProduct)
      setProduct(filteredProduct);
      setShowproduct(true);
    }

    if(loading)
      return <Loading />

  return (
    <>
      <div className={`bg-white mt-4 lg:mt-0 p-4 lg:bg-gray-100 lg:pl-6 lg:pr-6 ${
        expandedNavBar ? "ml-0 lg:ml-52" : "ml-0 lg:ml-10"
      }`}>
            {showConfirmAction && <Modal modalActionInfo={modalActionInfo} onConfirm={onConfirm} onCancel={onCancel} />}
            <div className="w-full max-w-screen-lg">
                <h2 className=" mt-1 font-semibold text-2xl lg:text-4xl lg:h-12 text-black orange_gradient">Listado de Items</h2>
                <p className="text-black mb-1 lg:mb-6 ">¡Bienvenido a la configuración de tu cuenta!</p>
        
                <div className=" storepages bg-white p-10 rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6 min-h-screen">
                    <div className="relative container mx-auto hidden lg:block">
                        <HorizontalCardList mergedProducts={items} adminMode={true} callBackFunction={adminSelectedItem}/>
                        <PaginationControls tableItemsAmount={items.length} size={size} isOptionSearchExpanded={expandedNavBar}/>
                    </div>
                    <div className="container-fluid mx-auto block lg:hidden ">
                        <MobileHorizontalCardList mergedProducts={items} adminMode={true} callBackFunction={adminSelectedItem}/>
                    </div>
                </div>
            </div>
    </div>
    {showImage && <UploadedImage image={image} onCloseFunction={setShowImage}/>} 
    {showproduct && <ProductDetails onCloseFunction={setShowproduct} storeId={store} productId={product.productId} adminMode={true}/>}
  </>
  )
}

export default MyItems;
