
export default function DropDownList({values, onSelectValue, currentValue}) {
  return (
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={currentValue} onChange={(e)=>{onSelectValue(e.target.value)}}>
        {values.map((value, index)=>(
            <option key={index} value={value.value}>{value.label}</option>
        ))}            
      </select>
    )
}