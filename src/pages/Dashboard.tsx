import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { mockCampaigns } from "../data/mockCampaigns";
import {
    Megaphone,
    TrendingUp,
    FileCheck,
    Clock,
    ArrowRight,
    Heart,
    Share2,
    MessageCircle,
    Eye,
} from "lucide-react";

export function Dashboard() {
    const activeCampaigns = mockCampaigns.filter((c) => c.status === "active");
    const totalSubmissions = mockCampaigns.reduce(
        (sum, c) => sum + c.submissions.length,
        0
    );
    const pendingSubmissions = mockCampaigns.reduce(
        (sum, c) => sum + c.submissions.filter((s) => s.status === "pending").length,
        0
    );
    const totalLikes = mockCampaigns.reduce(
        (sum, c) => sum + c.performance.estimatedEngagement.likes,
        0
    );

    const stats = [
        {
            label: "Active Campaigns",
            value: activeCampaigns.length,
            icon: Megaphone,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "Total Submissions",
            value: totalSubmissions,
            icon: FileCheck,
            color: "bg-green-50 text-green-600",
        },
        {
            label: "Pending Review",
            value: pendingSubmissions,
            icon: Clock,
            color: "bg-yellow-50 text-yellow-600",
        },
        {
            label: "Total Likes",
            value: totalLikes.toLocaleString(),
            icon: TrendingUp,
            color: "bg-pink-50 text-pink-600",
        },
    ];

    const recentCampaigns = mockCampaigns.slice(0, 4);

    return (
        <div>
            <Header
                title="Dashboard"
                subtitle="Welcome back, Jane! Here's your campaign overview."
            />
            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.label}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`rounded-lg p-3 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Campaigns */}
                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Campaigns
                        </h2>
                        <Link
                            to="/campaigns"
                            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {recentCampaigns.map((campaign) => (
                            <Link
                                key={campaign.id}
                                to={`/campaigns/${campaign.id}`}
                                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={campaign.brandLogo}
                                            alt={campaign.brand}
                                            className="h-10 w-10 rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">
                                                {campaign.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{campaign.brand}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={campaign.status} />
                                </div>
                                <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Due {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                                    <span className="flex items-center gap-1">
                    <FileCheck className="h-3.5 w-3.5" />
                                        {campaign.submissions.length} submissions
                  </span>
                                </div>
                                {campaign.performance.estimatedEngagement.likes > 0 && (
                                    <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                        {campaign.performance.estimatedEngagement.likes.toLocaleString()}
                    </span>
                                        <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                                            {campaign.performance.estimatedEngagement.shares.toLocaleString()}
                    </span>
                                        <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                                            {campaign.performance.estimatedEngagement.comments.toLocaleString()}
                    </span>
                                        <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                                            {campaign.performance.estimatedEngagement.impressions.toLocaleString()}
                    </span>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}