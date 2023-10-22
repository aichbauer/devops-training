interface InputBaseProps {
  id: string;
  label: string;
  type: string;
  onBlur: any;
  onChange: any;
  errors: boolean;
  errorMessage: string | string[] | any;
  placeholder: string;
}

interface CheckboxProps extends InputBaseProps {
  checked: boolean;
  value?: never;
}

interface InputProps extends InputBaseProps {
  value: string;
  checked?: never;
}

type CheckboxPropsOrInputProps = CheckboxProps | InputProps;

export function Input({
  id,
  label,
  type,
  value,
  checked,
  onBlur,
  errors,
  onChange,
  placeholder,
  errorMessage,
}: CheckboxPropsOrInputProps) {
  return (
    <div className={type === 'checkbox' ? 'flex items-center mb-4' : 'mb-6'}>
      {type !== 'checkbox' && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={
          type === 'checkbox'
            ? 'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        }
      />
      {type === 'checkbox' && (
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      )}
      {errors && <div>{errorMessage[0].toUpperCase() + errorMessage.substring(1)}</div>}
    </div>
  );
}
