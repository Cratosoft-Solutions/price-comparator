
export default function DropDownList({values, onSelectValue, currentValue}) {
  return (
      <select className="block w-full h-16 px-4 py-2 text-gray-500 bg-white lg:rounded-l-lg border focus:border-gray-500 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" value={currentValue} onChange={(e)=>{onSelectValue(e.target.value)}}>
        {values.map((value, index)=>(
            <option key={index} value={value.value}>{value.label}</option>
        ))}            
      </select>
    )
}