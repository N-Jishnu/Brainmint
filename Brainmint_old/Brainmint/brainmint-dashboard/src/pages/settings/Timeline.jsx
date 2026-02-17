import { ChevronDown } from "lucide-react";

export default function Timeline() {
  return (
    <div className="p-6 w-full">

      {/* ✅ Header */}
      <h1 className="text-2xl font-semibold mb-6">Timeline</h1>

      {/* ✅ Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border flex flex-col md:flex-row md:items-center gap-4 mb-6">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Status:</span>
          <button className="px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition">
            Any
          </button>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Priority:</span>
          <button className="px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition">
            Any
          </button>
        </div>

        {/* Assign */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Assign:</span>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition">
            Unassigned <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Sort:</span>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition">
            Time Created <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ✅ Date Section */}
      <div className="bg-white rounded-2xl border shadow-sm p-5">

        {/* Date Row */}
        <div className="flex items-center gap-10 mb-5">
          <span className="text-gray-500 font-medium">Today</span>
          <span className="text-gray-900 font-semibold">Fri 25</span>
          <span className="text-gray-500 font-medium">Thu 24</span>
          <span className="text-gray-500 font-medium">Wed 23</span>
        </div>

        {/* ✅ Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-500 font-medium">
                <th className="pb-2">Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Assigned To</th>
                <th className="pb-2">Time Created</th>
                <th className="pb-2">Due Date</th>
              </tr>
            </thead>

            <tbody>

              {/* ✅ Row 1 */}
              <tr className="bg-white border rounded-xl shadow-sm">
                <td className="p-3 font-medium text-gray-700">Write the Logic</td>
                <td className="p-3">🟢 <span className="font-medium">Completed</span></td>
                <td className="p-3">Editor</td>
                <td className="p-3">25 Sep 2024</td>
                <td className="p-3">---</td>
              </tr>

              {/* ✅ Row 2 */}
              <tr className="bg-white border rounded-xl shadow-sm">
                <td className="p-3 font-medium text-gray-700">Add Design</td>
                <td className="p-3">🔵 <span className="font-medium">In Progress</span></td>
                <td className="p-3">Madhumita</td>
                <td className="p-3">24 Sep 2024</td>
                <td className="p-3">30 Sep 2024</td>
              </tr>

              {/* ✅ Row 3 */}
              <tr className="bg-white border rounded-xl shadow-sm">
                <td className="p-3 font-medium text-gray-700">Fix Bugs</td>
                <td className="p-3">🟡 <span className="font-medium">Pending</span></td>
                <td className="p-3">Unassigned</td>
                <td className="p-3">23 Sep 2024</td>
                <td className="p-3">---</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
