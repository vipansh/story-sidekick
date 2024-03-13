import React, { useState } from "react";
import useGenerateBlogPost from "../../hooks/useGenerateBlogPost";
import { toast } from "sonner";
import useQuestionRetrieval from "../../hooks/useFetchQuestions";
import BlogPostForm from "./BlogPostForm";
import HeadingSelectionModal from "./HeadingSelectionModal";
import Loader from "../Loader";

const BlogPostCreator = () => {
  const [headingsData, setHeadingsData] = useState({ headingsOption: [] });
  const [chosenHeadings, setChosenHeadings] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { retrieveQuestions } = useQuestionRetrieval();
  const { generateBlogPost, isLoading: isGeneratingPost } =
    useGenerateBlogPost();

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const retrievedHeadings = await retrieveQuestions(topicInput);
      console.log({ retrievedHeadings });
      setHeadingsData(retrievedHeadings);
      setChosenHeadings(retrievedHeadings.headingsOption.slice(0, 5));
      showModal();
    } catch (error) {
      console.error("Error retrieving headings", error);
      toast.error("Failed to generate headings.");
    }
  };

  const handleCreateBlog = async () => {
    const prompt = `${topicInput},
    Additional context for your blog post:
    ${JSON.stringify(chosenHeadings)}`;
    try {
      const blogPost = await generateBlogPost(prompt);
      // Handle the generated blog post
      console.log(blogPost);
    } catch (err) {
      console.error("Error generating blog post", err);
      toast.error("Failed to generate blog post.");
    }
  };

  return (
    <section className="mx-auto max-w-lg">
      <BlogPostForm
        onSubmit={handleSubmit}
        topicInput={topicInput}
        setTopicInput={setTopicInput}
      />

      <HeadingSelectionModal
        isOpen={isModalOpen}
        onClose={hideModal}
        headingsData={headingsData}
        chosenHeadings={chosenHeadings}
        setChosenHeadings={setChosenHeadings}
        onCreateBlog={handleCreateBlog}
      />

      {isGeneratingPost && <Loader message="Generating blog post..." />}
    </section>
  );
};

export default BlogPostCreator;
