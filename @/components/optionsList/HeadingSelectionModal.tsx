import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import HeadingSelectionComponent from "../headingOptions/HeadingSelectionComponent";
import { Button } from "../ui/button";
import { useUser } from "../../context/user";
import Loader from "../Loader";
import { toast } from "sonner";
import useGenerateBlogPost from "../../hooks/useGenerateBlogPost";
import useQuestionRetrieval from "../../hooks/useFetchQuestions";
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
  const [chosenHeadings, setChosenHeadings] = useState([]);

  const { user, login } = useUser();
  const { generateBlogPost, isLoading: isGeneratingPost } =
    useGenerateBlogPost();
  const { retrieveQuestions, isLoading } = useQuestionRetrieval();

  useEffect(() => {
    handleRefetch();
  }, []);

  const handleCreateBlog = async () => {
    const prompt = `${topicInput},
      Markdown context for your blog post:
      ${JSON.stringify(chosenHeadings)}`;
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
      const retrievedHeadings = await retrieveQuestions(topicInput);
      setChosenHeadings(retrievedHeadings.headingsOption);
    } catch (error) {
      console.error("Error retrieving headings", error);
      toast.error("Failed to generate headings.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isGeneratingPost && <Loader message="Generating blog post..." />}

      <DialogContent className="py-4 w-5/6 mx-auto">
        <HeadingSelectionComponent
          options={chosenHeadings}
          setChosenOptions={setChosenHeadings}
          isLoading={isLoading}
        />
        <Button onClick={handleRefetch}>Refetch</Button>
        <DialogFooter className="py-4 gap-2">
          {!user && (
            <Button variant="outline" onClick={login} className="ml-2">
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
