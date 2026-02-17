import React from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Summary from "./Summary";
import Timeline from "./Timeline";
import Board from "./Board";
import Calendar from "./Calendar";
import List from "./List";
import Forms from "./Forms";
import AllWork from "./AllWork";
import Code from "./Code";
import Archived from "./Archived";
import Pages from "./Pages";
import Shortcuts from "./Shortcuts";

export default function Settings() {
  const tabs = [
    "summary", "timeline", "board", "calendar", "list",
    "forms", "allwork", "code", "archived", "pages", "shortcuts"
  ];

  const location = useLocation();

  return (
    <div className="w-full px-6 py-4 font-sans">
      
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Link
            key={tab}
            to={`/settings/${tab}`}
            className={`capitalize pb-2 ${
              location.pathname.includes(tab)
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      {/* Render tab content */}
      <Routes>
        {/* Default redirect to Summary */}
        <Route index element={<Navigate to="summary" replace />} />

        <Route path="summary" element={<Summary />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="board" element={<Board />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="list" element={<List />} />
        <Route path="forms" element={<Forms />} />
        <Route path="allwork" element={<AllWork />} />
        <Route path="code" element={<Code />} />
        <Route path="archived" element={<Archived />} />
        <Route path="pages" element={<Pages />} />
        <Route path="shortcuts" element={<Shortcuts />} />
      </Routes>
    </div>
  );
}
