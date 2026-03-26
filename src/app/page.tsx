"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, ShieldAlert, DollarSign, Terminal, Cpu, CheckCircle2, XCircle, Zap } from "lucide-react";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYSTEM] InfraGuard Enterprise v4.2.0 initialized.",
    "[SYSTEM] Local Neural Inference Engine loaded (Weights: INT8).",
    "[SYSTEM] Ready for telemetry ingestion..."
  ]);
  const [scanProgress, setScanProgress] = useState(0);

  const addLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, log].slice(-10)); // Keep last 10 logs
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setTerminalLogs([]);
    addLog("[INGESTION] Connecting to cloud fabric APIs...");
    
    // Simulate complex scanning process for the user
    for (let i = 0; i <= 100; i += 20) {
      setScanProgress(i);
      if (i === 20) addLog("[INFERENCE] Extracting VPC flow logs...");
      if (i === 40) addLog(`[INFERENCE] Running multi-dimensional tensor analysis (Lat: ${Math.random().toFixed(2)}ms)...`);
      if (i === 60) addLog("[INFERENCE] Matching anomaly signatures against CVE matrix...");
      if (i === 80) addLog("[INFERENCE] Compiling heuristics into localized action nodes.");
      if (i === 100) addLog("[SYSTEM] Inference matrix complete. Rendering structural optimizations.");
      await new Promise((r) => setTimeout(r, 600));
    }

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'deep_scan', scope: 'global' })
      });
      
      if (!res.ok) throw new Error("Local Engine Fault");
      
      const newFindings = await res.json();
      setRecommendations((prev) => [...newFindings, ...prev]);
      addLog(`[SUCCESS] Generated ${newFindings.length} high-confidence optimization nodes.`);
    } catch (err) {
      console.error(err);
      addLog("[ERROR] Critical failure in local ML pipeline.");
    } finally {
      setIsScanning(false);
    }
  };

  const executeAction = (id: string, actionName: string) => {
    setRecommendations(recommendations.filter(r => r.id !== id));
    addLog(`[EXECUTION] Action '${actionName}' executed successfully on edge. Context closed.`);
  };

  const totalSavings = recommendations.reduce((sum, rec) => sum + (rec.estimated_monthly_savings || 0), 0);
  const criticalCount = recommendations.filter(r => r.risk_level === 'CRITICAL').length;

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-purple-500/30 w-full overflow-x-hidden relative">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Enterprise Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 outline outline-1 outline-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">INFRAGUARD<span className="text-blue-500 font-black">.NEXUS</span></span>
            <span className="ml-4 px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              LOCAL WEIGHTS ACTIVE
            </span>
          </div>
          
          <button 
            onClick={handleRunScan}
            disabled={isScanning}
            className="group relative px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium text-sm transition-all overflow-hidden disabled:opacity-50"
          >
            {isScanning ? (
              <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Deep Engine Active</span>
            ) : (
              <span className="flex items-center gap-2 text-white"><Cpu className="w-4 h-4 group-hover:text-blue-400 transition-colors" /> Trigger Global Scan</span>
            )}
            {/* Animated border on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 rounded-full transition-colors" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Stats & Recommendations */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Hero Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium"><DollarSign className="w-4 h-4 text-green-500" /> Capital Recaptured</div>
              <div className="text-4xl font-bold font-mono tracking-tight text-white">${totalSavings.toFixed(2)}</div>
              <div className="text-xs text-neutral-500">Projected MRR Savings</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium"><ShieldAlert className="w-4 h-4 text-rose-500" /> Active Risks</div>
              <div className="text-4xl font-bold font-mono tracking-tight text-white">{criticalCount}</div>
              <div className="text-xs text-rose-500 border border-rose-500/20 bg-rose-500/10 px-2 rounded-full w-max">Critical Severity</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex flex-col gap-2 relative overflow-hidden">
               <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium"><Activity className="w-4 h-4 text-blue-500" /> Nodes Scanned</div>
               <div className="text-4xl font-bold font-mono tracking-tight text-white">{(recommendations.length * 42) + scanProgress * 13}</div>
               <div className="text-xs text-blue-400 border border-blue-500/20 bg-blue-500/10 px-2 rounded-full w-max">Real-time Telemetry</div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-4">
            <Server className="w-5 h-5 text-purple-500" /> Infrastructure Anomalies
          </h2>

          {/* Feed */}
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {recommendations.length === 0 && !isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center rounded-2xl bg-white/[0.01] border border-white/[0.05] border-dashed flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <CheckCircle2 className="w-8 h-8 text-neutral-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Fabric is Highly Optimized</h3>
                  <p className="text-neutral-500 max-w-sm text-sm">The Local Neural Engine has not detected any structural inefficiencies or CVE risks. Await incoming telemetry.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {recommendations.map((rec) => (
                <motion.div 
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl bg-neutral-900 border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col shadow-2xl"
                >
                  {/* Top Bar indicating type */}
                  <div className={`h-1 w-full ${rec.scan_category === 'SECURITY_COMPLIANCE' ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`} />
                  
                  <div className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm ${rec.risk_level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                          {rec.risk_level || "ROUTINE"}
                        </span>
                        <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">{rec.resource_type} • {rec.region}</span>
                        <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">Conf: {rec.confidence}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-white font-mono tracking-tight">{rec.resource_id}</h3>
                      
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group-hover:bg-black/60 transition-colors">
                        <p className="text-sm font-medium text-neutral-300 leading-relaxed font-sans">{rec.reasoning}</p>
                        <div className="mt-3 flex gap-2">
                           <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Compliance Impact:</span>
                           <span className="text-[10px] uppercase font-bold text-white tracking-wider">{rec.compliance_impact}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col items-center justify-between w-full md:w-auto gap-4 md:pl-6 md:border-l border-white/10">
                      {rec.estimated_monthly_savings > 0 && (
                        <div className="text-right flex-1 md:flex-none">
                          <div className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-1">Recapture</div>
                          <div className="text-3xl font-bold font-mono text-white">${rec.estimated_monthly_savings}</div>
                        </div>
                      )}
                      
                      <div className="flex md:flex-col gap-2 w-full">
                        <button onClick={() => executeAction(rec.id, rec.decision)} className="flex-1 px-4 py-3 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-xl transition-colors outline outline-1 outline-white/20 whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                          EXECUTE: {rec.decision.replace(/_/g, ' ')}
                        </button>
                        <button onClick={() => executeAction(rec.id, "DISMISS")} className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white font-bold text-xs rounded-xl transition-colors border border-transparent hover:border-white/10">
                          SUPPRESS ALERT
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        </div>

        {/* Right Column: Live Terminal */}
        <div className="lg:col-span-4 flex flex-col gap-4">
           <div className="sticky top-24">
             <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]">
                {/* Terminal Header */}
                <div className="flex border-b border-white/5 bg-[#0e0e0e] px-4 py-3 items-center justify-between">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                     <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                   </div>
                   <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase flex items-center gap-2">
                     <Terminal className="w-3 h-3" /> System Log
                   </div>
                </div>
                
                {/* Terminal Body */}
                <div className="flex-1 p-4 font-mono text-xs overflow-hidden relative flex flex-col justify-end">
                   <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent h-12 z-10" />
                   
                   {isScanning && (
                     <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                       <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                     </div>
                   )}
                   
                   <div className="space-y-2 relative z-0">
                     <AnimatePresence>
                       {terminalLogs.map((log, i) => (
                         <motion.div 
                           key={i + log}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           className={`break-words ${log.includes('[ERROR]') ? 'text-rose-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300 transition-colors'}`}
                         >
                           {log}
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                   {/* Blinking cursor */}
                   <div className="w-2 h-4 bg-white animate-pulse mt-2 opacity-50 block" />
                </div>
             </div>
           </div>
        </div>

      </main>
    </div>
  );
}
