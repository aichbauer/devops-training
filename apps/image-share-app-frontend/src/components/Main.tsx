export function Main({ children, type = 'normal' }) {
  const className = {
    normal: 'min-h-[calc(100vh-329px)] py-8 px-2 sm:px-4 container mx-auto',
    reverse:
      'flex flex-col md:flex-row min-h-[calc(100vh-329px)] py-8 px-2 sm:px-4 container mx-auto',
  };

  return <main className={className[type]}>{children}</main>;
}
