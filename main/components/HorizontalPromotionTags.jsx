"use client";
import React, { useEffect, useState } from "react";

const HorizontalPromotionTags = ({ product }) => {
  const [tagsListToRender, setTagsListToRender] = useState([]);

  useEffect(() => {
    const tempTags = [];
    if (product.negotiable == "YES") tempTags.push("Negociable");
    if (product.formatedEspecialPrice != 0) tempTags.push("Rebajado");
    setTagsListToRender(tempTags);
  }, []);

  if (tagsListToRender.length === 0) return null;

  return (
    <div className="flex gap-1.5 p-1.5">
      {tagsListToRender.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-semibold bg-accent-primary/90 text-white backdrop-blur-sm shadow-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default HorizontalPromotionTags;
