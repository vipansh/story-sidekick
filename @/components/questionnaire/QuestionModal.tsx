import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Question from "./Question"; // Make sure this path is correct
import { Separator } from "../ui/separator";

type Props = {
  questionsList: any[];
  primaryAction: () => void;
  selectedOptions: Record<string, string[]>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

const QuestionModal: React.FC<Props> = ({
  questionsList,
  primaryAction,
  setSelectedOptions,
  selectedOptions,
}) => {
  const handleQuestionClick = (questionId: string, options: string[]) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: options }));
  };

  const requestBlog = () => {
    primaryAction();
  };

  return (
    <DialogContent className="py-4 w-5/6 mx-auto ">
      <DialogHeader className="pt-4">
        <DialogTitle>Answer a Few Questions</DialogTitle>
        <DialogDescription>
          Please answer a few questions below.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col md:flex-row  overflow-auto space-x-2  ">
        <div className="grid gap-4 py-1 flex-1">
          {questionsList.map((question) => (
            <Question
              key={question.question} // Assuming each question has a unique id
              question={question}
              onClick={(updatedQuestion) =>
                handleQuestionClick(
                  updatedQuestion.question,
                  updatedQuestion.options
                )
              }
              selectedOptions={selectedOptions[question.question] || []}
            />
          ))}
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">log in to unlock these feature</div>
      </div>
      <DialogFooter className="py-4">
        <Button type="submit" onClick={requestBlog}>
          Generate
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default QuestionModal;
