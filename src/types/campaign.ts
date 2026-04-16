export type CampaignStatus = "active" | "pending" | "completed" | "draft";

export type SubmissionStatus = "approved" | "pending" | "rejected" | "not_submitted";

export interface Submission {
    id: string;
    fileName: string;
    fileType: string;
    submittedAt: string;
    status: SubmissionStatus;
    feedback?: string;
}

export interface EngagementMetrics {
    likes: number;
    shares: number;
    comments: number;
    impressions: number;
}

export interface PerformanceData {
    totalPostsSubmitted: number;
    postingDates: string[];
    estimatedEngagement: EngagementMetrics;
    weeklyEngagement: { week: string; likes: number; shares: number; comments: number }[];
}

export interface Campaign {
    id: string;
    title: string;
    brand: string;
    brandLogo: string;
    description: string;
    instructions: string[];
    status: CampaignStatus;
    deadline: string;
    startDate: string;
    budget: string;
    platform: string;
    submissions: Submission[];
    performance: PerformanceData;
}