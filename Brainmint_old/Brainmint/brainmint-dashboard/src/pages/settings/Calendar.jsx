import React, { useState } from "react";

export default function CalendarUI() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const sampleDays = [
    { date: 29, prev: true },
    { date: 30, prev: true },
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 6 },
    { date: 7 },
    { date: 8 },
    { date: 9 },
    { date: 10 },
    { date: 13 },
    { date: 14 },
    { date: 15 },
    { date: 16 },
    { date: 17 },
  ];

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const [currentMonth, setCurrentMonth] = useState(9); // October
  const [currentYear, setCurrentYear] = useState(2025);
  const [search, setSearch] = useState("");

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="p-6 w-full font-inter">

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">

        {/* Search */}
        <input
          type="search"
          placeholder="Search calendar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* Filters */}
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>Assignee</option>
          <option>User 1</option>
          <option>User 2</option>
        </select>

        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>Type</option>
          <option>Task</option>
          <option>Bug</option>
          <option>Feature</option>
        </select>

        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>More filters</option>
          <option>Priority</option>
          <option>Tags</option>
        </select>

        {/* Today Button */}
        <button
          className="px-4 py-2 border border-gray-300 rounded-md bg-white font-medium"
          onClick={() => {
            setCurrentYear(new Date().getFullYear());
            setCurrentMonth(new Date().getMonth());
          }}
        >
          Today
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className="p-2 text-xl rounded-full hover:bg-gray-200"
          onClick={prevMonth}
        >
          &lt;
        </button>

        <h2 className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          className="p-2 text-xl rounded-full hover:bg-gray-200"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-300 overflow-hidden rounded-xl">

        {/* Week Header */}
        <div className="grid grid-cols-5 bg-gray-100 border-b border-gray-300">
          {weekdays.map((day) => (
            <div
              key={day}
              className="py-3 text-center font-semibold text-gray-600 border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-5">
          {sampleDays.map((d, i) => (
            <div
              key={i}
              className={`h-28 p-2 border-r border-b last:border-r-0 text-sm 
                ${d.prev ? "text-gray-400" : "text-gray-900"}
              `}
            >
              <div className="font-medium">{d.date}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
