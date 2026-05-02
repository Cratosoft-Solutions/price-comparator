import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPage } from "@app/redux/slices/pagination";
import { numberToArray } from "@utils/functions";

const PaginationControls = ({ size, tableItemsAmount }) => {
  const [active, setActive] = React.useState(1);
  const dispatch = useDispatch();
  const { pagesArray, lastPage } = numberToArray(size, tableItemsAmount, active);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    className:
      index == active
        ? "w-8 h-8 rounded-lg bg-accent-primary/20 border border-accent-primary/30 text-accent-glow text-sm font-semibold transition-all"
        : "w-8 h-8 rounded-lg bg-dark-elevated/40 border border-dark-border/20 text-dark-muted text-sm hover:text-dark-text hover:border-dark-border/40 transition-all",
    onClick: () => {
      setActive(index);
      dispatch(setPage(index));
    },
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
    <div className="flex absolute bottom-[3rem] w-full justify-center">
      <div className="flex items-center gap-2 rounded-xl bg-dark-surface/60 backdrop-blur-sm border border-dark-border/30 px-4 py-2 shadow-lg">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-dark-muted hover:text-dark-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={prev}
          disabled={active === 1}
        >
          <AiOutlineArrowLeft className="h-3.5 w-3.5" />
          Anterior
        </button>

        <div className="flex items-center gap-1">
          {pagesArray.map((element) => (
            <button key={element} {...getItemProps(element)}>
              {element}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-dark-muted hover:text-dark-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={next}
          disabled={active === lastPage}
        >
          Siguiente
          <AiOutlineArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
