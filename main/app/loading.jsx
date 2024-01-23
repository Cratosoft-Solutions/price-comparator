export default function Loading({message="Cargando... Por favor espere."}) {

  return (
    <div className="grid bg-orange-600 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div
        className="border-t-transparent border-solid animate-bounce bg-transparent h-fit w-fit gap-2"
        role="status"
        aria-label="loading"
      >
      <div
        data-te-loading-icon-ref
        className="inline-block h-8 w-8 animate-spin border-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
          <span className="[&>svg]:w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-strokeWidth="1.5"
              stroke="white">
              <path
                stroke-strokeLinecap="round"
                stroke-strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </span>
        </div>
        <span className="text-gray-200 text-3xl">{message}</span>
   
      </div>
    </div>
  );
}