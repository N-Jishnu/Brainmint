// FILE: src/pages/settings/AllWork.jsx


export default function AllWork() {
const workItems = [
{ id: 1, title: "Onboard new client - Phase 1", project: "Project A", owner: "SK", status: "In Progress", due: "Oct 30" },
{ id: 2, title: "Mobile QA run", project: "Project B", owner: "RP", status: "To Do", due: "Nov 05" },
{ id: 3, title: "Release notes v1.2", project: "Project A", owner: "MP", status: "Done", due: "Sep 12" },
];


return (
<div className="p-6 w-full">
<h1 className="text-2xl font-semibold mb-4">All Work</h1>


<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
<div className="col-span-1 bg-white p-4 rounded-2xl shadow-sm border">
<div className="text-sm text-gray-500">Total items</div>
<div className="text-2xl font-bold">{workItems.length}</div>
</div>


<div className="col-span-1 bg-white p-4 rounded-2xl shadow-sm border">
<div className="text-sm text-gray-500">In Progress</div>
<div className="text-2xl font-bold">1</div>
</div>


<div className="col-span-1 bg-white p-4 rounded-2xl shadow-sm border">
<div className="text-sm text-gray-500">Completed</div>
<div className="text-2xl font-bold">1</div>
</div>
</div>


<div className="bg-white rounded-2xl border shadow-sm p-4">
<div className="flex justify-between items-center mb-4">
<div className="flex items-center gap-4">
<input className="border rounded-md px-3 py-2" placeholder="Search work items" />
<select className="border rounded-md px-3 py-2">
<option>All projects</option>
<option>Project A</option>
<option>Project B</option>
</select>
</div>
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ New Work</button>
</div>


<div className="divide-y">
{workItems.map(item => (
<div key={item.id} className="py-3 flex justify-between items-center">
<div>
<div className="font-medium text-gray-800">{item.title}</div>
<div className="text-xs text-gray-500">{item.project} • Owned by {item.owner}</div>
</div>


<div className="flex items-center gap-4">
<div className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Done' ? 'bg-green-100 text-green-700' : item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
{item.status}
</div>
<div className="text-sm text-gray-500">Due {item.due}</div>
</div>
</div>
))}
</div>
</div>
</div>
);
}