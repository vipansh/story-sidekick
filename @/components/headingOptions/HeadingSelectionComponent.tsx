import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import Options from "./Options";

type Props = {
  options: string[];
  setChosenOptions: React.Dispatch<React.SetStateAction<string[]>>;
  chosenOptions: string[];
};

const HeadingSelectionComponent: React.FC<Props> = ({
  options,
  setChosenOptions,
  chosenOptions,
}) => {
  const handleQuestionClick = (options: string[]) => {
    setChosenOptions(options);
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
            selectedOptions={chosenOptions}
          />
        </div>
      </div>
    </>
  );
};

export default HeadingSelectionComponent;
