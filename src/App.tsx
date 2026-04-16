import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { CampaignList } from "./pages/CampaignList";
import { CampaignDetails } from "./pages/CampaignDetails";
import { Performance } from "./pages/Performance";

function App() {
    const [count, setCount] = useState(0)

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

                    {/* Optional: keep Vite demo stuff */}
                    <div className="p-4">
                        <div>

                            <a href="https://react.dev" target="_blank">
                                <img src={reactLogo} className="logo react" alt="React logo" />
                            </a>
                        </div>

                        <h1>Vite + React</h1>

                        <div className="card">
                            <button onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                            <p>
                                Edit <code>src/App.tsx</code> and save to test HMR
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;