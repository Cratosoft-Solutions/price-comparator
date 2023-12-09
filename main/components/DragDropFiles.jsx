"use client";
import { validatePrincipalImageStore, fileToBase64, validateImageDimension } from '@utils/functions'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone';

const DragDropFiles = ({onImageLoaded, acceptedDimension}) => {
  const [fileName, setFileName] = useState(null);
  let file = null;

  const informResultToParent=(result, image, error=null)=>{
    if(result){
      onImageLoaded(image, null);
    }
    else{
      onImageLoaded(null, error);
    }
  }

  const onDimenssionValidated = (result) => {
    if(result.messageCode=="OK"){
      setFileName(file.name);
      informResultToParent(true, result.messageValue);
    }else{
      setFileName(null);
      informResultToParent(false, null, result.messageValue);
    }
  }

  const onImageValidated = (result)=>{
    if(result.messageCode=="OK"){
      validateImageDimension(result.messageValue, acceptedDimension, onDimenssionValidated);
    }else{
      setFileName(null);
      informResultToParent(false, null, result.messageValue);
    }
  }

  const validateImage = async (acceptedFiles) => {
    const result = validatePrincipalImageStore(acceptedFiles);
    if(result.type != "success"){
        informResultToParent(false, null, result.messageDescription);
    }else{
        //Image is created on base64
       file = acceptedFiles[0];
       fileToBase64(acceptedFiles[0], onImageValidated);
    }
  }

  const onDrop =  useCallback(acceptedFiles => {
    validateImage(acceptedFiles);  
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>      
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 orange_gradient "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {isDragActive ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Suelte el archivo aquí...
                    </span>
                  </p>
                ) : (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    {" "}
                    {fileName != null
                      ? fileName
                      : "Clic para cargar o arrastre el archivo aquí"}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {`PNG, SVG, JPEG. Dimensiones aceptadas ${acceptedDimension.width}x${acceptedDimension.height}`}
                </p>
              </div>
            </label>
          </div>

        </div>
    </>
  );
}

export default DragDropFiles;