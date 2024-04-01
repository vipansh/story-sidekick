import React from "react";
import { cn } from "../lib/utils";

const Loader = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-75 bg-white dark:bg-gray-900 z-50 flex justify-center items-center">
      <div className="flex items-center flex-col justify-center space-y-3">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
        >
          <path
            d="M7.5 1.5V3.16667M7.5 12V14.6667M3.33333 8H1M13.6667 8H12.6667M11.8047 12.3047L11.3333 11.8333M11.9428 3.61052L11 4.55333M2.78105 12.719L4.66667 10.8333M2.91912 3.47245L4.33333 4.88667"
            stroke="#155EEF"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {message && (
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {message}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Loader;
