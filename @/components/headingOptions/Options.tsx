import React, { useEffect, useMemo, useState } from "react";

import { useUser } from "../../context/user";
import useRequestForOptionChange from "../../hooks/useRequestForOptionChange";
import { OptionsItem } from "./OptionsItem";

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
  //* INFO: this is done to trigger the animation on refetch
  const [key, setKey] = useState(Math.random());
  const [allOptions, setAllOptions] = useState([...Array(8)]);
  useEffect(() => {
    if (isLoading) {
      setKey(Math.random());
    } else {
      setAllOptions(options);
    }
  }, [isLoading]);

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
      <div className="flex space-y-4 flex-col pr-4 max-h-[50vh]">
        <OptionList
          allOptions={allOptions}
          key={key}
          options={options}
          isLoading={isLoading}
          handleOptionSelection={handleOptionSelection}
        />
      </div>
    </div>
  );
};
export default Options;

const OptionList = ({
  allOptions,
  options,
  isLoading,
  handleOptionSelection,
}) => {
  const handleDelete = (index: number) => {
    const newOptions = options.slice(0, index).concat(options.slice(index + 1));
    handleOptionSelection(newOptions);
  };

  return allOptions.map((_, index: number) => (
    <OptionsItem
      key={index}
      itemIndex={index}
      isLoading={isLoading}
      option={options[index]}
      // handleRefetch={() => {
      //   handleOptionSelection(
      //     options.map((op, i) => (index === i ? "New " : op))
      //   );
      // }}
      // handleDelete={() => {
      //   handleDelete(index);
      // }}
    />
  ));
};
