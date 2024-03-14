import { motion } from "framer-motion";
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
}: {
  itemIndex: number;
  isLoading: boolean;
  option: string;
}) => {
  return (
    <motion.div
      className={` border border-gray-50 rounded-md shadow relative bg-white cursor-pointer p-2`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.09, delay: itemIndex * 0.1 }}
    >
      <div className="flex items-center gap-2">
        <div className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
          {itemIndex + 1}
        </div>
        {isLoading ? (
          <div className="w-full">
            <div
              style={{ width: `${Math.floor(Math.random() * 50)}%` }}
              className={`ml-2 h-4 bg-gray-200 rounded-md animate-pulse`}
            ></div>
          </div>
        ) : (
          <div className="flex justify-between gap-2 flex-1">
            <motion.div
              className={`relative  cursor-pointer`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.06, delay: itemIndex * 0.1 }}
            >
              {option}
            </motion.div>
            <div className="flex justify-between gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
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
                  <TooltipTrigger>
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
