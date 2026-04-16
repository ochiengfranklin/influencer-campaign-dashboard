import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { mockCampaigns } from "../data/mockCampaigns";
import type {CampaignStatus} from "../types/campaign";
import {
    Clock,
    FileCheck,
    DollarSign,
    ArrowRight,
    Filter,
    Calendar,
} from "lucide-react";

const filterTabs: { label: string; value: CampaignStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Draft", value: "draft" },
];

export function CampaignList() {
    const [activeFilter, setActiveFilter] = useState<CampaignStatus | "all">(
        "all"
    );

    const filteredCampaigns =
        activeFilter === "all"
            ? mockCampaigns
            : mockCampaigns.filter((c) => c.status === activeFilter);

    function daysUntilDeadline(deadline: string) {
        const diff = new Date(deadline).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days;
    }

    return (
        <div>
            <Header
                title="Campaigns"
                subtitle={`${mockCampaigns.length} total campaigns`}
            />
            <div className="p-8">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveFilter(tab.value)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                activeFilter === tab.value
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Campaign Cards */}
                <div className="mt-6 space-y-4">
                    {filteredCampaigns.map((campaign) => {
                        const daysLeft = daysUntilDeadline(campaign.deadline);
                        const isUrgent = daysLeft <= 7 && daysLeft > 0;
                        const isOverdue = daysLeft < 0;

                        return (
                            <Link
                                key={campaign.id}
                                to={`/campaigns/${campaign.id}`}
                                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={campaign.brandLogo}
                                            alt={campaign.brand}
                                            className="h-12 w-12 rounded-xl"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                                                {campaign.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{campaign.brand}</p>
                                            <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                                {campaign.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <StatusBadge status={campaign.status} />
                                        <ArrowRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                      {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                      {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                                    <span
                                        className={`flex items-center gap-1.5 text-sm ${
                                            isOverdue
                                                ? "font-medium text-red-600"
                                                : isUrgent
                                                    ? "font-medium text-yellow-600"
                                                    : "text-gray-500"
                                        }`}
                                    >
                    <Clock className="h-4 w-4" />
                                        {isOverdue
                                            ? "Overdue"
                                            : daysLeft === 0
                                                ? "Due today"
                                                : `${daysLeft} days left`}
                  </span>
                                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <FileCheck className="h-4 w-4" />
                                        {campaign.submissions.length} submissions
                  </span>
                                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <DollarSign className="h-4 w-4" />
                                        {campaign.budget}
                  </span>
                                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {campaign.platform}
                  </span>
                                </div>
                            </Link>
                        );
                    })}

                    {filteredCampaigns.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
                            <Filter className="h-12 w-12 text-gray-300" />
                            <h3 className="mt-4 text-lg font-medium text-gray-600">
                                No campaigns found
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Try a different filter to see more campaigns.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}