import { Bell, Search, User } from "lucide-react";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="h-9 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
                <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100">
                        <User className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Jane Doe</span>
                </div>
            </div>
        </header>
    );
}