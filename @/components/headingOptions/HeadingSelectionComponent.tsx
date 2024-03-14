import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import Options from "./Options";

type Props = {
  options: string[];
  handleOptionSelection: (options: string[]) => void;
  isLoading: boolean;
};

const HeadingSelectionComponent: React.FC<Props> = ({
  options,
  handleOptionSelection,
  isLoading,
}) => {
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
            handleOptionSelection={handleOptionSelection}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default HeadingSelectionComponent;
