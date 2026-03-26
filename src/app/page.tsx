"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, ShieldAlert, DollarSign, Terminal, Cpu, CheckCircle2, Zap, AlertTriangle, Code, Crosshair } from "lucide-react";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYSTEM] InfraGuard Nexus v5.0.0 Online.",
    "[SYSTEM] Deep Learning Tensors allocated (WebGPU Accelerated).",
    "[SYSTEM] Waiting for execution command..."
  ]);
  const [scanProgress, setScanProgress] = useState(0);

  const addLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, log].slice(-12));
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setTerminalLogs([]);
    addLog("[INGESTION] Bypassing cloud firewalls via Read-Only IAM Edge Roles...");
    
    for (let i = 0; i <= 100; i += 15) {
      setScanProgress(i);
      if (i === 15) addLog("[INFERENCE] Extracting 1.4TB of VPC flow logs into Tensor Cache...");
      if (i === 30) addLog(`[INFERENCE] Matrix Multiplication Latency: ${Math.random().toFixed(2)}ms`);
      if (i === 45) addLog("[INFERENCE] Cross-referencing IAM policies against MITRE ATT&CK Framework...");
      if (i === 60) addLog("[INFERENCE] Calculating Blast Radius & CVSS Vulnerability Vectors...");
      if (i === 75) addLog("[SYSTEM] Generating Automated Terraform & CLI Remediation Playbooks...");
      if (i === 90) addLog("[SYSTEM] Formatting structural outputs for presentation layer...");
      await new Promise((r) => setTimeout(r, 450));
    }
    setScanProgress(100);

    try {
      const res = await fetch('/api/agent', { method: 'POST', body: JSON.stringify({}) });
      const newFindings = await res.json();
      setRecommendations((prev) => [...newFindings, ...prev]);
      addLog(`[SUCCESS] Scan complete. ${newFindings.length} High-Severity Anomaly Nodes Isolated.`);
    } catch (err) {
      addLog("[ERROR] Critical failure in neural pathway.");
    } finally {
      setIsScanning(false);
    }
  };

  const executeAction = (id: string, actionName: string) => {
    setRecommendations(recommendations.filter(r => r.id !== id));
    addLog(`[EXECUTION] Protocol '${actionName}' injected securely. Blast Radius contained.`);
  };

  const totalSavings = recommendations.reduce((sum, rec) => sum + (rec.estimated_monthly_savings || 0), 0);
  const criticalCount = recommendations.filter(r => r.risk_level === 'CRITICAL').length;
  const avgSeverity = recommendations.length > 0 ? (recommendations.reduce((sum, rec) => sum + (rec.metrics?.severity || 0), 0) / recommendations.length).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-[#020202] text-neutral-300 font-sans selection:bg-blue-500/30 w-full overflow-hidden flex flex-col relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/40 backdrop-blur-2xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">InfraGuard<span className="text-blue-500">.AI</span></span>
          <div className="hidden md:flex ml-4 px-3 py-1 font-mono text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md gap-2 items-center">
             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Neural Engine Active
          </div>
        </div>
        
        <button 
          onClick={handleRunScan} disabled={isScanning}
          className="group relative px-6 py-2.5 bg-white text-black hover:bg-neutral-200 border border-white/10 rounded-lg font-bold text-sm transition-all overflow-hidden disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          {isScanning ? (
            <span className="flex items-center gap-2 font-mono"><Activity className="w-4 h-4 animate-spin" /> EXECUTING SCAN</span>
          ) : (
            <span className="flex items-center gap-2"><Crosshair className="w-4 h-4" /> INITIATE DEEP SCAN</span>
          )}
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 w-full max-w-[1600px] mx-auto p-4 gap-4 h-[calc(100vh-64px)]">
        
        {/* Left/Center Column - Analytics & Feed */}
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-10">
          
          {/* Top Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
            {[
              { label: "Capital Saved", val: `$${totalSavings.toFixed(2)}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
              { label: "Critical Weaknesses", val: criticalCount, icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
              { label: "Avg CVSS Severity", val: avgSeverity, icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
              { label: "Nodes Processed", val: (recommendations.length * 442) + scanProgress * 15, icon: Server, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            ].map((stat, i) => (
              <div key={i} className={`p-5 rounded-2xl bg-neutral-900/50 backdrop-blur-md border ${stat.border} relative overflow-hidden flex flex-col`}>
                <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
                   <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-mono font-black ${stat.color}`}>{stat.val}</div>
              </div>
            ))}
          </div>

          {/* Incident Feed */}
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2 border-b border-white/5 pb-2 mt-4">
              <Cpu className="w-4 h-4 text-blue-500" /> Detected Incident Queue
            </h2>

            <AnimatePresence>
              {recommendations.length === 0 && !isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] border-dashed">
                  <CheckCircle2 className="w-12 h-12 text-neutral-700 mb-4" />
                  <h3 className="text-xl font-bold text-neutral-400">Environment Secure</h3>
                  <p className="text-neutral-600 text-sm max-w-sm text-center mt-2">No configuration drifts or critical CVE vulnerabilities detected. Run a Deep Scan to update telemetry.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {recommendations.map((rec) => (
                <motion.div key={rec.id} initial={{ opacity: 0, scale: 0.98, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, height: 0 }} className="group rounded-2xl bg-[#0c0c0c] border border-white/5 hover:border-white/10 overflow-hidden flex flex-col w-full">
                   
                   {/* Top Bar */}
                   <div className="px-5 py-3 border-b border-white/5 bg-[#111] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-sm ${rec.scan_category === 'SECURITY_COMPLIANCE' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}>
                          {rec.risk_level} SEVERITY
                        </span>
                        <span className="text-white font-mono font-bold">{rec.resource_id}</span>
                      </div>
                      <div className="flex gap-3 text-xs font-mono font-medium text-neutral-500">
                        <span>CVSS: <span className="text-amber-400">{rec.metrics.severity}</span></span>
                        <span>RAD: <span className="text-rose-400">{rec.metrics.blastRadius} Nodes</span></span>
                        <span>CONF: <span className="text-blue-400">{rec.confidence}%</span></span>
                      </div>
                   </div>

                   {/* Body */}
                   <div className="p-5 flex flex-col xl:flex-row gap-6">
                      
                      <div className="flex-1 space-y-4">
                         <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">AI Diagnostic Reasoning</div>
                            <p className="text-sm text-neutral-300 leading-relaxed font-sans">{rec.reasoning}</p>
                         </div>
                         
                         {/* MITRE Tags */}
                         {rec.mitre && rec.mitre.length > 0 && (
                           <div className="flex gap-2">
                             {rec.mitre.map((m: string) => <span key={m} className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-mono font-bold tracking-widest">MITRE: {m}</span>)}
                             <span className="text-[10px] bg-neutral-800 text-neutral-400 border border-white/10 px-2 py-1 rounded font-bold uppercase tracking-widest">Impact: {rec.compliance_impact}</span>
                           </div>
                         )}

                         {/* Remediation Code Block */}
                         <div className="bg-[#050505] rounded-xl border border-white/10 overflow-hidden mt-4">
                            <div className="bg-[#111] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                               <div className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2"><Code className="w-3 h-3" /> Auto-Generated Remediation Playbook</div>
                            </div>
                            <pre className="p-4 text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-loose">
                               {rec.remediation_code}
                            </pre>
                         </div>
                      </div>

                      {/* Right Actions Panel */}
                      <div className="xl:w-64 flex flex-col gap-3 justify-end">
                        {rec.estimated_monthly_savings > 0 && (
                          <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl text-center mb-2 shadow-[inset_0_0_20px_rgba(16,185,129,0.02)]">
                            <div className="text-[10px] font-bold text-emerald-500/70 tracking-widest uppercase">Financial Leak Identified</div>
                            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">${rec.estimated_monthly_savings}</div>
                          </div>
                        )}
                        <button onClick={() => executeAction(rec.id, rec.decision)} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] border border-blue-400">
                          EXECUTE PLAYBOOK
                        </button>
                        <button onClick={() => executeAction(rec.id, "DISMISS")} className="w-full px-4 py-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-neutral-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-transparent hover:border-rose-500/20">
                          Ignore Threat
                        </button>
                      </div>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Terminal Window */}
        <div className="hidden lg:flex w-[400px] flex-shrink-0 flex-col rounded-2xl bg-[#070707] border border-white/10 overflow-hidden shadow-2xl relative">
          <div className="flex border-b border-white/10 bg-[#111] px-4 py-3 items-center justify-between z-10">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-rose-500" />
               <div className="w-3 h-3 rounded-full bg-amber-500" />
               <div className="w-3 h-3 rounded-full bg-emerald-500" />
             </div>
             <div className="text-[10px] font-mono font-bold text-neutral-500 tracking-widest uppercase flex items-center gap-2">
               Live Tensor Feed <Terminal className="w-3 h-3" />
             </div>
          </div>
          
          <div className="flex-1 p-5 font-mono text-[11px] overflow-hidden relative flex flex-col justify-end leading-relaxed">
             <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-transparent h-20 z-10" />
             
             {isScanning && (
               <div className="w-full bg-[#111] border border-white/5 rounded-full mb-4 p-1 overflow-hidden relative">
                 <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                 <div className="h-1 bg-blue-500 rounded-full transition-all duration-300 relative z-10 shadow-[0_0_10px_rgba(59,130,246,1)]" style={{ width: `${scanProgress}%` }} />
               </div>
             )}
             
             <div className="space-y-3 relative z-0 flex flex-col justify-end">
               <AnimatePresence>
                 {terminalLogs.map((log, i) => (
                   <motion.div 
                     key={i + log} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                     className={`break-words ${log.includes('[ERROR]') ? 'text-rose-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : log.includes('[INFERENCE]') ? 'text-blue-300' : 'text-neutral-500'}`}
                   >
                     {log}
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
             <div className="w-2 h-4 bg-white animate-pulse mt-2 opacity-50 block" />
          </div>
        </div>

      </main>
      
      {/* Scrollbar styling injected globally via tailwind plugins but we can do it via a quick style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}
