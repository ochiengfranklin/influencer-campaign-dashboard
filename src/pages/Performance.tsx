import { Header } from "../components/Header";
import { mockCampaigns } from "../data/mockCampaigns";
import {
    Heart,
    Share2,
    MessageCircle,
    Eye,
    TrendingUp,
    FileCheck,
    Calendar,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6"];

export function Performance() {
    const campaignsWithData = mockCampaigns.filter(
        (c) => c.performance.totalPostsSubmitted > 0
    );

    const totalPosts = campaignsWithData.reduce(
        (sum, c) => sum + c.performance.totalPostsSubmitted,
        0
    );
    const totalLikes = campaignsWithData.reduce(
        (sum, c) => sum + c.performance.estimatedEngagement.likes,
        0
    );
    const totalShares = campaignsWithData.reduce(
        (sum, c) => sum + c.performance.estimatedEngagement.shares,
        0
    );
    const totalComments = campaignsWithData.reduce(
        (sum, c) => sum + c.performance.estimatedEngagement.comments,
        0
    );
    const totalImpressions = campaignsWithData.reduce(
        (sum, c) => sum + c.performance.estimatedEngagement.impressions,
        0
    );

    const allPostingDates = campaignsWithData
        .flatMap((c) => c.performance.postingDates)
        .sort();

    const engagementByCampaign = campaignsWithData.map((c) => ({
        name: c.title.length > 20 ? c.title.substring(0, 20) + "..." : c.title,
        likes: c.performance.estimatedEngagement.likes,
        shares: c.performance.estimatedEngagement.shares,
        comments: c.performance.estimatedEngagement.comments,
    }));

    const submissionsByCampaign = campaignsWithData.map((c, i) => ({
        name: c.title.length > 15 ? c.title.substring(0, 15) + "..." : c.title,
        value: c.performance.totalPostsSubmitted,
        color: COLORS[i % COLORS.length],
    }));

    // Build a timeline by aggregating weekly data across campaigns
    const weeklyTimeline: { week: string; likes: number; shares: number; comments: number }[] = [];
    const maxWeeks = Math.max(
        ...campaignsWithData.map((c) => c.performance.weeklyEngagement.length)
    );
    for (let i = 0; i < maxWeeks; i++) {
        const entry = { week: `Week ${i + 1}`, likes: 0, shares: 0, comments: 0 };
        campaignsWithData.forEach((c) => {
            if (c.performance.weeklyEngagement[i]) {
                entry.likes += c.performance.weeklyEngagement[i].likes;
                entry.shares += c.performance.weeklyEngagement[i].shares;
                entry.comments += c.performance.weeklyEngagement[i].comments;
            }
        });
        weeklyTimeline.push(entry);
    }

    const stats = [
        {
            label: "Total Posts",
            value: totalPosts,
            icon: FileCheck,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "Total Likes",
            value: totalLikes.toLocaleString(),
            icon: Heart,
            color: "bg-pink-50 text-pink-600",
        },
        {
            label: "Total Shares",
            value: totalShares.toLocaleString(),
            icon: Share2,
            color: "bg-green-50 text-green-600",
        },
        {
            label: "Total Comments",
            value: totalComments.toLocaleString(),
            icon: MessageCircle,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Total Impressions",
            value: totalImpressions.toLocaleString(),
            icon: Eye,
            color: "bg-purple-50 text-purple-600",
        },
        {
            label: "Avg Engagement Rate",
            value:
                totalImpressions > 0
                    ? (
                    ((totalLikes + totalShares + totalComments) / totalImpressions) *
                    100
                ).toFixed(1) + "%"
                    : "0%",
            icon: TrendingUp,
            color: "bg-yellow-50 text-yellow-600",
        },
    ];

    return (
        <div>
            <Header
                title="Performance Snapshot"
                subtitle="Track your campaign metrics and engagement across all campaigns."
            />
            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`rounded-lg p-2 ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        {stat.label}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Engagement Trend Line Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Weekly Engagement Trend
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Aggregated across all active campaigns
                        </p>
                        <div className="mt-4 h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyTimeline}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="likes"
                                        stroke="#ec4899"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="shares"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="comments"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Engagement by Campaign Bar Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Engagement by Campaign
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Likes, shares, and comments per campaign
                        </p>
                        <div className="mt-4 h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={engagementByCampaign}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="likes" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    <Bar
                                        dataKey="comments"
                                        fill="#6366f1"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Submissions Pie Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Submissions Distribution
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Posts submitted per campaign
                        </p>
                        <div className="mt-4 h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={submissionsByCampaign}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}`}
                                    >
                                        {submissionsByCampaign.map((_entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Posting Dates Timeline */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Posting Timeline
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            All submission dates across campaigns
                        </p>
                        <div className="mt-4 space-y-3 max-h-72 overflow-y-auto">
                            {allPostingDates.length > 0 ? (
                                allPostingDates.map((date, idx) => {
                                    const campaign = campaignsWithData.find((c) =>
                                        c.performance.postingDates.includes(date)
                                    );
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                                                <Calendar className="h-4 w-4 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {new Date(date).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {campaign?.title}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center py-8 text-center">
                                    <Calendar className="h-10 w-10 text-gray-300" />
                                    <p className="mt-2 text-sm text-gray-400">
                                        No posting dates yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Per-Campaign Performance Table */}
                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Campaign Performance Summary
                    </h3>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 font-semibold text-gray-600">Campaign</th>
                                <th className="pb-3 font-semibold text-gray-600">Posts</th>
                                <th className="pb-3 font-semibold text-gray-600">Likes</th>
                                <th className="pb-3 font-semibold text-gray-600">Shares</th>
                                <th className="pb-3 font-semibold text-gray-600">Comments</th>
                                <th className="pb-3 font-semibold text-gray-600">
                                    Impressions
                                </th>
                                <th className="pb-3 font-semibold text-gray-600">
                                    Eng. Rate
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {campaignsWithData.map((c) => {
                                const { likes, shares, comments, impressions } =
                                    c.performance.estimatedEngagement;
                                const engRate =
                                    impressions > 0
                                        ? (((likes + shares + comments) / impressions) * 100).toFixed(
                                            1
                                        )
                                        : "0";
                                return (
                                    <tr
                                        key={c.id}
                                        className="border-b border-gray-50 hover:bg-gray-50"
                                    >
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={c.brandLogo}
                                                    alt={c.brand}
                                                    className="h-6 w-6 rounded"
                                                />
                                                <span className="font-medium text-gray-900">
                            {c.title}
                          </span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-gray-700">
                                            {c.performance.totalPostsSubmitted}
                                        </td>
                                        <td className="py-3 text-gray-700">
                                            {likes.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-gray-700">
                                            {shares.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-gray-700">
                                            {comments.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-gray-700">
                                            {impressions.toLocaleString()}
                                        </td>
                                        <td className="py-3">
                        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                          {engRate}%
                        </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}