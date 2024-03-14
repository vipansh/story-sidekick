import React, { useEffect, useMemo, useState } from "react";

import { useUser } from "../../context/user";
import useRequestForOptionChange from "../../hooks/useRequestForOptionChange";
import { motion } from "framer-motion";

type Props = {
  options: string[];
  onClick: (option: string[]) => void;
  isLoading: boolean;
};

const Options: React.FC<Props> = ({ options, onClick, isLoading }) => {
  const { user } = useUser();
  const { requestForOptionChange } = useRequestForOptionChange();

  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    isLoading && setKey(Math.random());
  }, [isLoading]);

  return (
    <div className="max-h-[50vh]">
      <div className="mb-4">
        <div className="font-bold text-xl text-gray-700">
          Select the options you want to include in your blog
        </div>
        <div className="font-light text-xs text-gray-700">
          Please log in to make changes
        </div>
      </div>
      <div className="flex space-y-4 flex-col pr-4">
        <OptionList
          allOptions={[...Array(8)]}
          key={key}
          options={options}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
export default Options;

const OptionList = ({ allOptions, options, isLoading }) => {
  return allOptions.map((_, index) => (
    <OptionsItem
      key={index}
      index={index}
      isLoading={isLoading}
      option={options[index]}
    />
  ));
};
const OptionsItem = ({ index, isLoading, option }) => {
  return (
    <motion.div
      className={` border border-gray-50 rounded-md shadow relative bg-white cursor-pointer p-2`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.09, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-2">
        <div className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
          {index + 1}
        </div>
        {isLoading ? (
          <div className="w-full">
            <div
              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
              className={`ml-2 h-4 bg-gray-200 rounded-md animate-pulse`}
            ></div>
          </div>
        ) : (
          <motion.div
            className={`relative  cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09, delay: index * 0.1 }}
          >
            {option}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
