import React from "react";


export default function Pages() {
const pages = [
{ id: 1, title: "Project Overview", updated: "Sep 12" },
{ id: 2, title: "Team Guide", updated: "Oct 02" },
{ id: 3, title: "Release Notes", updated: "Aug 29" },
];


return (
<div className="p-6 w-full">
<h1 className="text-2xl font-semibold mb-4">Pages</h1>


<div className="flex justify-between items-center mb-6">
<input className="border rounded-md px-3 py-2" placeholder="Search pages" />
<button className="px-4 py-2 bg-green-600 text-white rounded-lg">+ New Page</button>
</div>


<div className="space-y-4">
{pages.map(p => (
<div key={p.id} className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center">
<div>
<div className="font-medium text-gray-800">{p.title}</div>
<div className="text-xs text-gray-500">Updated {p.updated}</div>
</div>
<div className="flex gap-3">
<button className="px-3 py-1 border rounded-md">Open</button>
<button className="px-3 py-1 border rounded-md">Edit</button>
</div>
</div>
))}
</div>
</div>
);
}