import type { AnalysisResult } from "../types/interfaces";

interface ResultCardProp {
  aiResult: AnalysisResult | null;
}

export function ResultCard({ aiResult }: ResultCardProp) {
  return (
    <div className="mt-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section with Score */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
          <h2 className="text-sm font-uppercase tracking-widest opacity-80 mb-2">
            ATS MATCH SCORE
          </h2>
          <div className="relative inline-block">
            <span className="text-7xl font-black">{aiResult?.data.score}</span>
            <span className="text-2xl opacity-70 ml-1">/100</span>
          </div>
        </div>

        <div className="p-8">
          {/* Missing Keywords Section */}
          <div className="mb-8">
            <h3 className="text-gray-900 font-bold mb-4 flex items-center">
              <span className="bg-blue-100 p-1 rounded-md mr-2">🎯</span>
              Keyword Optimization
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiResult?.data?.missingKeywords &&
              aiResult.data.missingKeywords.length > 0 ? (
                aiResult.data.missingKeywords.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-tight"
                  >
                    + {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-green-600 italic font-medium">
                  ✨ All essential keywords found!
                </p>
              )}
            </div>
          </div>

          {/* Actionable Feedback Section */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 flex items-center">
              <span className="bg-amber-100 p-1 rounded-md mr-2">💡</span>
              Top Improvements
            </h3>
            <div className="space-y-4">
              {aiResult?.data.feedback.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <span className="text-blue-500 font-bold">0{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
