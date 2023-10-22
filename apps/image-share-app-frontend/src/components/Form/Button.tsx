import { ReactElement, useState } from 'react';
import { Loading } from '../Loading';

interface ButtonProps {
  color?: 'blue' | 'red' | 'green' | 'yellow';
  children: string | ReactElement;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  color = 'blue',
  children,
  type,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const baseClassName = {
    blue: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed',
    red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:cursor-not-allowed',
    yellow:
      'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500 disabled:cursor-not-allowed',
    green:
      'text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 disabled:cursor-not-allowed',
  };

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`${baseClassName[color]} ${className}`}
      onClick={async () => {
        setIsLoading(true);

        if (onClick) {
          await onClick();
        }

        setIsLoading(false);
      }}
    >
      {!isLoading ? children : <Loading color={color} />}
    </button>
  );
}
