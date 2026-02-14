import "./App.css";
import { useState } from "react";
import { ResultCard } from "./components/ResultCard";
import { OptimizerForm } from "./components/OptimizerForm";
import { InterviewPrep } from "./components/InterviewPrep";
import { fetchInterviewQuestions } from "./services/api";
import type { InterviewData } from "./types/interfaces";
import type { ATSResponse } from "./types/interfaces";
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<ATSResponse | null>(null);
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null,
  );
  const [isInterviewLoading, setIsInterviewLoaing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Stop the browser from refreshing the page on submit
    e.preventDefault();

    if (!file || !jobDesc) {
      alert("Please Provide both a resume and a job description.");
      return;
    }
    setIsLoading(true);
    setAiResult(null);
    setInterviewData(null);
    setIsInterviewLoaing(false);

    try {
      const formData = new FormData();
      // Append the user resume and job description
      formData.append("resume", file);
      formData.append("jobDescription", jobDesc);

      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        body: formData,
      });

      // handle error in the response
      if (!response.ok) {
        const message = `An error has occures: ${response.status}`;
        alert("Error Has happend try again.");
        throw new Error(message);
      }

      const data = await response.json();
      setAiResult(data);
      console.log("AI Result:", data);
    } catch (err) {
      console.log("Failed to fetch from backend:", err);
      alert("Something went wrong connecting to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateInterview = async () => {
    const extractedText = aiResult?.resumeText || "";
    if (!extractedText || !jobDesc) {
      alert("Resume Text is missing from the analysis result!");
    }

    setIsInterviewLoaing(true);
    try {
      const response = await fetchInterviewQuestions(extractedText, jobDesc);
      setInterviewData(response.data);
    } catch (err) {
      console.log("Failed to fecth interview questions.", err);
    } finally {
      setIsInterviewLoaing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-50 via-gray-100 to-slate-200 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            OpenATS <span className="text-blue-600">Optimizer</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Powered by Llama 3. Tailor your professional story to any job
            description in seconds.
          </p>
        </div>

        {/* Main Input Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white p-10 transition-all">
          <OptimizerForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            setJobDesc={setJobDesc}
            setFile={setFile}
            jobDesc={jobDesc}
          />
        </div>
        {/** Display AI Result */}
        {aiResult && (
          <div className="space-y-8 mb-12">
            <ResultCard aiResult={aiResult} />

            {/* --- NEW INTERVIEW FEATURE: Trigger Button --- */}
            {!interviewData && (
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerateInterview}
                  disabled={isInterviewLoading}
                  className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                    isInterviewLoading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-xl"
                  }`}
                >
                  {isInterviewLoading
                    ? "Generating Questions..."
                    : "Generate Personal Interview Example"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- NEW INTERVIEW FEATURE --- */}
        {(interviewData || isInterviewLoading) && (
          <InterviewPrep data={interviewData} isLoading={isInterviewLoading} />
        )}
      </div>
    </div>
  );
}

export default App;
