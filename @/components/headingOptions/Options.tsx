import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";

type Props = {
  options: string[];
  onClick: (option: string[]) => void;
  selectedOptions: string[];
};

const Options: React.FC<Props> = ({ options, onClick, selectedOptions }) => {
  const handleOptionClick = (option: string) => {
    toast.info("Log in to make chanegs");
    return;

    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];
    onClick(updatedOptions);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="font-bold text-xl text-gray-700">
          Select the options you want to include in your blog
        </div>
        <div className="font-light text-xs text-gray-700">
          Please log in to make changes
        </div>
      </div>
      <div className="flex space-y-4 flex-col">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`py-2 hover:shadow-2xl vote-option px-4 border-2 border-gray-200 rounded-md shadow-md relative transition-all duration-500 bg-white   cursor-not-allowed ${
              selectedOptions.includes(option) ? "border-violet-400 " : ""
            }`}
          >
            <div className="flex items-center ">
              <span className="flex items-center w-6 h-6 transition-all duration-200 rounded-full">
                {selectedOptions.includes(option) ? (
                  <CheckIcon className="bg-violet-400 text-gray-50 rounded-md" />
                ) : (
                  <CircleIcon className="rounded-full" />
                )}
              </span>
              <div>{option}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
