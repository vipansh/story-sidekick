import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import useRequestForOptionChange from "../../hooks/useRequestForOptionChange";
import ArrowPath from "../../svg/ArrowPath";
import Trash from "../../svg/Trash";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const OptionsItem = ({
  itemIndex,
  isLoading,
  option,
  handleDelete,
}: {
  itemIndex: number;
  isLoading: boolean;
  option: string;
  handleDelete: () => void;
}) => {
  const [loading, setLoading] = useState(true);

  const { requestForOptionChange } = useRequestForOptionChange();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handleRefetch = async () => {
    setLoading(true);
    try {
      const response = await requestForOptionChange(
        "fix",
        "INSERT_YOUR_OPTION_HERE"
      );
      // Handle the data as per your requirement
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div
      className={` border border-gray-50 rounded-md shadow relative bg-white cursor-pointer p-2`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.09, delay: itemIndex * 0.1 }}
    >
      <div className="flex items-center gap-2">
        <div className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
          {itemIndex + 1}
        </div>
        {loading ? (
          <motion.div
            className="w-full"
            transition={{ duration: 0.06, delay: itemIndex * 0.1 }}
          >
            <div
              style={{ width: `${Math.floor(Math.random() * 50)}%` }}
              className={`ml-2 h-4 bg-gray-200 rounded-md animate-pulse`}
            ></div>
          </motion.div>
        ) : (
          <div className="flex justify-between gap-2 flex-1">
            <motion.div
              className={`relative  cursor-pointer`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: itemIndex * 0.01 }}
            >
              {option}
            </motion.div>
            <div className="flex justify-between gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={handleRefetch}>
                    <div className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold flex items-center justify-center">
                      <ArrowPath className="text-blue-600 size-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refetch this heading</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={handleDelete}>
                    <div className="size-6 rounded bg-red-50 text-center text-[10px]/6 font-bold flex items-center justify-center">
                      <Trash className="text-red-600 size-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove the heading</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
