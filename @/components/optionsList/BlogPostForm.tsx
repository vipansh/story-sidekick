import React from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  topicInput: string;
  setTopicInput: (value: string) => void;
};

const BlogPostForm: React.FC<Props> = ({
  onSubmit,
  topicInput,
  setTopicInput,
}) => {
  const handleTopicInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTopicInput(event.target.value);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle>AI Blog Post Creator</CardTitle>
        <CardDescription>
          Create a unique and engaging blog post quickly
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <Label htmlFor="framework">Blog Topic</Label>
          <Input
            value={topicInput}
            onChange={handleTopicInputChange}
            name="topic"
            id="topic"
            placeholder="Enter the blog topic"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className={"w-full"} type="submit">
            Create Blog Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BlogPostForm;
