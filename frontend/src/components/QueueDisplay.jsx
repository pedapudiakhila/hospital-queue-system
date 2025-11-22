import React from "react";

function severityColor(sev) {
  if (sev >= 9) return "bg-red-500 text-white";
  if (sev >= 7) return "bg-orange-400 text-white";
  if (sev >= 4) return "bg-yellow-300 text-black";
  return "bg-emerald-200 text-black";
}

export default function QueueDisplay({ queue = [] }) {
  return (
    <div className="space-y-3">
      {queue.length === 0 && (
        <div className="p-6 rounded-lg bg-slate-50 text-gray-600 border border-dashed border-gray-200 text-center">
          No patients waiting
        </div>
      )}

      {queue.map((p, idx) => {
        const isTop = idx === 0;
        return (
          <div
            key={p.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition transform ${
              isTop ? "ring-2 ring-rose-300 scale-102 animate-pulse" : "hover:translate-y-0.5"
            }`}
            style={{ background: isTop ? "linear-gradient(90deg, #fff7f6, #fff)" : "white" }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${severityColor(p.severity)}`}>
                {p.severity}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{p.name}</div>
                <div className="text-sm text-gray-500">Arrived: {new Date(p.arrivalTime).toLocaleTimeString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-500">Pos: {idx + 1}</div>
              <div>
                <button
                  disabled
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-600"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
