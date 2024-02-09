import { useState, useRef, FormEvent } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { QuestionType } from "../lib/requestToOpenAi/requestForQuestions/standerdRes";
import { Dialog, DialogTrigger } from "./ui/dialog";
import QuestionModal from "./questionnaire/QuestionModal";

const Form = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const promptRef = useRef<HTMLInputElement>(null);
  const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);
  const { fetchQuestions } = useFetchQuestions();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const questions = await fetchQuestions(promptRef.current.value);
    console.log({ questions });
    setQuestionsList(Object.values(questions));
    setOpenModal(true);
  };

  return (
    <section className="mx-auto max-w-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle>AI Blog Post Generator</CardTitle>
          <CardDescription>
            Generate a unique and engaging blog post in seconds
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prompt">Enter your desired blog topic</Label>
                <Input
                  ref={promptRef}
                  name="prompt"
                  id="prompt"
                  placeholder="Type the blog topic here"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className={cn("w-full")} type="submit">
              Generate Blog Post
            </Button>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <QuestionModal questionsList={questionsList} />
            </Dialog>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Form;
