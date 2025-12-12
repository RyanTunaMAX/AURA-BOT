import React from 'react';
import { Wind, Thermometer, Droplets, ShieldCheck, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '09:00', co2: 420 },
  { time: '09:15', co2: 450 },
  { time: '09:30', co2: 580 }, // Peak during rush
  { time: '09:45', co2: 520 },
  { time: '10:00', co2: 480 },
  { time: '10:15', co2: 440 },
  { time: '10:30', co2: 430 },
];

const AirQuality: React.FC = () => {
  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
       <div>
          <h2 className="text-2xl font-bold text-slate-800">環境資訊</h2>
          <p className="text-slate-500">AURA BOT 即時監測數據</p>
       </div>

       {/* Main Status Card */}
       <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-green-100 font-medium mb-1">目前狀態</p>
                    <h3 className="text-4xl font-bold">優良</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                    <ShieldCheck size={32} />
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center text-green-100 text-xs mb-1">
                        <Wind size={12} className="mr-1" /> CO2
                    </div>
                    <p className="font-bold text-xl">430 <span className="text-xs font-normal opacity-70">ppm</span></p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center text-green-100 text-xs mb-1">
                        <Thermometer size={12} className="mr-1" /> 溫度
                    </div>
                    <p className="font-bold text-xl">27.5 <span className="text-xs font-normal opacity-70">°C</span></p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center text-green-100 text-xs mb-1">
                        <Droplets size={12} className="mr-1" /> 濕度
                    </div>
                    <p className="font-bold text-xl">55 <span className="text-xs font-normal opacity-70">%</span></p>
                </div>
            </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-secondary/30 rounded-full blur-xl"></div>
       </div>

       {/* Chart Section */}
       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 flex items-center">
                <Activity size={18} className="mr-2 text-primary" />
                二氧化碳趨勢
            </h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md">過去一小時</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#367a58" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#367a58" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#94a3b8" />
                    <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="co2" stroke="#367a58" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
       </div>

       {/* Purification Mode */}
       <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
                <h4 className="font-semibold text-slate-800">空氣淨化模式</h4>
                <p className="text-xs text-slate-500">依據人流密度自動調節中</p>
            </div>
            <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-emerald-600">運轉中</span>
            </div>
       </div>
    </div>
  );
};

export default AirQuality;