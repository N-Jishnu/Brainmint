import React from "react";


export default function Shortcuts() {
const shortcuts = [
{ id: 1, name: "New Task", keys: "N" },
{ id: 2, name: "Open Search", keys: "/" },
{ id: 3, name: "Quick Create", keys: "Q" },
];


return (
<div className="p-6 w-full">
<h1 className="text-2xl font-semibold mb-4">Keyboard Shortcuts</h1>


<div className="bg-white rounded-2xl border shadow-sm p-4">
<div className="grid grid-cols-12 gap-4">
<div className="col-span-8">
<div className="text-sm text-gray-500 mb-3">Quick actions — use these to speed up your workflow</div>
<ul className="space-y-2">
{shortcuts.map(s => (
<li key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="font-medium">{s.name}</div>
<div className="text-sm text-gray-600 font-semibold bg-white border px-2 py-1 rounded">{s.keys}</div>
</li>
))}
</ul>
</div>


<div className="col-span-4">
<div className="text-sm text-gray-500 mb-2">Helpful tips</div>
<div className="text-xs text-gray-600">
Use <span className="font-semibold">/</span> to open search, press <span className="font-semibold">N</span> to create a new item quickly.
</div>
</div>
</div>
</div>
</div>
);
}