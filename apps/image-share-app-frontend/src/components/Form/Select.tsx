export interface SelectProps {
  items: any[];
  label: string;
  id: string;
  value: string;
  onChange: any;
  onBlur: any;
  placeholder: string;
}

export function Select({ id, label, items, value, onChange, onBlur, placeholder }: SelectProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={id}
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items?.map((item) => {
          return (
            <option key={item.id} id={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
