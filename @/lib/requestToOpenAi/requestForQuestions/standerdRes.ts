export type QuestionStructure = Record<any, QuestionType>;

export type QuestionType = {
      question: string;
      options: string[];
}
export const exampleQuestionStructure: QuestionStructure = {
      1: {
            question: "Desired Depth of Information",
            options: [
                  "Overview and basic concepts",
                  "Detailed technical comparison",
                  "Real-world applications and case studies",
                  "Performance benchmarks and statistics"
            ]
      },
      2: {
            question: "Target Audience",
            options: [
                  "Beginners with little to no experience",
                  "Intermediate users",
                  "Advanced programmers",
                  "Non-technical audience"
            ]
      },
}

