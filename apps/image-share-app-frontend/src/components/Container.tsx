export function Container({ children }) {
  return (
    <div className="flex justify-center">
      <div className="min-w-[100vw] max-w-[100vw] pr-2 pl-2 sm:max-w-[75vw] sm:min-w-[75vw] sm:pr-0 sm:pl-0">
        {children}
      </div>
    </div>
  );
}
