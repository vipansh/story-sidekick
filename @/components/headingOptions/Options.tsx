import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import useRequestForOptionChange from "../../hooks/useRequestForOptionChange";
import { Button } from "../ui/button";
import { OptionsItem } from "./OptionsItem";

type OptionsProps = {
  options: string[];
  handleOptionSelection: (option: string[]) => void;
  isLoading: boolean;
  prompt: string;
};

const Options: React.FC<OptionsProps> = ({
  options,
  handleOptionSelection,
  isLoading,
  prompt,
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
          prompt={prompt}
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
  prompt: string;
}> = ({ options, isLoading, handleOptionSelection, prompt }) => {
  const [allOption, setAllOption] = useState<string[]>([]);
  const { requestForOptionChange } = useRequestForOptionChange();

  useEffect(() => {
    if (isLoading) {
      setAllOption(Array(8).fill(""));
    } else {
      setAllOption(options);
    }
  }, [isLoading, options]);

  const handleDelete = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    handleOptionSelection(newOptions);
  };

  const updateOption = (newOption: string, index: number) => {
    const newOptions = options.map((option, i) =>
      i === index ? newOption : option
    );
    handleOptionSelection(newOptions);
  };

  const addNewOption = async () => {
    handleOptionSelection([...options, ""]);
    try {
      const response = await requestForOptionChange(prompt, "", true);
      // Handle the data as per your requirement
      console.log(response);
      handleOptionSelection([...options, response.heading]);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {allOption.map((_, index: number) => (
        <OptionsItem
          key={index}
          itemIndex={index}
          isLoading={isLoading || options[index] === ""}
          option={options[index]}
          handleDelete={() => {
            handleDelete(index);
          }}
          updateOption={updateOption}
          prompt={prompt}
        />
      ))}
      {allOption.length < 8 && (
        <div>
          <Button onClick={addNewOption}>Add new </Button>
        </div>
      )}
    </AnimatePresence>
  );
};
