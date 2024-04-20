export interface RequestForOptionChangeResponseData {
      heading: string;
}

export type RequestForOptionChangeRequest = {
      prompt: string;
      option: string;
      newOption?: boolean;
};


