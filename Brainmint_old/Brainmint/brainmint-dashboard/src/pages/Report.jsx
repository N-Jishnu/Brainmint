import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  LayoutDashboard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  ChevronDown
} from "lucide-react";

// --- Mock Data: Historical Sprints ---
const historicalData = [
  { name: "Sprint 10", committed: 45, completed: 40, bugs: 2, techDebt: 5 },
  { name: "Sprint 11", committed: 50, completed: 48, bugs: 1, techDebt: 8 },
  { name: "Sprint 12", committed: 55, completed: 35, bugs: 8, techDebt: 2 }, // Bad sprint
  { name: "Sprint 13", committed: 40, completed: 42, bugs: 0, techDebt: 10 },
  { name: "Sprint 14", committed: 50, completed: 50, bugs: 2, techDebt: 5 },
  { name: "Sprint 15", committed: 55, completed: 45, bugs: 3, techDebt: 5 }, // Current
];

// --- Mock Data: Current Sprint Burn-down ---
const burnDownData = [
  { day: "Mon", ideal: 55, remaining: 55 },
  { day: "Tue", ideal: 45, remaining: 52 },
  { day: "Wed", ideal: 36, remaining: 40 },
  { day: "Thu", ideal: 27, remaining: 35 },
  { day: "Fri", ideal: 18, remaining: 15 },
  { day: "Sat", ideal: 9, remaining: 8 },
  { day: "Sun", ideal: 0, remaining: 5 },
];

// --- Mock Data: Task Distribution ---
const taskTypeData = [
  { name: "Features", value: 65, color: "#7c3aed" }, // Violet 600
  { name: "Bugs", value: 15, color: "#ef4444" },     // Red 500
  { name: "Tech Debt", value: 10, color: "#f59e0b" }, // Amber 500
  { name: "Research", value: 10, color: "#10b981" }, // Emerald 500
];

// Reusable Stat Card Component
const StatCard = ({ title, value, subValue, trend, icon, trendUp }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-purple-50 rounded-lg">
        {icon}
      </div>
      {trend && (
        <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{subValue}</div>
    </div>
  </div>
);

export default function SprintReportDashboard() {
  const [timeRange] = useState("Last 6 Sprints");

  // Calculate Aggregates
  const stats = useMemo(() => {
    const totalCompleted = historicalData.reduce((acc, curr) => acc + curr.completed, 0);
    const totalCommitted = historicalData.reduce((acc, curr) => acc + curr.committed, 0);
    const avgVelocity = Math.round(totalCompleted / historicalData.length);
    const completionRate = Math.round((totalCompleted / totalCommitted) * 100);
    
    return { avgVelocity, completionRate, totalCompleted };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
        
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sprint Retrospective Report</h1>
            <p className="text-sm text-gray-500 mt-1">Detailed analysis of Sprint 10 through Sprint 15</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              {timeRange}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 shadow-sm transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Content Body - Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1600px] mx-auto w-full">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Average Velocity" 
            value={`${stats.avgVelocity} pts`} 
            subValue="Per Sprint" 
            trend="12% vs last Q" 
            trendUp={true} 
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />} 
          />
          <StatCard 
            title="Completion Rate" 
            value={`${stats.completionRate}%`} 
            subValue="Commitment vs Reality" 
            trend="3% vs last Q" 
            trendUp={false} 
            icon={<CheckCircle2 className="w-6 h-6 text-purple-600" />} 
          />
          <StatCard 
            title="Total Issues" 
            value="142" 
            subValue="Closed across 6 sprints" 
            trend="High Volume" 
            trendUp={true} 
            icon={<LayoutDashboard className="w-6 h-6 text-purple-600" />} 
          />
          <StatCard 
            title="Bug Ratio" 
            value="12%" 
            subValue="Bugs vs Features" 
            trend="2% Improvement" 
            trendUp={true} 
            icon={<AlertCircle className="w-6 h-6 text-purple-600" />} 
          />
        </div>

        {/* Charts Row 1: Velocity & Burn-down */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Velocity Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Velocity Tracking</h3>
                <p className="text-sm text-gray-500">Planned Story Points vs Completed Points</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 bg-purple-200 rounded-sm"></div>
                  Committed
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 bg-purple-700 rounded-sm"></div>
                  Completed
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} barGap={4} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  {/* Matches the Light Purple / Dark Purple from image */}
                  <Bar dataKey="committed" fill="#d8b4fe" radius={[4, 4, 0, 0]} barSize={24} name="Committed" />
                  <Bar dataKey="completed" fill="#7e22ce" radius={[4, 4, 0, 0]} barSize={24} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Sprint Burn-down */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Sprint 15 Burn-down</h3>
              <p className="text-sm text-gray-500">Remaining effort by day</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={burnDownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                  {/* Dashed Gray line for Ideal */}
                  <Area type="monotone" dataKey="ideal" stroke="#9ca3af" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Ideal Guideline" />
                  {/* Red line for Actual - matches image */}
                  <Area type="monotone" dataKey="remaining" stroke="#ef4444" fillOpacity={1} fill="url(#colorRemaining)" strokeWidth={3} name="Actual Remaining" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 2: Distribution & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Work Composition */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Work Distribution</h3>
             <div className="h-64 relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text Overlay */}
               <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900">100%</span>
                  <span className="text-xs text-gray-500 uppercase">Effort</span>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4 mt-4">
                {taskTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-sm text-gray-600">{item.name}</span>
                     </div>
                     <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Detailed Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Sprint History Details</h3>
              <button className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors">View All History</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Sprint Name</th>
                    <th className="px-6 py-4 text-center">Velocity</th>
                    <th className="px-6 py-4 text-center">Stability</th>
                    <th className="px-6 py-4 text-center">Tech Debt</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historicalData.map((sprint, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{sprint.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {sprint.completed}/{sprint.committed} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${sprint.bugs > 2 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                           {sprint.bugs} Bugs
                         </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">{sprint.techDebt}%</td>
                      <td className="px-6 py-4 text-right">
                        {idx === historicalData.length - 1 ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            <Clock className="w-3 h-3" /> In Progress
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
