import React, { useState } from "react";

export default function AddPatient({ onAdd, disabled }) {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(5);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await onAdd({ name: name.trim(), severity: Number(severity) });
    setName("");
    setSeverity(5);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          placeholder="Patient name"
          className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
          disabled={disabled}
        >
          {Array.from({ length: 10 }, (_, i) => 10 - i).map((s) => (
            <option key={s} value={s}>
              {s} — {s >= 9 ? "Critical" : s >= 7 ? "High" : s >= 4 ? "Medium" : "Low"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          disabled={disabled}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => { setName(""); setSeverity(5); }}
          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
