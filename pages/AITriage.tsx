
import React, { useState } from 'react';
import { getAITriage } from '../services/geminiService';
import { TriageResult } from '../types';

const AITriage: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleTriage = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const res = await getAITriage(symptoms);
      setResult(res);
    } catch (error) {
      alert("Failed to get AI recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 text-center border-b border-slate-100 bg-slate-50">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-robot text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI Symptom Triage</h1>
          <p className="text-slate-500 max-w-lg mx-auto">Describe what you're feeling, and our AI will help assess the urgency and potential next steps for your care.</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Describe your symptoms</label>
            <textarea 
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] bg-slate-50"
              placeholder="e.g., I have been feeling a sharp pain in my lower back for the last 3 days, accompanied by slight fever..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <p className="mt-3 text-xs text-slate-400 italic">
              <i className="fas fa-info-circle mr-1"></i> Disclaimer: This is an AI tool and not a replacement for professional medical advice. Always call emergency services if you're in severe pain.
            </p>
          </div>

          <button 
            onClick={handleTriage}
            disabled={loading || !symptoms.trim()}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-circle-notch fa-spin"></i> Analyzing symptoms...
              </span>
            ) : "Analyze Now"}
          </button>

          {result && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800">Assessment Summary</h3>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    result.severity === 'low' ? 'bg-green-100 text-green-700' :
                    result.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    Severity: {result.severity}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">{result.summary}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Possible Causes</h4>
                    <ul className="space-y-2">
                      {result.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                          <i className="fas fa-check-circle text-blue-400"></i> {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Recommendation</h4>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 text-sm leading-relaxed">
                      {result.recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITriage;
