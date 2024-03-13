import React from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import HeadingSelectionComponent from "../headingOptions/HeadingSelectionComponent";
import { Button } from "../ui/button";
import { useUser } from "../../context/user";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  headingsData: { headingsOption: string[] };
  chosenHeadings: string[];
  setChosenHeadings: React.Dispatch<React.SetStateAction<string[]>>;
  onCreateBlog: () => void;
};

const HeadingSelectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  headingsData,
  chosenHeadings,
  setChosenHeadings,
  onCreateBlog,
}) => {
  const { user, login } = useUser();

  const selectAllHeadings = () => {
    setChosenHeadings(headingsData.headingsOption);
  };

  const deselectAllHeadings = () => {
    setChosenHeadings([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="py-4 w-5/6 mx-auto">
        <HeadingSelectionComponent
          options={headingsData.headingsOption}
          setChosenOptions={setChosenHeadings}
          chosenOptions={chosenHeadings}
        />
        <DialogFooter className="py-4 gap-2">
          <Button
            variant="outline"
            onClick={deselectAllHeadings}
            className="mr-2"
          >
            Deselect All
          </Button>
          <Button
            variant="outline"
            onClick={selectAllHeadings}
            className="ml-2"
          >
            Select All
          </Button>
          {!user && (
            <Button variant="outline" onClick={login} className="ml-2">
              Login to save blog by your name
            </Button>
          )}
          <Button type="submit" onClick={onCreateBlog}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeadingSelectionModal;
