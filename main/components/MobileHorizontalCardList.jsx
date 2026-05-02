import React from 'react'
import MobileProductCard from './MobileProductCard'
 
const MobileHorizontalCardList = ({mergedProducts, adminMode = false, callBackFunction=()=>{}}) => {
  return (
    <div className="pb-24">
      {!adminMode && (
        <div className="px-4 py-3 mb-2">
          <p className="text-sm text-dark-muted">
            Encontramos{" "}
            <span className="text-dark-text font-semibold">{mergedProducts.length}</span>{" "}
            anuncios
          </p>
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        {mergedProducts
          .filter((element) => element.isLocal)
          .map((product, index) => (
            <MobileProductCard
              key={index}
              product={product}
              index={index}
              adminMode={adminMode}
              callBackFunction={callBackFunction}
            />
          ))}
      </div>

      {!adminMode &&
        mergedProducts.filter(
          (element) => element.isLocal && element.category == 'PRODUCT'
        ).length > 0 && (
          <div className="px-4 py-3 mt-4 mb-2">
            <p className="text-base text-dark-text font-semibold">
              También te puede interesar
            </p>
          </div>
        )}

      <div className="flex flex-col gap-0.5">
        {mergedProducts
          .filter((element) => !element.isLocal)
          .map((product, index) => (
            <MobileProductCard
              key={index}
              product={product}
              index={index}
              adminMode={adminMode}
              callBackFunction={callBackFunction}
            />
          ))}
      </div>
    </div>
  );
}

export default MobileHorizontalCardList