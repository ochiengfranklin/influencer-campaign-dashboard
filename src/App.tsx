import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { CampaignList } from "./pages/CampaignList";
import { CampaignDetails } from "./pages/CampaignDetails";
import { Performance } from "./pages/Performance";

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />

                <main className="ml-64 flex-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/campaigns" element={<CampaignList />} />
                        <Route path="/campaigns/:id" element={<CampaignDetails />} />
                        <Route path="/performance" element={<Performance />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;