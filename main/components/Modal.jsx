import { copyToClipBoard } from "@utils/functionsClient";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const Modal = ({ modalActionInfo, onCancel, onConfirm }) => {

  const {
    message = "",
    showCancelButton = true,
    okText = "OK",
    cancelText = "Cancel",
  } = modalActionInfo;
  const [textWasCopied, setTextWasCopied] = useState(false);

  const internalCopyToClipBoard=(textToCopy)=>{
    setTextWasCopied(copyToClipBoard(textToCopy))
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed bg-opacity-30 top-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-black p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-8 h-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              {message}
            </h3>
            <button
              onClick={() => {
                onConfirm(modalActionInfo.processToExecute);
              }}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-black hover:bg-green-100 hover:text-gray-600 hover:border hover:border-green-100 hover:shadow-lg  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 mb-4"
            >
              {okText}
            </button>
            {showCancelButton && (
              <button
                onClick={onCancel}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-red-100 hover:text-gray-600 hover:border hover:border-red-100 hover:shadow-lg  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
        {modalActionInfo.showCopyButton && (
          <div className="absolute bottom-1 right-2 hover:font-black inline flex justify-center items-center">
            <FaRegCopy className="inline w-4 h-4"/>
            <button
              className="inline p-2"
              onClick={() => {
                internalCopyToClipBoard(modalActionInfo.textToCopy);
              }}
            >
              {textWasCopied? <span className="text-green-600 animate-bounce">{"Texto copiado al portapapeles."}</span>: modalActionInfo.copyButtonLabel}
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Modal;
