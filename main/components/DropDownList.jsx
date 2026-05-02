export default function DropDownList({
  values,
  onSelectValue,
  currentValue,
  additionalClass,
  returnOtherValue = null,
}) {
  return (
    <select
      className={` ${additionalClass}  block w-full h-16 px-3 text-dark-text pt-3 bg-dark-surface shadow border border-dark-border text-base appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a3a3a3%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8 focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-200 cursor-pointer hover:bg-dark-elevated`}
      value={currentValue}
      onChange={(e) => {
        returnOtherValue
          ? onSelectValue(e.target.value, returnOtherValue)
          : onSelectValue(e.target.value);
      }}
    >
      {values.map((value, index) => (
        <option key={index} value={value.value}>
          {value.label}
        </option>
      ))}
    </select>
  );
}
