import React, { useEffect, useState } from "react";
import AddPatient from "./components/AddPatient";
import QueueDisplay from "./components/QueueDisplay";

const API = "http://localhost:4000";

export default function App() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchQueue() {
    try {
      const r = await fetch(`${API}/queue`);
      const js = await r.json();
      setQueue(js.queue || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchQueue();
    // optional: poll every 5s to keep UI fresh
    const id = setInterval(fetchQueue, 5000);
    return () => clearInterval(id);
  }, []);

  async function addPatient(p) {
    setLoading(true);
    await fetch(`${API}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    await fetchQueue();
    setLoading(false);
  }

  async function treatNext() {
    setLoading(true);
    const r = await fetch(`${API}/treat`, { method: "POST" });
    const js = await r.json();
    // small visual feedback: console or toast later
    await fetchQueue();
    setLoading(false);
    return js.patient;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-linear-to-r from-indigo-600 via-fuchsia-600 to-rose-500 text-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">Real-Time Patient Queue Monitor</h1>
          <p className="mt-2 text-indigo-100/90 max-w-2xl">
            Severity-first hospital queue powered by intelligent prioritization.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form / Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
              <AddPatient onAdd={addPatient} disabled={loading} />
              <div className="mt-6 text-sm text-gray-500">
                Tip: Add severity 9–10 for critical patients. Same severity? earlier arrival is served first.
              </div>

              <button
                onClick={async () => {
                  // treat next from UI
                  if (loading) return;
                  const p = await treatNext();
                  if (p) {
                    // simple browser alert — replace with toast for nicer UX
                    alert(`Treated: ${p.name} (Severity ${p.severity})`);
                  } else {
                    alert("No patients waiting");
                  }
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Treat Next
              </button>
            </div>

            {/* quick stats card */}
            <div className="mt-6 bg-linear-to-r from-white/60 to-white/40 border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600">Current queue length</div>
              <div className="text-2xl font-bold">{queue.length}</div>
            </div>
          </div>

          {/* Right: Queue */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Queue (High → Low)</h3>
                <div className="text-sm text-gray-500">Live — updates every 5s</div>
              </div>

              <QueueDisplay queue={queue} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
