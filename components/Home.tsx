
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Circle, ArrowRight, Bot } from 'lucide-react';
import { Task, TaskStatus } from '../types';

interface HomeProps {
  tasks: Task[];
  onNavigate: () => void;
}

const Home: React.FC<HomeProps> = ({ tasks, onNavigate }) => {
  const [expandedTask, setExpandedTask] = useState<string | null>('2'); // Default open active task

  const toggleTask = (id: string) => {
    setExpandedTask(expandedTask === id ? null : id);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return 'text-primary bg-green-50 border-green-200';
      case TaskStatus.ACTIVE: return 'text-primary bg-white border-primary shadow-sm';
      case TaskStatus.IN_PROGRESS: return 'text-amber-600 bg-amber-50 border-amber-200 shadow-sm';
      case TaskStatus.PENDING: return 'text-slate-400 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (status: TaskStatus) => {
      switch (status) {
        case TaskStatus.COMPLETED: return '已完成';
        case TaskStatus.ACTIVE: return '下一站';
        case TaskStatus.IN_PROGRESS: return '進行中';
        case TaskStatus.PENDING: return '待處理';
      }
  };

  return (
    <div className="pb-32 pt-4 px-4 space-y-6 bg-surface min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-slate-500 font-medium">2025年 10月 25日 (一)</p>
          <h2 className="text-2xl font-bold text-slate-800">今日就醫行程</h2>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider text-center">目前進度</p>
          <div className="text-lg font-bold text-primary text-center">25<span className="text-sm text-slate-300">/100</span></div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-4">
        {tasks.map((task, index) => {
          const isActive = task.status === TaskStatus.ACTIVE;
          const isInProgress = task.status === TaskStatus.IN_PROGRESS;
          const isCompleted = task.status === TaskStatus.COMPLETED;
          const isLast = index === tasks.length - 1;
          
          return (
            <div key={task.id} className="relative flex items-start group">
              {/* Timeline Connector Line - Hidden for the last item */}
              {!isLast && (
                <div className="absolute left-5 top-0 bottom-[-1.5rem] w-0.5 -ml-px bg-slate-200" aria-hidden="true" />
              )}

              {/* Timeline Connector Icon */}
              <div className={`absolute left-0 h-10 w-10 flex items-center justify-center rounded-full border-4 z-10 bg-white transition-all duration-500
                 ${isCompleted ? 'border-primary text-primary' : 
                   isInProgress ? 'border-amber-400 text-amber-500' :
                   isActive ? 'border-secondary text-secondary' : 'border-slate-200 text-slate-300'}
              `}>
                {isCompleted ? <CheckCircle2 size={18} /> : 
                 isInProgress ? (
                   <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75"></div>
                      <Circle size={18} fill="currentColor" className="relative z-10" />
                   </div>
                 ) :
                 <Circle size={18} fill={isActive ? "currentColor" : "none"} />}
              </div>

              {/* Card */}
              <div className="ml-14 w-full">
                <div 
                  onClick={() => toggleTask(task.id)}
                  className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden
                    ${isActive || isInProgress ? 'ring-2 ring-primary/10 border-primary/50' : 'border-slate-100'}
                  `}
                >
                  {/* Card Header */}
                  <div className="p-4 flex justify-between items-center cursor-pointer">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800">{task.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-700 mt-1">{task.title}</h3>
                      <div className="flex items-center text-slate-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        {task.floor} - {task.location}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className={`bg-stone-50/50 transition-all duration-300 ease-in-out ${expandedTask === task.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 border-t border-stone-100 space-y-3">
                      <p className="text-sm text-slate-600">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          預估時間：{task.estimatedDuration} 分鐘
                        </div>
                      </div>

                      {isActive && (
                        <div className="mt-4">
                          <button 
                             onClick={(e) => { e.stopPropagation(); onNavigate(); }}
                             className="w-full flex items-center justify-center py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 active:scale-95 transition-transform text-sm shadow-lg shadow-primary/20"
                          >
                            開始導航
                            <ArrowRight size={16} className="ml-2" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* End of list spacer */}
      <div className="h-8"></div>
    </div>
  );
};

export default Home;
