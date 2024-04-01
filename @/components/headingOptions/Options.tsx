import React, { useEffect, useMemo, useState } from "react";

import { OptionsItem } from "./OptionsItem";
import { AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

type OptionsProps = {
  options: string[];
  handleOptionSelection: (option: string[]) => void;
  isLoading: boolean;
};

const Options: React.FC<OptionsProps> = ({
  options,
  handleOptionSelection,
  isLoading,
}) => {
  return (
    <div className="">
      <div className="mb-4">
        <div className="font-bold text-xl text-gray-700">
          Select the options you want to include in your blog
        </div>
        <div className="font-light text-xs text-gray-700">
          Please log in to make changes
        </div>
      </div>
      <div className="flex space-y-4 flex-col pr-4 h-[50vh]">
        <OptionList
          options={options}
          isLoading={isLoading}
          handleOptionSelection={handleOptionSelection}
        />
      </div>
    </div>
  );
};
export default Options;

const OptionList: React.FC<{
  options: string[];
  isLoading: boolean;
  handleOptionSelection: (options: string[]) => void;
}> = ({ options, isLoading, handleOptionSelection }) => {
  const handleDelete = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    handleOptionSelection(newOptions);
  };

  const [allOption, setAllOption] = useState<string[]>([]);
  useEffect(() => {
    if (isLoading) {
      setAllOption(Array(8).fill(""));
    } else {
      setAllOption(options);
    }
  }, [isLoading, options]);

  return (
    <AnimatePresence>
      {allOption.map((_, index: number) => (
        <OptionsItem
          key={index}
          itemIndex={index}
          isLoading={isLoading}
          option={options[index]}
          handleDelete={() => {
            handleDelete(index);
          }}
        />
      ))}
      {allOption.length < 8 && (
        <div>
          <Button>Add new </Button>
        </div>
      )}
    </AnimatePresence>
  );
};
