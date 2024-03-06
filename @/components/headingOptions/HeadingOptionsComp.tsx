import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import Options from "./Options";

type Props = {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const HeadingOptionsComp: React.FC<Props> = ({
  options,
  setSelectedOptions,
  selectedOptions,
}) => {
  const handleQuestionClick = (options: string[]) => {
    setSelectedOptions(options);
  };

  return (
    <>
      <DialogHeader className="pt-4">
        <DialogTitle>Customize your blog</DialogTitle>
        <DialogDescription>Select from the options below.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col md:flex-row  overflow-auto space-x-2  ">
        <div className="grid gap-4 py-1 flex-1">
          <Options
            options={options}
            onClick={handleQuestionClick}
            selectedOptions={selectedOptions} // Removed unnecessary brackets
          />
        </div>
      </div>
    </>
  );
};

export default HeadingOptionsComp;
