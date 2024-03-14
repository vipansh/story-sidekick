import React, { useState } from "react";
import BlogPostForm from "./BlogPostForm";
import HeadingSelectionModal from "./HeadingSelectionModal";

const BlogPostCreator = () => {
  const [topicInput, setTopicInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showModal();
  };

  return (
    <section className="mx-auto max-w-lg">
      <BlogPostForm
        onSubmit={handleSubmit}
        topicInput={topicInput}
        setTopicInput={setTopicInput}
      />

      {isModalOpen && (
        <HeadingSelectionModal
          isOpen={isModalOpen}
          onClose={hideModal}
          topicInput={topicInput}
        />
      )}
    </section>
  );
};

export default BlogPostCreator;
