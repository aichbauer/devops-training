import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  external?: boolean;
  children: string | ReactElement;
  to: string;
}

export function LinkButton({ external, children, to }: ButtonProps) {
  const OurLink = external
    ? ({ children: thisChildren, to: thisTo, className }) => (
        <a className={className} href={thisTo}>
          {thisChildren}
        </a>
      )
    : Link;

  return (
    <OurLink
      to={to}
      className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
    </OurLink>
  );
}
