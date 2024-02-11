import React from "react";
import { useState, useRef, FormEvent } from "react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import useFetchQuestions from "../hooks/useFetchQuestions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import LoaderModalAnimation from "./Loader";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useCreateBlog from "../hooks/useCreateBlog";
import { QuestionStructure } from "../lib/requestToOpenAi/requestForHeadding/standerdRes";
import HeadingOptionsComp from "./headingOptions/HeadingOptionsComp";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState(false);

  const promptRef = useRef<HTMLInputElement>(null);
  const [headingOptions, setHeadingOptions] = useState<QuestionStructure>({
    headingsOption: [],
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const { fetchQuestions } = useFetchQuestions();
  const { action, loading: loadingCreateBlog } = useCreateBlog();

  const openDialog = () => setDialogState(true);
  const closeDialog = () => setDialogState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const questions = await fetchQuestions(promptRef.current?.value || "");
      setHeadingOptions(questions);
      setSelectedOptions(questions.headingsOption.slice(0, 5));
      openDialog();
    } catch (error) {
      console.error("Fetching questions failed", error);
      toast.error("An error occurred while generating questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    const fullPrompt = `${prompt},
    Extra information make your blog around----------
    ${JSON.stringify(selectedOptions)}`;
    action(fullPrompt);
    closeDialog();
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
        {dialogState && (
          <Dialog open={dialogState} onOpenChange={() => closeDialog()}>
            <DialogContent className="py-4 w-5/6 mx-auto ">
              <HeadingOptionsComp
                options={headingOptions.headingsOption}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
              />
              <DialogFooter className="py-4">
                <Button type="submit" onClick={handleGenerate}>
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
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
