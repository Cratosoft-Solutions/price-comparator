"use client";
import Loading from '@app/loading';
import GenericAnimation from '@components/GenericAnimation';
import HorizontalCardListLoading from '@components/HorizontalCardListLoading';
import { CARD_BRANDS, CARD_COMBUSTIBLE, CARD_EQUIPMENT, CARD_KMMI, CARD_STATUS, CARD_STYLES, CARD_TRANSMITION, GENERAL_PROVINCES, GENERAL_YESNO,SERVICES_TYPES,HOUSE_VENDOR_TYPE, HOUSE_FLOOR_TYPE,HOUSE_BALCONY_TERRACE,HOUSE_PROPERTY_TYPE,HOUSE_BENEFITS } from '@utils/constants';
import { genericItemsValue, genericItemsValue2,getServiceTypeDescription } from '@utils/functions';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiSquareCheck } from "react-icons/ci";
import StoreItem from './StoreItem';

const ProductDetails = ({onCloseFunction, storeId, productId, adminMode=false}) => {
    const [product, setProduct] = useState({});
    const [editingProduct, setEditingProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);  
    const [nameLabel, setNameLabel] = useState('Detalle del item.');

    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
          const productInfo = await axios.get(`/api/search/local/myitems/${storeId}/${productId}/`);
          setProduct(productInfo.data);
          setLabelsBasedOnCategory(productInfo.data.category);
      }
      setLoading(false);
    };

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
        <section className="absolute top-0 w-full z-50 min-h-full bg-gray-800 bg-opacity-30 py-11 font-poppins ">
          <div className="max-w-6xl w-fit py-2 mx-auto px-2 bg-white rounded-lg shadow">
            <StoreItem editMode={true} product={product} onCloseFunction={closeEditProduct}/>
          </div>
        </section>
      );

    return (
      <section className="absolute top-0 w-full z-50 min-h-full bg-gray-800 bg-opacity-30 py-11 font-poppins px-2">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 bg-white rounded-lg shadow">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                  <img
                    src={product.productImage[selectedImage]}
                    alt="Productos y servicios. Encuéntralo Facil Costa Rica"
                    className="object-cover w-full lg:h-full "
                  />
                </div>
                <div className="flex-wrap hidden md:flex ">
                  {product.productImage.map((element, index) => (
                    <div
                      className="w-1/2 p-2 sm:w-1/4 flex justify-center"
                      key={index}
                    >
                      <a href="#" className="block border border-blue-300">
                        <img
                          src={element}
                          alt="Productos y servicios. Encuéntralo Facil Costa Rica"
                          className="object-cover w-auto h-20"
                          onClick={() => {
                            setSelectedImage(index);
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <span className=" orange_gradient text-2xl font-medium">
                    {nameLabel}
                  </span>
                  <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold  md:text-4xl">
                    {product.productName}
                  </h2>

                  <p className="max-w-md mb-8 text-gray-700 ">
                    {product.productDescription}
                  </p>
                  <p className="inline-block mb-4 text-4xl font-bold text-gray-700  ">
                    <span className=" !text-xl mr-2">{product.currency}</span>
                    <span>
                      {product.formatedEspecialPrice != 0
                        ? product.formatedEspecialPrice
                        : product.formatedPrice}
                    </span>
                    {product.formatedEspecialPrice != 0 && (
                      <span className="text-base font-normal text-gray-500 line-through ">
                        {product.formatedPrice}
                      </span>
                    )}
                  </p>

                  {product.negotiable == "YES" && (
                    <GenericAnimation message="Precio Negociable"></GenericAnimation>
                  )}

                  {product.category == "CAR" && (
                    <>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
                        <div className="text-gray-600">
                          <p className="text-green-600 font-bold inline ">
                            Existencias:
                          </p>{" "}
                          <p className="inline">{product.stock}</p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Marca:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              CARD_BRANDS,
                              product.otherInformation.brand
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Modelo:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.model}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Cilindrada:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.cc}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Estilo:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              CARD_STYLES,
                              product.otherInformation.style
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">#Pasajeros:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.passengers}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Año:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.year}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Estado:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              CARD_STATUS,
                              product.otherInformation.status
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Combustible:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              CARD_COMBUSTIBLE,
                              product.otherInformation.combustible
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Transmisión:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              CARD_TRANSMITION,
                              product.otherInformation.transmition
                            )}
                          </p>
                        </div>

                        <div className="text-gray-600">
                          <p className="font-bold inline">Kilometraje:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.kms +
                              genericItemsValue2(
                                CARD_KMMI,
                                product.otherInformation.kmstype
                              )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">¿Al día?:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              GENERAL_YESNO,
                              product.otherInformation.taxes
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">¿Recibe vehículo?:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              GENERAL_YESNO,
                              product.otherInformation.otherCar
                            )}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">#Puertas:</p>{" "}
                          <p className="inline">
                            {product.otherInformation.doors}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-bold inline">Provincia:</p>{" "}
                          <p className="inline">
                            {genericItemsValue(
                              GENERAL_PROVINCES,
                              product.otherInformation.province
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="orange_gradient text-2xl full font-medium text-left mb-4 mt-4">
                        {" "}
                        Equipamiento
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 gap-x-2">
                        {product.otherInformation.equipment.map(
                          (element, index) => (
                            <div key={index} className="flex items-center mb-4">
                              <CiSquareCheck
                                id={`card-equipment-${element}`}
                                key={`card-equipment-${element}`}
                                className="w-4 h-4"
                                color="green"
                              />
                              <label
                                htmlFor={`card-equipment-${element}`}
                                className="ms-2 text-sm font-medium text-gray-600"
                              >
                                {genericItemsValue(CARD_EQUIPMENT, element)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}

                  {product.category == "SERVICES" && (
                    <>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
                        <div className="text-gray-600 flex gap-2">
                          <p className="text-green-600 font-bold inline ">
                            Tipo:
                          </p>
                          <p className="inline ">
                            {getServiceTypeDescription(
                              SERVICES_TYPES,
                              product.serviceType
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  )}


                  {product.category == "HOUSES" && (
                    <>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
                      <div className='text-gray-600'>
                          <p className="font-bold inline">
                            Habitaciones:   
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.bedrooms} 
                          </p> 
                        </div>
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                            Baños:   
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.bathrooms} 
                          </p> 
                        </div>     
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Estacionamientos :   
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.parking} 
                          </p> 
                        </div>  
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          M² de Construcción :   
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.porpertyMeters} 
                          </p> 
                        </div>               
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Tipo de Anunciante:   
                          </p> {" "}
                          <p className="inline">
                          {genericItemsValue(HOUSE_VENDOR_TYPE, product.otherInformation.houseVendorType)} 
                          </p> 
                        </div> 
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Dirección exacta:   
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.address} 
                          </p> 
                        </div>   
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Costos de mantenimiento:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.propertyMaintenanceCosts} 
                          </p> 
                        </div>
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Tamaño del lote:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.lotSize} 
                          </p> 
                        </div>                               
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Altura:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.height} 
                          </p> 
                        </div>
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Años de construcción:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.yearBuilt} 
                          </p> 
                        </div>
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Tipo de pisos:
                          </p> {" "}
                          <p className="inline">
                            {genericItemsValue(HOUSE_FLOOR_TYPE, product.otherInformation.floorType)} 
                          </p> 
                        </div>     
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Niveles:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.levels} 
                          </p> 
                        </div>  
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Piso Número:
                          </p> {" "}
                          <p className="inline">
                            {product.otherInformation.floor} 
                          </p> 
                        </div> 
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                            Piscina:   
                          </p> {" "}
                          <p className="inline">
                          {genericItemsValue(GENERAL_YESNO, product.otherInformation.pool)} 
                          </p> 
                        </div>  
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Balcón / Terraza:   
                          </p> {" "}
                          <p className="inline">
                          {genericItemsValue(HOUSE_BALCONY_TERRACE, product.otherInformation.balconyTerrace)} 
                          </p> 
                        </div>    
                        <div className='text-gray-600'>
                          <p className="font-bold inline">
                          Tipo de Propiedad:   
                          </p> {" "}
                          <p className="inline">
                          {genericItemsValue(HOUSE_PROPERTY_TYPE, product.otherInformation.propertyType)} 
                          </p> 
                        </div>
                        </div>                            
                      <div  className='orange_gradient text-2xl full font-medium text-left mb-4 mt-4'>Extras - Beneficios</div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 gap-x-2">
                          {product.otherInformation.benefits.map((element, index)=>(
                            <div key={index} className="flex items-center mb-4">
                                <CiSquareCheck id={`house-benefits-${element}`} key={`house-benefits-${element}`}  className="w-4 h-4" color='green'/>
                                <label htmlFor={`house-benefits-${element}`} className="ms-2 text-sm font-medium text-gray-600">{genericItemsValue(HOUSE_BENEFITS,element)}</label>
                            </div>   
                        ))}
                      </div>                                                                                                                                                          
                    </>
                  )}
                </div>


                <div className="flex flex-wrap items-center -mx-4 ">
                  {!adminMode && (
                    <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                      <Link
                        href={`https://wa.me/${+50683439846}/?text=Quiero informacion de: ${
                          product.productName
                        }`}
                        target="_blank"
                        className="gap-2 flex items-center justify-center w-full p-4 text-green-500 border border-green-500 rounded-md hover:bg-green-600 hover:border-green-600 hover:text-gray-100 "
                      >
                        <img
                          className="h-6 w-6"
                          src="/assets/images/ws-image.png"
                          alt="Productos y servicios. Encuéntralo Facil Costa Rica"
                        />{" "}
                        Contactar tienda
                      </Link>
                    </div>
                  )}

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

                  <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                    <button
                      onClick={() => {
                        onCloseFunction(false);
                      }}
                      className="red_btn_sqr w-full"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ProductDetails