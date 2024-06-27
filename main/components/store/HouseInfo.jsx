"use client";
import React  from 'react';
import {HOUSE_VENDOR_TYPE, HOUSE_FLOOR_TYPE, GENERAL_YESNO,HOUSE_BALCONY_TERRACE,HOUSE_PROPERTY_TYPE,HOUSE_BENEFITS} from '@utils/constants';
import DropDownList from '@components/DropDownList';
import { getGenericNumericArray } from '@utils/functions';
import { MdOutlineArrowRight } from 'react-icons/md';


const HouseInfo = ({ onChangeValues, houseInfo }) => {

    const fieldSelectedValue=(value, field)=>{
        onChangeValues(field, value);
    }

  return (
    <>
      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray("ASC", 1, 10, 1)}
          type="text"
          required
          name="bedrooms"
          id="bedrooms"
          currentValue={houseInfo.bedrooms}
          returnOtherValue="bedrooms"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Habitaciones.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray("ASC", 1, 5, 1)}
          type="text"
          required
          name="bathrooms"
          id="bathrooms"
          currentValue={houseInfo.bathrooms}
          returnOtherValue="bathrooms"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Baños.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray("ASC", 0, 5, 1)}
          type="text"
          required
          name="parking"
          id="parking"
          currentValue={houseInfo.parking}
          returnOtherValue="parking"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Estacionamientos.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <input
          required
          type="text"
          name="porpertyMeters"
          id="porpertyMeters"
          className="inputconfiguration  focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
          value={houseInfo.porpertyMeters}
          onChange={(e) => {
            onChangeValues("porpertyMeters", e.target.value);
          }}
        />
        <div
          className={`${
            houseInfo.porpertyMeters
              ? "labelsconfigurationwithvalue"
              : "labelsconfiguration"
          } text-gray-600 text-sm`}
        >
          M² de Construcción.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={HOUSE_VENDOR_TYPE}
          type="text"
          required
          name="houseVendorType"
          id="houseVendorType"
          currentValue={houseInfo.houseVendorType}
          returnOtherValue="houseVendorType"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Tipo de Anunciante.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <textarea
          name="address"
          required
          id="address"
          className="inputconfiguration h-full focus:font-bold focus:orange_gradient h-16 pt-6 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
          value={houseInfo.address}
          onChange={(e) => {
            onChangeValues("address", e.target.value);
          }}
        />
        <div
          className={`${
            houseInfo.address
              ? "labelsconfigurationwithvalue"
              : "labelsconfiguration"
          } text-gray-600 text-sm`}
        >
          Dirección exacta.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <input
          type="text"
          required
          name="propertyMaintenanceCosts"
          id="propertyMaintenanceCosts"
          className="inputconfiguration  focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
          value={houseInfo.propertyMaintenanceCosts}
          onChange={(e) => {
            onChangeValues("propertyMaintenanceCosts", e.target.value);
          }}
        />
        <div
          className={`${
            houseInfo.propertyMaintenanceCosts
              ? "labelsconfigurationwithvalue"
              : "labelsconfiguration"
          } text-gray-600 text-sm`}
        >
          Costos de mantenimiento.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        {/*  <div className="md:col-span-3 relative"> */}
        <input
          type="text"
          name="lotSize"
          required
          id="lotSize"
          className="inputconfiguration  focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
          value={houseInfo.lotSize}
          onChange={(e) => {
            onChangeValues("lotSize", e.target.value);
          }}
        />
        <div
          className={`${
            houseInfo.lotSize
              ? "labelsconfigurationwithvalue"
              : "labelsconfiguration"
          } text-gray-600 text-sm`}
        >
          Tamaño del lote.
        </div>
        {/*  </div> */}
        {/*                 <div className="md:col-span-2 relative">
                    <DropDownList
                    onSelectValue={fieldSelectedValue}
                    values={HOUSE_FLOOR_TYPE}
                    type="text"
                    name="floorType"
                    id="floorType"
                    currentValue={houseInfo.floorType}
                    returnOtherValue="floorType"
                  />
                  <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
                    Tipo de Piso.
                  </div>  
                </div>    */}
      </div>

      <div className="md:col-span-5 relative">
        <input
          type="text"
          name="height"
          required
          id="height"
          className="inputconfiguration  focus:font-bold focus:orange_gradient h-16 pt-2 border px-4 w-full bg-white shadow text-base text-gray-800 border border-gray-300"
          value={houseInfo.height}
          onChange={(e) => {
            onChangeValues("height", e.target.value);
          }}
        />
        <div
          className={`${
            houseInfo.height
              ? "labelsconfigurationwithvalue"
              : "labelsconfiguration"
          } text-gray-600 text-sm`}
        >
          Altura.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray(
            "DESC",
            1950,
            new Date().getFullYear(),
            1
          )}
          type="text"
          name="yearBuilt"
          id="yearBuilt"
          currentValue={houseInfo.yearBuilt}
          returnOtherValue="yearBuilt"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Año de construcción.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={HOUSE_FLOOR_TYPE}
          type="text"
          name="floorType"
          id="floorType"
          currentValue={houseInfo.floorType}
          returnOtherValue="floorType"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Tipo de Piso.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray("ASC", 1, 9, 1, true, {
            value: "10",
            label: "10 ó más",
          })}
          type="text"
          name="levels"
          id="levels"
          currentValue={houseInfo.levels}
          returnOtherValue="levels"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Niveles.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={getGenericNumericArray("ASC", 1, 60, 1)}
          type="text"
          name="floor"
          id="floor"
          currentValue={houseInfo.floor}
          returnOtherValue="floor"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Número piso.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={GENERAL_YESNO}
          type="text"
          name="pool"
          id="pool"
          currentValue={houseInfo.pool}
          returnOtherValue="pool"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Piscina.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={HOUSE_BALCONY_TERRACE}
          type="text"
          name="balconyTerrace"
          id="balconyTerrace"
          currentValue={houseInfo.balconyTerrace}
          returnOtherValue="balconyTerrace"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Balcón / Terraza.
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <DropDownList
          onSelectValue={fieldSelectedValue}
          values={HOUSE_PROPERTY_TYPE}
          type="text"
          name="propertyType"
          id="propertyType"
          currentValue={houseInfo.propertyType}
          returnOtherValue="propertyType"
        />
        <div className="labelsconfigurationwithvalue text-gray-600 text-sm">
          Tipo de propiedad.
        </div>
      </div>

      <div className="md:col-span-5 relative ">
        <div className="inline flex items-center mb-4 mt-4">
          <MdOutlineArrowRight
            className="-ml-4 hidden md:block inline w-12 h-12"
            color="black"
          />
          <p className="inline text-black w-full text-center md:text-left font-black text-2xl">
            Extras - Beneficios
          </p>
        </div>
      </div>

      <div className="md:col-span-5 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {HOUSE_BENEFITS.map((element, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                id={`house-benefits-${element.value}`}
                key={`house-benefits-${element.value}`}
                type="checkbox"
                checked={
                  houseInfo.benefits.filter(
                    (selectedElement) => selectedElement == element.value
                  ).length > 0
                }
                className="w-4 h-4 accent-gray-900"
                onChange={() => {
                  fieldSelectedValue(element.value, "benefits");
                }}
              />
              <label
                htmlFor={`house-benefits-${element.value}`}
                className="ms-2 text-sm font-medium text-gray-600"
              >
                {element.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HouseInfo;
