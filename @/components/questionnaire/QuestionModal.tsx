import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Question from "./Question"; // Make sure this path is correct
import { QuestionType } from "../../lib/requestToOpenAi/requestForQuestions/standerdRes";
import { Separator } from "../ui/separator";

type Props = {
  questionsList: QuestionType[];
  primaryAction: () => void;
};

const QuestionModal: React.FC<Props> = ({ questionsList, primaryAction }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});

  const handleQuestionClick = (questionId: string, options: string[]) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: options }));
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
        <Button type="submit" onClick={primaryAction}>
          Generate
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default QuestionModal;
