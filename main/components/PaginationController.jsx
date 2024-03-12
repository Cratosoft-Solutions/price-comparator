import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPage } from "@app/redux/slices/pagination";
import { numberToArray } from "@utils/functions";



const PaginationControls = ({size, tableItemsAmount}) => {
  const [active, setActive] = React.useState(1);
  const dispatch = useDispatch();
  const {pagesArray, lastPage} = numberToArray(size, tableItemsAmount, active);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    className:
      index == active
        ? "selected_pagination_button"
        : "nonselected_pagination_button",
    onClick: () => {setActive(index); dispatch(setPage(index))},
  });

  const next = () => {
    if (active === lastPage) return;

    setActive(active + 1);
    dispatch(setPage(active + 1));
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    dispatch(setPage(active - 1));
  };


  return (
    <div className="flex absolute bottom-[3rem] w-full justify-center " >
      <div className="paginationcontroler flex items-center gap-4 justify-center bg-white mb-2 pt-2 pb-2 pr-4 pl-4 shadow border border-gray-200 w-fit">
        <button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <AiOutlineArrowLeft strokeWidth={2} className="h-4 w-4" /> Anterior
        </button>
        <div className="flex items-center gap-2">
            {pagesArray.map(element=>(
                <button {...getItemProps(element)}>{element}</button>
            ))}
        </div>
        <button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === lastPage}
        >
          Siguiente
          <AiOutlineArrowRight strokeWidth={2} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
