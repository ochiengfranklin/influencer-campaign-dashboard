import type {CampaignStatus, SubmissionStatus} from "../types/campaign";

const campaignStatusStyles: Record<CampaignStatus, string> = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
};

const submissionStatusStyles: Record<SubmissionStatus, string> = {
    approved: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    not_submitted: "bg-gray-100 text-gray-600 border-gray-200",
};

interface StatusBadgeProps {
    status: CampaignStatus | SubmissionStatus;
    type?: "campaign" | "submission";
}

export function StatusBadge({ status, type = "campaign" }: StatusBadgeProps) {
    const styles =
        type === "campaign"
            ? campaignStatusStyles[status as CampaignStatus]
            : submissionStatusStyles[status as SubmissionStatus];

    const label = status.replace("_", " ");

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${styles}`}
        >
      {label}
    </span>
    );
}