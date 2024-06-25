"use client";
import React, { useState } from 'react';
import { CARD_BRANDS, CARD_KMMI, CARD_COMBUSTIBLE, CARD_EQUIPMENT, CARD_STATUS, CARD_STYLES, CARD_TRANSMITION, GENERAL_PROVINCES, GENERAL_YESNO } from '@utils/constants';
import DropDownList from '@components/DropDownList';
import { getGenericNumericArray } from '@utils/functions';


const CarInfo = ({ onChangeValues, carInfo }) => {

    const fieldSelectedValue=(value, field)=>{
        onChangeValues(field, value);
    }

  return ( <>
          <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_BRANDS}
                type="text"
                required
                name="brand"
                id="brand"
                currentValue={carInfo.brand}
                returnOtherValue="brand"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Marca del vehículo.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <input
                type="text"
                required
                name="model"
                id="model"
                className="inputconfiguration  focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
                value={carInfo.model}
                onChange={(e) => {
                    onChangeValues("model", e.target.value);
                }}
              />
              <div
                className={`${
                    carInfo.model ? "labelsconfigurationwithvalue" : "labelsconfiguration"
                } text-gray-600 text-sm`}
              >
                Modelo del vehículo.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <input
                type="text"
                required
                name="cc"
                id="cc"
                className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
                value={carInfo.cc}
                onChange={(e) => {
                    onChangeValues("cc",e.target.value);
                }}
              />
              <div
                className={`${
                  carInfo.cc
                    ? "labelsconfigurationwithvalue"
                    : "labelsconfiguration"
                } text-gray-600 text-sm`}
              >
                Cilindrada
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_STYLES}
                type="text"
                required
                name="style"
                id="style"
                currentValue={carInfo.style}
                returnOtherValue="style"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Estílo del vehículo.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={getGenericNumericArray("ASC",  1, 9, 1, true,  {value:"10", label:"10 ó más"})}
                type="text"
                required
                name="passengers"
                id="passengers"
                currentValue={carInfo.passengers}
                returnOtherValue="passengers"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Cantidad de pasajeros.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={getGenericNumericArray("DESC",  1950, new Date().getFullYear(), 1)}
                type="text"
                required
                name="year"
                id="year"
                currentValue={carInfo.year}
                returnOtherValue="year"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Año.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_STATUS}
                type="text"
                required
                name="status"
                id="status"
                currentValue={carInfo.status}
                returnOtherValue="status"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Estado.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_COMBUSTIBLE}
                type="text"
                required
                name="combustible"
                id="combustible"
                currentValue={carInfo.combustible}
                returnOtherValue="combustible"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Combustible.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_TRANSMITION}
                type="text"
                required
                name="transmition"
                id="transmition"
                currentValue={carInfo.transmition}
                returnOtherValue="transmition"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Transmisión.
              </div>
            </div>

            
            <div className="md:col-span-5 relative">
            <input
                type="text"
                required
                name="kms"
                id="kms"
                className="inputconfiguration focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
                value={carInfo.kms}
                onChange={(e) => {
                    onChangeValues("kms",e.target.value);
                }}
              />
             <div className={`${carInfo.kms?'labelsconfigurationwithvalue':'labelsconfiguration'} text-gray-600 text-sm`}>Kilometraje.</div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={CARD_KMMI}
                type="text"
                required
                name="style"
                id="style"
                currentValue={carInfo.kmstype}
                returnOtherValue="kmstype"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Kilómetros o Millas.
              </div>
            </div>
            
            <div className="md:col-span-5 relative ">
                <DropDownList  onSelectValue={fieldSelectedValue} returnOtherValue="taxes" values={GENERAL_YESNO} type="text" required name="taxes" id="taxes" currentValue={carInfo.taxes}/>
                <div className="labelsconfigurationwithvalue text-gray-600 text-sm">¿Impuestos al día?.</div>
            </div>

            <div className="md:col-span-5 relative ">
                <DropDownList  onSelectValue={fieldSelectedValue} values={GENERAL_YESNO} returnOtherValue="othercar" type="text" required name="othercar" id="othercar" currentValue={carInfo.otherCar}/>
                <div className="labelsconfigurationwithvalue text-gray-600 text-sm">¿Se recibe vehículo?.</div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={getGenericNumericArray("ASC",  1, 5, 1)}
                type="text"
                required
                name="doors"
                id="doors"
                currentValue={carInfo.doors}
                returnOtherValue="doors"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Cantidad de puertas.
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <DropDownList
                onSelectValue={fieldSelectedValue}
                values={GENERAL_PROVINCES}
                type="text"
                required
                additionalClass="rounded-b-lg"
                name="province"
                id="province"
                currentValue={carInfo.province}
                returnOtherValue="province"
              />
              <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                Provincia.
              </div>
            </div>

            <div className="md:col-span-5 relative ">
                <div className="text-gray-900 text-3xl p-6 text-center">Equipamiento</div>
            </div>

            <div className="md:col-span-5 relative">
                <div className='grid grid-cols-1 lg:grid-cols-3'>
                    {CARD_EQUIPMENT.map((element, index)=>(
                        <div key={index} className="flex items-center mb-4">
                            <input id={`card-equipment-${element.value}`} key={`card-equipment-${element.value}`} type="checkbox" checked={carInfo.equipment.filter(selectedElement => selectedElement == element.value).length > 0} className="w-4 h-4 accent-gray-900" onChange={()=>{fieldSelectedValue(element.value,"equipment")}}/>
                            <label htmlFor={`card-equipment-${element.value}`} className="ms-2 text-sm font-medium text-gray-600">{element.label}</label>
                        </div>  
                    ))}
  
                    
                </div>    
            </div>
        </>
  );
}

export default CarInfo;
