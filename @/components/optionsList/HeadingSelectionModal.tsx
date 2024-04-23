import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUser } from "../../context/user";
import useQuestionRetrieval from "../../hooks/useFetchQuestions";
import useGenerateBlogPost from "../../hooks/useGenerateBlogPost";
import Loader from "../Loader";
import HeadingSelectionComponent from "../headingOptions/HeadingSelectionComponent";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  topicInput: string;
};

const HeadingSelectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  topicInput,
}) => {
  const [chosenHeadings, setChosenHeadings] = useState<string[]>([]);
  const { user, login } = useUser();
  const { generateBlogPost, isLoading: isGeneratingPost } =
    useGenerateBlogPost();
  const { retrieveQuestions, isLoading: isFetchingQuestions } =
    useQuestionRetrieval();

  useEffect(() => {
    handleRefetch();
  }, []);

  const handleCreateBlog = async () => {
    const prompt = `${topicInput}, Markdown context for your blog post: ${JSON.stringify(chosenHeadings)}`;
    try {
      const blogPost = await generateBlogPost(prompt);
      console.log(blogPost);
    } catch (err) {
      console.error("Error generating blog post", err);
      toast.error("Failed to generate blog post.");
    }
  };

  const handleRefetch = async () => {
    try {
      const { headingsOption } = await retrieveQuestions(topicInput);
      setChosenHeadings(headingsOption);
    } catch (error) {
      console.error("Error retrieving headings", error);
      toast.error("Failed to generate headings.");
    }
  };

  const handleOptionSelection = (options: string[]) => {
    setChosenHeadings(options);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="py-4 w-5/6 mx-auto">
        {isGeneratingPost && <Loader message="Generating blog post..." />}
        <HeadingSelectionComponent
          options={chosenHeadings}
          handleOptionSelection={handleOptionSelection}
          isLoading={isFetchingQuestions}
          prompt={topicInput}
        />
        <Button onClick={handleRefetch} variant="ghost">
          Retrieve New Headings
        </Button>
        <DialogFooter className="py-4 gap-2">
          {!user && (
            <Button variant="secondary" onClick={login} className="ml-2">
              Login to save blog by your name
            </Button>
          )}
          <Button type="submit" onClick={handleCreateBlog}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeadingSelectionModal;
