import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import React from "react";

type QuestionProps = {
  question: any;
  onClick: (data: any) => void;
  selectedOptions: string[];
};

const Question: React.FC<QuestionProps> = ({
  question,
  onClick,
  selectedOptions,
}) => {
  const handleOptionClick = (option: string) => {
    const updatedOptions = [option];
    // Update state or call the onClick function with updated data
    onClick({ ...question, options: updatedOptions });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="font-bold text-xl text-gray-700">
          {question.question}
        </div>
        <div className="font-light text-xs text-gray-700">
          Choose only one option
        </div>
      </div>
      <div className="flex space-y-4 flex-col">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`py-2 hover:shadow-2xl vote-option px-4 border-2 border-gray-200 rounded-md shadow-md relative transition-all duration-500 bg-white cursor-pointer ${
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

export default Question;
