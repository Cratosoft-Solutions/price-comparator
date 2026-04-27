import React from "react";
import HorizontalPromotionTags from "./HorizontalPromotionTags";
import { BsShare } from "react-icons/bs";
import SocialShare from "./SocialShare";
import { useState } from "react";

const MobileProductCard = ({ product, index, adminMode, callBackFunction }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleProductClick=(url)=>{
    if(adminMode || product.isLocal){
      callBackFunction(product);
    }else{
      window.open(product.vendorLink, '_blank');
    }
  }

  return (
    
    <div key={product.productName + index} className="container-fluid mx-auto w-full border border-dark-border rounded-lg">
          {showShareModal && <SocialShare pid={product.productId} sid={product.storeId} onCloseFunction={setShowShareModal}/>}     
      <div
        className="hover:cursor-pointer relative flex bg-dark-surface overflow-hidden items-center justify-start rounded-lg"
        style={{ cursor: "auto" }}
      >
        <div className="relative w-32 h-32 !max-h-32 flex-shrink-0">
          <div className="p-2 absolute left-0 top-0 w-full h-full flex items-center justify-center container-blur product-image">
            <img
              alt="Productos y servicios. Encuéntralo Facil Costa Rica"
              className="w-full h-full"
              loading="lazy"
              src={product.productImage}
              onClick={()=>{handleProductClick(product.vendorLink)}}
            />
          {adminMode? null: (<>{product.isLocal?null:<div className="centered-blur">REFERENCIA </div>}</>)} 
          </div>

        </div>
        <div className="grid grid-rows-2 grid-cols-1">
          <p className="text-sm text-dark-text font-black text-ellipsis">
            {product.productName}
            {product.isLocal && <BsShare className="absolute top-4 right-4 w-4 h-4 text-dark-muted hover:text-accent-glow transition-colors" onClick={()=>{setShowShareModal(true)}}/>      }
          </p>

          <div className="text-dark-text font-[500]">
            {Boolean(product.formatedEspecialPrice && 
             product.formatedEspecialPrice != 0) && (
              <div className="lg:inline text-left">
                <span className='text-xs'>{product.currency == "CRC" ? "₡" : product.currency}</span>
                <span className="line-through text-xs text-dark-muted">
                    {product.formatedPrice}
                </span>
              </div>
            )}
          <div className="lg:inline text-left">
              <span className='text-xs'>{product.currency == "CRC" ? "₡" : product.currency }</span>
              <span className='text-xs'> 
              {Boolean(product.formatedEspecialPrice && 
             product.formatedEspecialPrice != 0)
                  ? product.formatedEspecialPrice
                  : product.formatedPrice} 
              </span>
          </div>
        </div>

        </div>
      </div>
      {!adminMode && product.isLocal && <div className="relative bg-dark-surface w-full h-6"><HorizontalPromotionTags product={product}/></div>}


    </div>
  );
};

export default MobileProductCard;
