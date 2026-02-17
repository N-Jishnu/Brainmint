import React from "react";


export default function Summary() {
const stats = [
{ id: 1, title: "Open tasks", value: 24 },
{ id: 2, title: "Overdue", value: 3 },
{ id: 3, title: "Sprints active", value: 2 },
];


return (
<div className="p-6 w-full">
<h1 className="text-2xl font-semibold mb-4">Summary</h1>


<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
{stats.map(s => (
<div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm border">
<div className="text-sm text-gray-500">{s.title}</div>
<div className="text-2xl font-bold">{s.value}</div>
</div>
))}
</div>


<div className="bg-white rounded-2xl border shadow-sm p-4">
<div className="text-gray-700 font-semibold mb-3">Recent activity</div>
<ul className="space-y-3 text-sm text-gray-600">
<li>SK moved "Onboard client" to In Progress — Oct 30</li>
<li>RP commented on "Mobile QA run" — Oct 28</li>
<li>MP closed "Release notes v1.2" — Oct 22</li>
</ul>
</div>
</div>
);
}