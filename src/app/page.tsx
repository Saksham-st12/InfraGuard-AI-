"use client";

import { useState } from "react";

// Lucide icon placeholders using plain SVG to avoid extra dependencies
const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      // Simulate real-world network latency/agent thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trigger: 'manual_scan', scope: 'all_regions' })
      });
      
      if (!res.ok) throw new Error("API Route Failed");
      
      const data = await res.json();
      
      // The API returns the specific recommendation. Let's add it to our state!
      const newRec = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        resourceType: data.resource_id.startsWith('i-') ? "EC2 Instance" : "Cloud Resource",
        region: "us-east-1" // Mocking metadata
      };
      
      setRecommendations(prev => [newRec, ...prev]);
      showToast('Agent scan complete. New inefficiencies found!', 'success');
      
    } catch (err) {
      console.error(err);
      showToast('Failed to run agent scan. Check console.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    const rec = recommendations.find(r => r.id === id);
    if (!rec) return;

    setRecommendations(recommendations.filter(r => r.id !== id));
    
    if (action === 'approve') {
      showToast(`Approved: ${rec.decision} for ${rec.resource_id}`, 'success');
    } else {
      showToast(`Rejected recommendation for ${rec.resource_id}`, 'error');
    }
  };

  const totalSavings = recommendations.reduce((sum, rec) => sum + (rec.estimated_monthly_savings || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 flex flex-col">
      
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-lg tracking-tight">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white">
              <ZapIcon />
            </div>
            Infraguard AI
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <button 
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-lg font-semibold shadow flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isScanning ? (
                 <span className="flex items-center gap-2 animate-pulse">Running Agent Scan...</span>
              ) : (
                 <span className="flex items-center gap-2">Run Agent Scan</span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-neutral-600 dark:text-neutral-400">
                {isScanning ? 'Analyzing...' : 'Agent Idle'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
        
        {/* Dashboard Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Cost Optimization Hub</h1>
            <p className="text-neutral-500 dark:text-neutral-400">Review and approve AI-generated infrastructure recommendations.</p>
          </div>
          
          <div className="flex items-center gap-6 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <DollarSignIcon /> Potential Savings
              </span>
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${totalSavings.toFixed(2)}<span className="text-lg text-neutral-400 font-normal">/mo</span>
              </span>
            </div>
            <div className="h-10 w-px bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <ServerIcon /> Actions Pending
              </span>
              <span className="text-3xl font-bold">{recommendations.length}</span>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Agent Recommendations</h2>
          
          {recommendations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 border-dashed">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full mb-4">
                <ZapIcon />
              </div>
              <h3 className="text-lg font-medium mb-1">Infrastructure Optimized</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mb-6">
                No active recommendations at this time. Run an Agent Scan to analyze your current cloud resources.
              </p>
              <button 
                onClick={handleRunScan}
                disabled={isScanning}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Run deep scan'}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="group flex flex-col md:flex-row bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700">
                  
                  {/* Left Side: Details */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                            {rec.decision?.replace('_', ' ')}
                          </span>
                          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            {rec.resourceType} • {rec.region}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-mono tracking-tight">{rec.resource_id}</h3>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                          ${rec.estimated_monthly_savings?.toFixed(2)}
                        </span>
                        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Savings/mo</span>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                      <div className="flex gap-3">
                        <div className="text-blue-600 mt-0.5"><ZapIcon /></div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">AI Agent Reasoning</p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{rec.reasoning}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side: Actions */}
                  <div className="flex md:flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800/20 border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-800 gap-3 min-w-[200px]">
                    <button 
                      onClick={() => handleAction(rec.id, 'approve')}
                      className="flex-1 md:flex-none w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Approve Action
                    </button>
                    <button 
                      onClick={() => handleAction(rec.id, 'reject')}
                      className="flex-1 md:flex-none w-full py-2.5 px-4 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
