const Alert = ({type="ALERT", title, message}) => {
  const style = type == "ALERT"? "bg-red-100 border-red-400 text-red-700":"bg-green-100 text-green-500 border-green-400";
  return (
    <div
      className={`w-4/5 lg:mr-10 lg:ml-10 lg:mb-4 mt-4 ${style} border  px-4 py-3 rounded relative`}
      role="alert"
    >
      <strong className="font-bold pr-1">{title}</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
        </svg>
      </span>
    </div>
  );
};


export default Alert;