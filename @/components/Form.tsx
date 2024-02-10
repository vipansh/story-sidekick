import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { QuestionType } from "../lib/requestToOpenAi/requestForQuestions/standerdRes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import QuestionModal from "./questionnaire/QuestionModal";
import LoaderModalAnimation from "./Loader";
import { Dialog } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useCreateBlog from "../hooks/useCreateBlog";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState({
    questionModal: false,
  });

  const promptRef = useRef<HTMLInputElement>(null);
  const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);
  const { fetchQuestions } = useFetchQuestions();
  const { action, loading: loadingCreateBlog } = useCreateBlog();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});

  const openDialog = (dialogName: keyof typeof dialogState) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: true }));
  };

  const closeDialog = (dialogName: keyof typeof dialogState) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: false }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const questions = await fetchQuestions(promptRef.current?.value || "");
      setQuestionsList(Object.values(questions));
      openDialog("questionModal");
    } catch (error) {
      console.error("Fetching questions failed", error);
      toast.error("An error occurred while generating questions.");
    } finally {
      setLoading(false);
    }
  };

  const prompt = `${promptRef?.current?.value},
  Extra inforamtion----------
  ${JSON.stringify(selectedOptions)}
  `;
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
            <Label htmlFor="prompt">Enter your desired blog topic</Label>
            <Input
              ref={promptRef}
              name="prompt"
              id="prompt"
              placeholder="Type the blog topic here"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className={cn("w-full")} type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Blog Post"}
            </Button>
          </CardFooter>
        </form>
        {dialogState.questionModal && (
          <Dialog
            open={dialogState.questionModal}
            onOpenChange={() => closeDialog("questionModal")}
          >
            <QuestionModal
              questionsList={questionsList}
              primaryAction={() => {
                closeDialog("questionModal");
                action(prompt);
              }}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </Dialog>
        )}
        {loading && <LoaderModalAnimation message="Loading..." />}
        {loadingCreateBlog && (
          <LoaderModalAnimation message="Generating your blog post. This usually takes 30 seconds." />
        )}
      </Card>
    </section>
  );
};

export default Form;
