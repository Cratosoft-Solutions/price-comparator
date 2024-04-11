import { CARD_BRANDS, CARD_COMBUSTIBLE, CARD_KMMI, CARD_STATUS, CARD_STYLES, CARD_TRANSMITION, GENERAL_PROVINCES, GENERAL_YESNO, HOUSE_BALCONY_TERRACE, HOUSE_FLOOR_TYPE, HOUSE_PROPERTY_TYPE, HOUSE_VENDOR_TYPE, MODALITY_TYPES, PROVINCES, SERVICES_TYPES } from '@utils/constants'
import { genericItemsValue, genericItemsValue2, getServiceItemLabel } from '@utils/functions'
import React from 'react'

const ProductDetailsGeneral = ({product}) => {
  return (
    <>
        {product.category == "CAR" && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Marca:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    CARD_BRANDS,
                    product.otherInformation.brand
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Modelo:</p>{" "}
                <p className="inline">
                {product.otherInformation.model}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Cilindrada:</p>{" "}
                <p className="inline">
                {product.otherInformation.cc}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Estilo:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    CARD_STYLES,
                    product.otherInformation.style
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">#Pasajeros:</p>{" "}
                <p className="inline">
                {product.otherInformation.passengers}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Año:</p>{" "}
                <p className="inline">
                {product.otherInformation.year}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Estado:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    CARD_STATUS,
                    product.otherInformation.status
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Combustible:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    CARD_COMBUSTIBLE,
                    product.otherInformation.combustible
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Transmisión:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    CARD_TRANSMITION,
                    product.otherInformation.transmition
                )}
                </p>
            </div>

            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Kilometraje:</p>{" "}
                <p className="inline">
                {product.otherInformation.kms +
                    genericItemsValue2(
                    CARD_KMMI,
                    product.otherInformation.kmstype
                    )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">¿Al día?:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    GENERAL_YESNO,
                    product.otherInformation.taxes
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">¿Recibe vehículo?:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    GENERAL_YESNO,
                    product.otherInformation.otherCar
                )}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">#Puertas:</p>{" "}
                <p className="inline">
                {product.otherInformation.doors}
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <p className="text-sm font-bold inline">Provincia:</p>{" "}
                <p className="inline">
                {genericItemsValue(
                    GENERAL_PROVINCES,
                    product.otherInformation.province
                )}
                </p>
            </div>
        </div>
        )}

       {product.category == "SERVICES" && (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
            <div className="text-gray-600 flex gap-2">
                <p className="text-green-600 text-sm font-bold inline ">
                Tipo:
                </p>
                <p className="inline ">
                {getServiceItemLabel(
                    SERVICES_TYPES,
                    product.serviceType
                )}
                </p>
            </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
            <div className="text-gray-600 flex gap-2">
                <p className="text-green-600 text-sm font-bold inline ">
                Modalidad:
                </p>
                <p className="inline ">
                {getServiceItemLabel(
                    MODALITY_TYPES,
                    product.modalityType
                )}
                </p>
            </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
            <div className="text-gray-600 flex gap-2">
                <p className="text-green-600 text-sm font-bold inline ">
                Provincia:
                </p>
                <p className="inline ">
                {getServiceItemLabel(PROVINCES, product.province)}
                </p>
            </div>
            </div>
        </>        
    )} 

    {product.category == "HOUSES" && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 mt-4 gap-x-2">
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Habitaciones:</p>{" "}
            <p className="inline">
            {product.otherInformation.bedrooms}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Baños:</p>{" "}
            <p className="inline">
            {product.otherInformation.bathrooms}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Estacionamientos :</p>{" "}
            <p className="inline">
            {product.otherInformation.parking}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">
            M² de Construcción :
            </p>{" "}
            <p className="inline">
            {product.otherInformation.porpertyMeters}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">
            Tipo de Anunciante:
            </p>{" "}
            <p className="inline">
            {genericItemsValue(
                HOUSE_VENDOR_TYPE,
                product.otherInformation.houseVendorType
            )}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Dirección exacta:</p>{" "}
            <p className="inline">
            {product.otherInformation.address}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">
            Costos de mantenimiento:
            </p>{" "}
            <p className="inline">
            {product.otherInformation.propertyMaintenanceCosts}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Tamaño del lote:</p>{" "}
            <p className="inline">
            {product.otherInformation.lotSize}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Altura:</p>{" "}
            <p className="inline">
            {product.otherInformation.height}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">
            Años de construcción:
            </p>{" "}
            <p className="inline">
            {product.otherInformation.yearBuilt}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Tipo de pisos:</p>{" "}
            <p className="inline">
            {genericItemsValue(
                HOUSE_FLOOR_TYPE,
                product.otherInformation.floorType
            )}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Niveles:</p>{" "}
            <p className="inline">
            {product.otherInformation.levels}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Piso Número:</p>{" "}
            <p className="inline">
            {product.otherInformation.floor}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Piscina:</p>{" "}
            <p className="inline">
            {genericItemsValue(
                GENERAL_YESNO,
                product.otherInformation.pool
            )}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Balcón / Terraza:</p>{" "}
            <p className="inline">
            {genericItemsValue(
                HOUSE_BALCONY_TERRACE,
                product.otherInformation.balconyTerrace
            )}
            </p>
        </div>
        <div className="text-sm text-gray-600">
            <p className="text-sm font-bold inline">Tipo de Propiedad:</p>{" "}
            <p className="inline">
            {genericItemsValue(
                HOUSE_PROPERTY_TYPE,
                product.otherInformation.propertyType
            )}
            </p>
        </div>
        </div>
        )}
    </>

  )
}

export default ProductDetailsGeneral