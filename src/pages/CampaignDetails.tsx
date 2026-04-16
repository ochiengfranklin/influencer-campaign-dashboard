import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { mockCampaigns } from "../data/mockCampaigns";
import type {Submission} from "../types/campaign";
import {
    ArrowLeft,
    Calendar,
    Clock,
    DollarSign,
    Upload,
    FileVideo,
    FileImage,
    File,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
} from "lucide-react";

export function CampaignDetails() {
    const { id } = useParams<{ id: string }>();
    const campaign = mockCampaigns.find((c) => c.id === id);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFiles, setUploadedFiles] = useState<
        { name: string; type: string; uploadedAt: string }[]
    >([]);

    if (!campaign) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Campaign not found
                </h2>
                <Link
                    to="/campaigns"
                    className="mt-4 text-indigo-600 hover:text-indigo-700"
                >
                    Back to campaigns
                </Link>
            </div>
        );
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        const newFiles = Array.from(files).map((f) => ({
            name: f.name,
            type: f.type,
            uploadedAt: new Date().toISOString(),
        }));
        setUploadedFiles((prev) => [...prev, ...newFiles]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function getFileIcon(fileType: string) {
        if (fileType.startsWith("video/"))
            return <FileVideo className="h-5 w-5 text-purple-500" />;
        if (fileType.startsWith("image/"))
            return <FileImage className="h-5 w-5 text-blue-500" />;
        return <File className="h-5 w-5 text-gray-500" />;
    }

    function getSubmissionStatusIcon(status: Submission["status"]) {
        switch (status) {
            case "approved":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "rejected":
                return <XCircle className="h-4 w-4 text-red-500" />;
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            default:
                return null;
        }
    }

    function daysUntilDeadline(deadline: string) {
        const diff = new Date(deadline).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const daysLeft = daysUntilDeadline(campaign.deadline);

    return (
        <div>
            <Header title={campaign.title} subtitle={campaign.brand} />
            <div className="p-8">
                {/* Back Link */}
                <Link
                    to="/campaigns"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to campaigns
                </Link>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Campaign Overview Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={campaign.brandLogo}
                                        alt={campaign.brand}
                                        className="h-14 w-14 rounded-xl"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {campaign.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">{campaign.brand}</p>
                                    </div>
                                </div>
                                <StatusBadge status={campaign.status} />
                            </div>
                            <p className="mt-4 text-gray-600">{campaign.description}</p>
                            <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                                    {new Date(campaign.deadline).toLocaleDateString()}
                                </div>
                                <div
                                    className={`flex items-center gap-1.5 text-sm ${
                                        daysLeft < 0
                                            ? "font-medium text-red-600"
                                            : daysLeft <= 7
                                                ? "font-medium text-yellow-600"
                                                : "text-gray-500"
                                    }`}
                                >
                                    <Clock className="h-4 w-4" />
                                    {daysLeft < 0
                                        ? "Overdue"
                                        : daysLeft === 0
                                            ? "Due today"
                                            : `${daysLeft} days left`}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <DollarSign className="h-4 w-4" />
                                    {campaign.budget}
                                </div>
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {campaign.platform}
                </span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Campaign Instructions
                            </h3>
                            <ol className="mt-4 space-y-3">
                                {campaign.instructions.map((instruction, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {idx + 1}
                    </span>
                                        <p className="text-sm text-gray-700">{instruction}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Submission Upload */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Upload Submission
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Upload your content files for brand review.
                            </p>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-10 transition-colors hover:border-indigo-400 hover:bg-indigo-50"
                            >
                                <Upload className="h-10 w-10 text-gray-400" />
                                <p className="mt-3 text-sm font-medium text-gray-600">
                                    Click to upload or drag and drop
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    MP4, MOV, JPG, PNG up to 100MB
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="video/*,image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </div>
                            {uploadedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium text-gray-700">
                                        Newly uploaded:
                                    </p>
                                    {uploadedFiles.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-2.5 text-sm"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <span className="font-medium text-gray-700">
                        {file.name}
                      </span>
                                            <span className="ml-auto text-xs text-gray-400">
                        Just uploaded
                      </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Submissions List */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Submissions
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {campaign.submissions.length} total submissions
                            </p>
                            {campaign.submissions.length > 0 ? (
                                <div className="mt-4 space-y-3">
                                    {campaign.submissions.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(sub.fileType)}
                                                <span className="flex-1 truncate text-sm font-medium text-gray-700">
                          {sub.fileName}
                        </span>
                                                {getSubmissionStatusIcon(sub.status)}
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                                                <StatusBadge status={sub.status} type="submission" />
                                            </div>
                                            {sub.feedback && (
                                                <p className="mt-2 rounded bg-white px-2 py-1.5 text-xs text-gray-600">
                                                    <span className="font-medium">Feedback:</span>{" "}
                                                    {sub.feedback}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 flex flex-col items-center rounded-lg border border-dashed border-gray-200 py-8 text-center">
                                    <Upload className="h-8 w-8 text-gray-300" />
                                    <p className="mt-2 text-sm text-gray-400">
                                        No submissions yet
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Quick Performance */}
                        <Link
                            to="/performance"
                            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Performance
                                </h3>
                                <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {campaign.performance.totalPostsSubmitted}
                                    </p>
                                    <p className="text-xs text-gray-500">Posts submitted</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {campaign.performance.estimatedEngagement.likes.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Est. likes</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {campaign.performance.estimatedEngagement.shares.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Est. shares</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {campaign.performance.estimatedEngagement.impressions.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Impressions</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}