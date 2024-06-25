"use client";
import Loading from '@app/loading';
import GenericAnimation from '@components/GenericAnimation';
import { IoCloseOutline } from "react-icons/io5";
import { isMobile } from '@utils/functions';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import StoreItem from './StoreItem';
import ImageGallery from "react-image-gallery";
import { FaWhatsapp } from "react-icons/fa";
import ProductDetailsTabs from './ProductDetailsTabs';


const ProductDetails = ({onCloseFunction, storeId, productId, adminMode=false}) => {
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [editingProduct, setEditingProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);  
    const [nameLabel, setNameLabel] = useState('Detalle del item.');

    const securePage = async () => {
      /*const session = await getSession();
      if (!session) {
        signIn();
      } else {*/
          const productInfo = await axios.get(`/api/search/local/myitems/${storeId}/${productId}/`);
          setProduct(productInfo.data);
          setLabelsBasedOnCategory(productInfo.data.category);
          prepareImages(productInfo.data);
          
          //}
      setLoading(false);
    };

    const prepareImages=(productData)=>{
      const tempArray = [];
      productData.productImage.forEach(element => {
          tempArray.push({original: element, thumbnail: element, originalClass:"main-detail-img"});
        });
        setImages(tempArray);
    }


    const setLabelsBasedOnCategory = (category) => {
      switch (category) {
        case 'SERVICES':
          setNameLabel("Nombre del servicio.");
          break;
        default:
          setNameLabel("Nombre del item.");
          break;
      }
    };

    useEffect(() => {
        securePage();
      }, []);

      const closeEditProduct =()=>{
        setEditingProduct(false);
        setLoading(true);
        securePage();
      }
      
      if (loading)
        return (
          <Loading message={"Cargando..."}/>
        ); 

      if(editingProduct)
      return (
        <section className="max-heigh-available fixed top-0 w-full z-50 h-screen bg-black bg-opacity-30 py-11 left-0">
          <div className="max-w-6xl w-fit py-2 mx-auto px-2 bg-white rounded-lg shadow">
            <StoreItem editMode={true} product={product} onCloseFunction={closeEditProduct}/>
          </div>
        </section> 
      ); 

    return (
      <section className="max-heigh-available fixed top-0 w-full z-50 h-screen bg-black bg-opacity-30 lg:py-11 left-0">
        <div className="max-w-4xl lg:py-8 mx-auto md:px-6 bg-white shadow relative  min-h-screen md:min-h-min">
          <IoCloseOutline onClick={() => { onCloseFunction(false); }} className="absolute top-1 -right-1 z-[100] lg:-top-2 lg:-right-12 h-12 w-12" color='whitesmoke'/>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 md:w-max-1/2 ">
              <ImageGallery
                items={images}
                thumbnailPosition={`${isMobile()?'bottom':'right'}`}
                showFullscreenButton
                showBullets
                infinite
              />
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="p-4 lg:pl-4 lg:p-0">
                <div className="mb-8">
                  <h2 className="text-black max-w-xl mt-2 lg:mt-0 mb-4 text-xl font-bold  md:text-3xl">
                    {product.productName}
                  </h2>

                  <p className="inline-block mb-4">
                    {product.formatedEspecialPrice != 0 && (
                      <span className="!text-black text-base line-through mr-10">
                        {product.currency + product.formatedPrice}
                      </span>
                    )}
                    <span className="text-black text-xl">
                      {product.formatedEspecialPrice != 0
                        ? product.currency + product.formatedEspecialPrice
                        : product.currency + product.formatedPrice}
                    </span>
                  </p>

                  <div className="w-full grid grid-rows-1 grid-cols-[40%_60%] mb-14">
                    <div className="grid grid-rows-2">
                      <span className="!text-black ">Existencias</span>
                      <span className="h-8 w-28 rounded-full bg-[#EEEEEE] flex items-center justify-center text-[#363636] text-xs">
                        {product.stock}
                      </span>
                    </div>
                    <div className="flex items-end justify-start">
                      <div className="w-40">
                        <Link
                          href={`https://wa.me/${+50683439846}/?text=Quiero informacion de: ${
                            product.productName
                          }`}
                          target="_blank"
                          className="h-8 gap-2 flex items-center justify-center p-1 w-full text-[#40A826] border border-[#40A826] rounded-full"
                        >
                          <FaWhatsapp className="h-4 w-4" color="#40A826" />{" "}
                          <span className="text-sm text-[#40A826] ">Contactar tienda</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {product.negotiable == "YES" && (
                    <GenericAnimation message="Precio Negociable"></GenericAnimation>
                  )}
                  <div className="w-full">
                    <ProductDetailsTabs product={product}/>
                  </div>
                </div>

                <div className="flex flex-wrap items-center -mx-4 ">
                  {adminMode && (
                    <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                      <button
                        onClick={() => {
                          setEditingProduct(true);
                        }}
                        className="black_btn_sqr w-full"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ProductDetails