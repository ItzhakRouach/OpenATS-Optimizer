/**
 * Entity: ResumeAnalysis
 * Represents the core result of an ATS scan.
 *It defines WHAT our data looks like.
 */

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  context?: string;
}

export class ResumeAnalysis {
  constructor(
    public readonly id: string,
    public readonly score: number,
    public readonly missingKeywords: string[],
    public readonly foundKeywords: KeywordMatch[],
    public readonly feedback: string[],
    public readonly createdAt: Date,
  ) {
    // Validate the Return answer
    if (score < 0 || score > 100) {
      throw new Error("Score must be between 0 to 100");
    }
  }

  // Check if the resume passed the "ATS threshold"
  isPassing(): boolean {
    return this.score >= 70;
  }
}
