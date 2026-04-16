import { NavLink } from "react-router-dom";
import { LayoutDashboard, Megaphone, BarChart3 } from "lucide-react";

const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/campaigns", icon: Megaphone, label: "Campaigns" },
    { to: "/performance", icon: BarChart3, label: "Performance" },
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
            <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
                <Megaphone className="h-7 w-7 text-indigo-600" />
                <span className="text-lg font-bold text-gray-900">InfluencerHub</span>
            </div>
            <nav className="mt-6 space-y-1 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <div className="absolute bottom-6 left-0 right-0 px-4">
                <div className="rounded-lg bg-indigo-50 p-4">
                    <p className="text-xs font-medium text-indigo-900">Pro Tip</p>
                    <p className="mt-1 text-xs text-indigo-700">
                        Submit your content early to get feedback before the deadline!
                    </p>
                </div>
            </div>
        </aside>
    );
}