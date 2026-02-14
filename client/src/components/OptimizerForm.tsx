interface OptimizerFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  jobDesc: string;
  setJobDesc: (desc: string) => void;
}

export function OptimizerForm({
  handleSubmit,
  setFile,
  isLoading,
  jobDesc,
  setJobDesc,
}: OptimizerFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* File Upload Section */}
      <div className="group">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
          Step 1: Upload Resume
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setFile(files[0]);
              }
            }}
            className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-2xl file:border-0
                  file:text-xs file:font-black file:uppercase file:tracking-widest
                  file:bg-slate-900 file:text-white
                  hover:file:bg-blue-600 file:transition-all
                  cursor-pointer bg-slate-50 rounded-2xl border border-slate-100 p-2"
          />
        </div>
      </div>

      {/* Job Description Section */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
          Step 2: Target Job Description
        </label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the requirements here..."
          className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-700 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all min-h-[200px] resize-none leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 transform active:scale-[0.98] shadow-lg
              ${
                isLoading
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-blue-500/40 hover:-translate-y-1"
              }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing with AI...
          </span>
        ) : (
          "Run Optimizer"
        )}
      </button>
    </form>
  );
}
