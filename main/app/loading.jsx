import ReactLoading from "react-loading";

export default function Loading({message}) {
  if(message)
    return (    
      <div className="container flex justify-center items-center w-full h-screen gap-3">
          <ReactLoading type="bars" color="orange"/>
          <p>{message}</p>
      </div>)

  return (
    <div className="grid h-screen place-items-center">
      <div
        className="border-t-transparent border-solid animate-spin  rounded-full border-orange-400 border-8 h-48 w-48"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}