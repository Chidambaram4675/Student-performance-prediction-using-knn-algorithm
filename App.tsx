import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  BarChart3, 
  Search, 
  Info,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Users
} from 'lucide-react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine
} from 'recharts';
import { studentDataset, Student } from './data/students';
import { predictPerformance, PredictionResult } from './lib/knn';
import { cn } from './lib/utils';

export default function App() {
  const [studyHours, setStudyHours] = useState<number>(10);
  const [attendance, setAttendance] = useState<number>(85);
  const [previousGrade, setPreviousGrade] = useState<number>(75);
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [extracurricularHours, setExtracurricularHours] = useState<number>(2);
  const [familySupport, setFamilySupport] = useState<number>(4);
  const [kValue, setKValue] = useState<number>(3);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handlePredict = () => {
    setIsPredicting(true);
    // Simulate a bit of "processing" time for UX
    setTimeout(() => {
      const prediction = predictPerformance(
        { studyHours, attendance, previousGrade, sleepHours, extracurricularHours, familySupport },
        studentDataset,
        kValue
      );
      setResult(prediction);
      setIsPredicting(false);
    }, 600);
  };

  const chartData = useMemo(() => {
    return studentDataset.map(s => ({
      ...s,
      isNeighbor: result?.neighbors.some(n => n.id === s.id) || false,
    }));
  }, [result]);

  const inputData = useMemo(() => ({
    studyHours,
    attendance,
    previousGrade,
    sleepHours,
    extracurricularHours,
    familySupport,
    performance: result?.predictedScore || 0,
    isInput: true
  }), [studyHours, attendance, previousGrade, sleepHours, extracurricularHours, familySupport, result]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Edu<span className="text-indigo-600">Predict</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#dataset" className="hover:text-indigo-600 transition-colors">Dataset</a>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <section className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Search className="w-4 h-4 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold">Student Parameters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Weekly Study Hours
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{studyHours}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      Attendance Rate
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{attendance}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" step="1"
                    value={attendance}
                    onChange={(e) => setAttendance(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      Previous Grade
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{previousGrade}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" step="1"
                    value={previousGrade}
                    onChange={(e) => setPreviousGrade(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Daily Sleep Hours
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{sleepHours}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="12" step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                      Extracurricular (Weekly)
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{extracurricularHours}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.5"
                    value={extracurricularHours}
                    onChange={(e) => setExtracurricularHours(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      Family Support (1-5)
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{familySupport}</span>
                  </div>
                  <input 
                    type="range" min="1" max="5" step="1"
                    value={familySupport}
                    onChange={(e) => setFamilySupport(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                      K-Value (Neighbors)
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{kValue}</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    value={kValue}
                    onChange={(e) => setKValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-2">
                    Higher K values smooth out the prediction but may include less relevant data points.
                  </p>
                </div>

                <button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className={cn(
                    "w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200",
                    isPredicting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                  )}
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Predict Performance
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-300" />
                  KNN Algorithm
                </h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  K-Nearest Neighbors predicts a value by looking at the 'K' most similar data points in the training set and averaging their outcomes.
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <BarChart3 className="w-32 h-32" />
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Prediction Card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80" cy="80" r="70"
                          fill="transparent"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                        />
                        <motion.circle
                          cx="80" cy="80" r="70"
                          fill="transparent"
                          stroke="#4f46e5"
                          strokeWidth="12"
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * result.predictedScore) / 100 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-slate-800">{result.predictedScore}%</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Predicted</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">Prediction Result</h2>
                        <p className="text-slate-500">Based on {kValue} similar students found in our database.</p>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                          Confidence: High
                        </div>
                        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                          Algorithm: KNN
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-600" />
                      Data Distribution & Neighbors
                    </h3>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <XAxis 
                            type="number" 
                            dataKey="studyHours" 
                            name="Study Hours" 
                            unit="h" 
                            label={{ value: 'Study Hours', position: 'bottom', offset: 0 }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="performance" 
                            name="Performance" 
                            unit="%" 
                            label={{ value: 'Performance', angle: -90, position: 'left' }}
                          />
                          <ZAxis type="number" dataKey="attendance" range={[50, 400]} name="Attendance" />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-sm">
                                    <p className="font-bold text-slate-800 mb-1">
                                      {data.isInput ? 'Current Prediction' : `Student #${data.id}`}
                                    </p>
                                    <div className="space-y-1 text-slate-600">
                                      <p>Study: {data.studyHours}h</p>
                                      <p>Performance: {data.performance}%</p>
                                      <p>Attendance: {data.attendance}%</p>
                                      <p>Sleep: {data.sleepHours}h</p>
                                      <p>Family: {data.familySupport}/5</p>
                                      {data.isNeighbor && <p className="text-indigo-600 font-bold">★ Nearest Neighbor</p>}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Scatter name="Students" data={chartData}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.isNeighbor ? '#4f46e5' : '#e2e8f0'} 
                                stroke={entry.isNeighbor ? '#4f46e5' : '#cbd5e1'}
                                strokeWidth={entry.isNeighbor ? 2 : 1}
                                opacity={entry.isNeighbor ? 1 : 0.6}
                              />
                            ))}
                          </Scatter>
                          <Scatter name="Input" data={[inputData]}>
                            <Cell fill="#f43f5e" stroke="#be123c" strokeWidth={3} />
                          </Scatter>
                          <ReferenceLine x={studyHours} stroke="#f43f5e" strokeDasharray="3 3" opacity={0.3} />
                          <ReferenceLine y={result.predictedScore} stroke="#f43f5e" strokeDasharray="3 3" opacity={0.3} />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-6 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        Other Students
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        Nearest Neighbors
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        Your Input
                      </div>
                    </div>
                  </div>

                  {/* Neighbors Table */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="font-bold text-slate-800">Nearest Neighbors Analysis</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                            <th className="px-6 py-4">Student ID</th>
                            <th className="px-6 py-4">Study Hours</th>
                            <th className="px-6 py-4">Attendance</th>
                            <th className="px-6 py-4">Prev. Grade</th>
                            <th className="px-6 py-4">Sleep</th>
                            <th className="px-6 py-4">Family</th>
                            <th className="px-6 py-4">Performance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {result.neighbors.map((neighbor) => (
                            <tr key={neighbor.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900">#{neighbor.id}</td>
                              <td className="px-6 py-4">{neighbor.studyHours}h</td>
                              <td className="px-6 py-4">{neighbor.attendance}%</td>
                              <td className="px-6 py-4">{neighbor.previousGrade}%</td>
                              <td className="px-6 py-4">{neighbor.sleepHours}h</td>
                              <td className="px-6 py-4">{neighbor.familySupport}/5</td>
                              <td className="px-6 py-4 font-bold text-indigo-600">{neighbor.performance}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <BarChart3 className="w-10 h-10 text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-400">Ready to Predict</h2>
                  <p className="text-slate-400 max-w-xs mt-2">
                    Adjust the parameters on the left and click "Predict Performance" to see the results.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Algorithm Steps Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 scroll-mt-20">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">How the Prediction Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Select K", desc: "Choose the number of nearest neighbors (K) to consider for the prediction.", icon: <Users className="w-6 h-6" /> },
            { step: 2, title: "Distance", desc: "Calculate the Euclidean distance between your input and every student in the dataset.", icon: <Search className="w-6 h-6" /> },
            { step: 3, title: "Find Neighbors", desc: "Identify the K students with the smallest distances to your input parameters.", icon: <TrendingUp className="w-6 h-6" /> },
            { step: 4, title: "Predict", desc: "Average the performance scores of those K neighbors to determine the final prediction.", icon: <GraduationCap className="w-6 h-6" /> },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-6xl font-black">{item.step}</span>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Step {item.step}: {item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Dataset Section */}
      <section id="dataset" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Training Dataset</h3>
            <p className="text-slate-500 text-sm">The complete collection of student records used for KNN proximity calculations.</p>
          </div>
          <div className="bg-indigo-50 px-4 py-2 rounded-full text-indigo-700 text-sm font-bold">
            {studentDataset.length} Records
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Study</th>
                  <th className="px-6 py-4">Attendance</th>
                  <th className="px-6 py-4">Prev. Grade</th>
                  <th className="px-6 py-4">Sleep</th>
                  <th className="px-6 py-4">Family</th>
                  <th className="px-6 py-4">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentDataset.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">#{student.id}</td>
                    <td className="px-6 py-4">{student.studyHours}h</td>
                    <td className="px-6 py-4">{student.attendance}%</td>
                    <td className="px-6 py-4">{student.previousGrade}%</td>
                    <td className="px-6 py-4">{student.sleepHours}h</td>
                    <td className="px-6 py-4">{student.familySupport}/5</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{student.performance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div id="algorithm">
              <h4 className="text-lg font-bold mb-4 text-slate-800">The KNN Algorithm</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                K-Nearest Neighbors (KNN) is a non-parametric, supervised learning classifier. It works on the principle that similar data points exist in close proximity. In this project, we use <strong>Euclidean distance</strong> across multiple dimensions (Study Hours, Attendance, Sleep, etc.) to find the most similar student profiles.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800">Educational Purpose</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                This tool is designed for educational purposes to demonstrate how machine learning algorithms can be applied to real-world scenarios. The dataset is synthetic but modeled after common educational performance trends.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
            &copy; 2026 Student Performance Predictor. Built for ML Learning.
          </div>
        </div>
      </footer>
    </div>
  );
}
