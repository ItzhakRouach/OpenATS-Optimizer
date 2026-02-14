import type { InterviewData } from "../types/interfaces";

interface Props {
  data: InterviewData | null;
  isLoading: boolean;
}

export function InterviewPrep({ data, isLoading }: Props) {
  // handle loading state
  if (isLoading) {
    return (
      <div className="animate-pulse bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white p-10 mt-8 text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium text-lg">
          Llama 3 is crafting your custom interview...
        </p>
      </div>
    );
  }

  // if no data dont render nothing
  if (!data) return null;

  // render the UI
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white p-8 md:p-10 mt-8 w-full max-w-3xl mx-auto transition-all">
      <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">
        Personal Interview Preparation
      </h2>
      {/** Tips Section */}
      <div className="mb-10 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Top 3 Interview Tips
        </h3>
        <ul className="space-y-3">
          {data.tips.map((tip, index) => (
            <li
              key={index}
              className="flex gap-3 text-slate-700 font-medium leading-relaxed"
            >
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/** Questions Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          {" "}
          <span className="text-2xl">🎯</span> Practice Questions{" "}
        </h3>{" "}
        <div className="space-y-6">
          {data.questions.map((question, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="mb-4">
                <span
                  className={`text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full inline-block ${
                    question.type.toLowerCase().includes("technical")
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {question.type} Question
                </span>
              </div>
              <p className="font-bold text-xl text-slate-900 mb-5 leading-relaxed">
                {question.question}
              </p>

              <div className="bg-slate-50 border-l-4 border-emerald-400 p-4 rounded-r-xl group-hover:bg-blue-50/50 transition-colors">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Checklist: What to mention
                </p>
                <ul className="space-y-2">
                  {question.expected_answer_points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-sm text-slate-700 font-medium"
                    >
                      <span className="text-emerald-500">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
