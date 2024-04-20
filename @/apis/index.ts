import { AxiosPromise } from "axios";
import modifyRequestHandler from "../lib/modifyRequestHandler";
import { RequestForOptionChangeRequest, RequestForOptionChangeResponseData } from "./type";

export const requestForOptionChange = (data?: RequestForOptionChangeRequest): AxiosPromise<RequestForOptionChangeResponseData> =>
  modifyRequestHandler({
    method: "POST",
    url: "/api/request-for-option-change",
    data,
  });


export const generateBlogPost = (prompt: string): AxiosPromise<{ blogId?: string }> =>
  modifyRequestHandler({
    method: "POST",
    url: "/api/generate-blog-post",
    data: { prompt },
  });


export const requestForQuestion = (prompt: string): AxiosPromise<{ headingsOption: string[]; }> =>
  modifyRequestHandler({
    method: "POST",
    url: "/api/request-for-question",
    data: { prompt },
  });
