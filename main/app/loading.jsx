export default function Loading({message="¡Preparándolo para ti!"}) {

  return (
    <div className="p-8 flex bg-gradient-to-br from-neutral-200 via-white to-neutral-100 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full"> 
            <span className="inline loading loading-ring loading-xs"></span>
            <span className="inline loading loading-ring loading-sm"></span>
            <span className="inline loading loading-ring loading-md"></span>
            <span className="inline loading loading-ring loading-lg"></span> 
            <span className="ml-1 text-black font-black text-sm lg:text-2xl">{message}</span>
            <img src="/assets/images/logo-mb.svg" className="fixed mt-28 h-16 w-16"></img>
    </div>
  );
}