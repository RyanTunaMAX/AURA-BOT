
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { User, Settings, Bell, Accessibility, LogOut, ChevronRight, FileText, Loader2 } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [isNotifOn, setIsNotifOn] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleNotification = () => {
    setIsNotifOn(!isNotifOn);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 relative">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">個人檔案</h2>
          <p className="text-slate-500">帳號管理與設定</p>
       </div>

       {/* ID Card */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
             <User size={32} />
          </div>
          <div>
             <h3 className="font-bold text-lg text-slate-800">{MOCK_USER.name}</h3>
             <p className="text-slate-500 text-sm">病歷號碼：{MOCK_USER.patientId}</p>
             <p className="text-slate-400 text-xs mt-1">健保卡號：{MOCK_USER.idNumber}</p>
          </div>
       </div>

       {/* Menu Items */}
       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div className="flex items-center text-slate-700">
                <FileText size={20} className="mr-3 text-primary" />
                <span className="font-medium">病歷檢示</span>
             </div>
             <ChevronRight size={16} className="text-slate-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div className="flex items-center text-slate-700">
                <Accessibility size={20} className="mr-3 text-primary" />
                <span className="font-medium">無障礙模式</span>
             </div>
             <ChevronRight size={16} className="text-slate-400" />
          </button>
          
          <button 
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            onClick={toggleNotification}
          >
             <div className="flex items-center text-slate-700">
                <Bell size={20} className="mr-3 text-primary" />
                <span className="font-medium">通知設定</span>
             </div>
             <div className={`text-xs px-2 py-1 rounded-full transition-colors ${isNotifOn ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                {isNotifOn ? '開啟' : '關閉'}
             </div>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div className="flex items-center text-slate-700">
                <Settings size={20} className="mr-3 text-primary" />
                <span className="font-medium">應用程式設定</span>
             </div>
             <ChevronRight size={16} className="text-slate-400" />
          </button>
       </div>

       <button 
         onClick={() => setShowLogoutConfirm(true)}
         className="w-full py-4 text-rose-500 font-medium flex items-center justify-center space-x-2 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
       >
            <LogOut size={18} />
            <span>登出帳號</span>
       </button>

       {/* Logout Confirmation/Loading Modal */}
       {showLogoutConfirm && createPortal(
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* Backdrop - disable click if logging out */}
           <div 
             className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
             onClick={() => !isLoggingOut && setShowLogoutConfirm(false)}
           />
           
           {/* Modal Content */}
           <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl transition-all duration-300">
             {isLoggingOut ? (
               // Loading State
               <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in-95 duration-300">
                 <Loader2 size={48} className="text-rose-500 animate-spin mb-4" />
                 <p className="text-slate-600 font-medium">登出中...</p>
               </div>
             ) : (
               // Confirmation State
               <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                 <div className="bg-rose-100 p-4 rounded-full text-rose-500">
                   <LogOut size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800">確定要登出嗎？</h3>
                 <p className="text-slate-500 text-sm">
                   登出後將無法收到即時的看診通知與導航服務。
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4 w-full pt-2">
                   <button 
                     onClick={() => setShowLogoutConfirm(false)}
                     className="py-3 px-4 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                   >
                     否，取消
                   </button>
                   <button 
                     onClick={handleConfirmLogout}
                     className="py-3 px-4 rounded-xl font-medium text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-colors"
                   >
                     是，登出
                   </button>
                 </div>
               </div>
             )}
           </div>
         </div>,
         document.body
       )}
    </div>
  );
};

export default Profile;
