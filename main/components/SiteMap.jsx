import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { SITE_MAP } from "@utils/constants";
import { useSelector } from "react-redux";
import { translateCategory } from "@utils/functions";

const SiteMap = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { category} = useSelector(state => state.siteNav);

 
  const onUserSelected = (url) => {
    if(!url.lastPath){
      router.push(url.url);
    }
  };

  return (
    <div className="bg-[#FCF8F8] w-full h-14 pl-4 lg:pr-10 lg:pl-10 flex items-center mt-4 mb-2">
      {SITE_MAP.filter(pathToPaint => pathToPaint.path == pathname)[0].mapTree.map((element) => (
        <>
          <span className="inline hover:cursor-pointer hover:font-black "
            onClick={() => {
              onUserSelected(element);
            }}
          >
            {element.text === "TRANSLATECATEGORY"? translateCategory(category, "SEARCHTEXT"):element.text}
          </span>
          {element.lastPath?'':<span className="pl-2 pr-2">{">>"}</span>}
        </>
      ))}
    </div>
  );
};

export default SiteMap;
