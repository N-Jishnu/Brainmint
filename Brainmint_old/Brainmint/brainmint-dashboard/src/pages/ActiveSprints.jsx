import React, { useState, useMemo } from "react";
import { 
  ArrowRight, ArrowLeft, Check, List, Calendar, 
  RefreshCw, LayoutDashboard, Clock, BarChart3 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState("setup");
  const [projectTitle, setProjectTitle] = useState("");
  const [sprints, setSprints] = useState([]);

  const handleSetupComplete = (title, sprintList) => {
    setProjectTitle(title);
    setSprints(sprintList);
    setPage("sprintList");
  };
  
  const handleReset = () => {
    setProjectTitle("");
    setSprints([]);
    setPage("setup");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-100 selection:text-violet-900">
      {page === "setup" && (
        <SetupWizard onSetupComplete={handleSetupComplete} />
      )}
      {page === "sprintList" && (
        <SprintList 
          projectTitle={projectTitle} 
          sprints={sprints} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

// --- 1. Setup Wizard Component ---
function SetupWizard({ onSetupComplete }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [sprintCount, setSprintCount] = useState(1);
  
  const [sprintDetails, setSprintDetails] = useState([
    { title: "", startDate: "", endDate: "" }
  ]);

  const handleCountChange = (e) => {
    let count = parseInt(e.target.value, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 20) count = 20;
    
    setSprintCount(count);

    const newDetails = [...sprintDetails];
    while (newDetails.length < count) {
      newDetails.push({ title: "", startDate: "", endDate: "" });
    }
    while (newDetails.length > count) {
      newDetails.pop();
    }
    setSprintDetails(newDetails);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...sprintDetails];
    newDetails[index][field] = value;
    setSprintDetails(newDetails);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinish = () => {
    const finalSprints = sprintDetails.map((sprint, index) => ({
      id: `sprint-${index + 1}`,
      title: sprint.title || `Sprint ${index + 1}`,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
    }));
    onSetupComplete(title || "My Project", finalSprints);
  };
  
  const getStepTitle = () => {
    switch(step) {
      case 1: return "Project Initialization";
      case 2: return "Sprint Configuration";
      case 3: return "Timeline Planning";
      default: return "Setup Your Project";
    }
  };

  const getStepDescription = () => {
    switch(step) {
      case 1: return "Let's start by giving your project a name.";
      case 2: return "Define the scope by setting the number of sprints.";
      case 3: return "Outline the schedule for each sprint.";
      default: return "";
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-violet-100/50 to-slate-50 z-0"></div>
      
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 z-10 overflow-hidden">
        {/* Progress Header */}
        <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100">
           <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">Step {step} of 3</span>
              <span className="text-xs text-slate-400 font-medium">{Math.round((step / 3) * 100)}% Completed</span>
           </div>
           <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div 
              className="bg-violet-600 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(124,58,237,0.3)]" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{getStepTitle()}</h2>
            <p className="text-slate-500">{getStepDescription()}</p>
          </div>
          
          {/* Step 1: Project Title */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Phoenix Redesign 2024"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400"
                  autoFocus
                />
              </div>
              <button
                onClick={nextStep}
                disabled={!title}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transform hover:-translate-y-0.5"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Sprint Count */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Sprints
                </label>
                <input
                  type="number"
                  value={sprintCount}
                  onChange={handleCountChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
                <p className="text-xs text-slate-400 mt-2 text-right">Max limit: 20 sprints</p>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={prevStep}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Sprint Titles & Dates */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-h-[350px] overflow-y-auto pr-2 -mr-2 space-y-3 custom-scrollbar">
                {sprintDetails.map((sprint, index) => (
                  <div key={index} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-violet-200 transition-colors group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs font-bold group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={sprint.title}
                        onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                        placeholder={`Sprint ${index + 1} Name`}
                        className="flex-1 bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 placeholder:text-slate-400 text-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="date"
                          value={sprint.startDate}
                          onChange={(e) => handleDetailChange(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          value={sprint.endDate}
                          onChange={(e) => handleDetailChange(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={prevStep}
                  className="w-1/3 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleFinish}
                  className="w-2/3 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5"
                >
                  Generate Dashboard <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// --- 2. Sprint List Page Component ---
function SprintList({ projectTitle, sprints, onReset }) {
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // --- Stats Calculation ---
  const sprintStats = useMemo(() => {
    let earliestStartDate = null;
    let latestEndDate = null;
    let totalSprintDays = 0;

    const chartData = sprints.map(sprint => {
      let duration = 0;
      if (sprint.startDate && sprint.endDate) {
        const start = new Date(new Date(sprint.startDate).getTime() + new Date(sprint.startDate).getTimezoneOffset() * 60000);
        const end = new Date(new Date(sprint.endDate).getTime() + new Date(sprint.endDate).getTimezoneOffset() * 60000);

        if (end >= start) {
          const diffTime = Math.abs(end - start);
          duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          totalSprintDays += duration;
        }

        if (!earliestStartDate || start < earliestStartDate) earliestStartDate = start;
        if (!latestEndDate || end > latestEndDate) latestEndDate = end;
      }
      return { name: sprint.title, Duration: duration };
    });

    let totalProjectDuration = 0;
    if (earliestStartDate && latestEndDate && latestEndDate >= earliestStartDate) {
       const diffTime = Math.abs(latestEndDate - earliestStartDate);
       totalProjectDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    
    const avgDuration = sprints.length > 0 && totalSprintDays > 0 
      ? (totalSprintDays / sprints.length).toFixed(1) 
      : 0;

    return { chartData, totalProjectDuration, avgDuration };
  }, [sprints]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-xl">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-violet-200">{`${payload[0].value} Days`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 flex flex-col animate-fadeIn overflow-y-auto bg-slate-50/50">
      {/* Navbar */}
      <header className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">{projectTitle}</h1>
            <p className="text-xs text-slate-500 font-medium">Project Overview</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 text-sm font-medium transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          Reset Project
        </button>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8">
        
        {/* Statistics Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-4 content-start">
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 relative overflow-hidden group hover:border-violet-200 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Clock className="w-16 h-16 text-violet-600" />
               </div>
               <div className="flex flex-col h-full justify-between relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Total Timeline</span>
                 </div>
                 <div>
                   <span className="text-3xl font-bold text-slate-800">{sprintStats.totalProjectDuration}</span>
                   <span className="text-sm text-slate-500 ml-1">days</span>
                 </div>
               </div>
             </div>

             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 relative overflow-hidden group hover:border-emerald-200 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BarChart3 className="w-16 h-16 text-emerald-600" />
               </div>
               <div className="flex flex-col h-full justify-between relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Avg. Sprint Length</span>
                 </div>
                 <div>
                   <span className="text-3xl font-bold text-slate-800">{sprintStats.avgDuration}</span>
                   <span className="text-sm text-slate-500 ml-1">days</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
            <h3 className="text-base font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
              Sprint Velocity (Duration)
            </h3>
            <div className="flex-1 w-full min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sprintStats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#94a3b8' }}
                    dy={10}
                  />
                  <YAxis 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="Duration" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorDuration)" 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3, fill: '#8b5cf6' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Sprints Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Sprints & Milestones</h2>
            <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              {sprints.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200/80 hover:border-violet-300 transition-all duration-300 flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-slate-50 text-slate-500 rounded-lg group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                      <List size={18} />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-violet-700 transition-colors truncate">
                    {sprint.title}
                  </h3>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(sprint.startDate)}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                    <span>{formatDate(sprint.endDate)}</span>
                  </div>
                </div>
                
                <div className="p-4 pt-0">
                  <button className="w-full py-2.5 text-sm font-semibold text-slate-600 bg-transparent border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}