import type { InterviewResponse } from "../types/interfaces";

export const fetchInterviewQuestions = async (
  resumeText: string,
  jobDescription: string,
): Promise<InterviewResponse> => {
  try {
    // sending the request to the backend
    const response = await fetch("http://localhost:3000/api/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText: resumeText,
        jobDescription: jobDescription,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate questions");
    }

    const result = await response.json();
    return result as InterviewResponse;
  } catch (error) {
    console.log("Error fetching intervirw prep:", error);
    throw error;
  }
};
