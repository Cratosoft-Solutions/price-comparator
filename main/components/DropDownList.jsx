export default function DropDownList({
  values,
  onSelectValue,
  currentValue,
  additionalClass,
  returnOtherValue = null,
}) {
  return (
    <select
      className={` ${additionalClass}  block w-full h-16 px-3 text-dark-text pt-3 bg-dark-surface shadow border border-dark-border text-base`}
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
