
import React, { useState, useEffect } from 'react';
import { User, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

type LoginStep = 'INITIAL' | 'SELECTION' | 'LOADING';

/**
 * 【自定義 APP LOGO SVG】
 * 請在 <svg> 標籤內貼上您的 path 或其他 SVG 內容。
 * 這將作為 APP 的主要 Logo 顯示。
 */
const CustomAppLogo = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <svg id="AuraLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1175.87">
      <g id="AuraLogo1">
        <path d="M848.36,989.15c-16.35,17.47-32.52,40.69-49.57,56.66-2.22,2.08-3.27,4.15-6.89,3.33-3.79-41.9.04-81.13,13.48-121.13,34.76-103.45,122.52-174.93,213.53-227.72,58.02-33.65,127.93-58.69,167.83-114.97,5.46-.19,12.14,46.4,12.56,53.02,10.17,162.48-91.9,282.82-209.46,379.08-63.01,51.6-134,92.15-188.35,153.63-1.36,1.53-2.98,4.81-7.34,4.81-.15-10.39-2.16-17.5,0-32.81,3.73-26.42,22.44-69.59,35.82-93.16,38.39-67.66,97.8-125.6,151.98-180.65" fill="#1a5538" />
        <path d="M351.64,989.15c16.35,17.47,32.52,40.69,49.57,56.66,2.22,2.08,3.27,4.15,6.89,3.33,3.79-41.9-.04-81.13-13.48-121.13-34.76-103.45-122.52-174.93-213.53-227.72-58.02-33.65-127.93-58.69-167.83-114.97-5.46-.19-12.14,46.4-12.56,53.02-10.17,162.48,91.9,282.82,209.46,379.08,63.01,51.6,134,92.15,188.35,153.63,1.36,1.53,2.98,4.81,7.34,4.81.15-10.39,2.16-17.5,0-32.81-3.73-26.42-22.44-69.59-35.82-93.16-38.39-67.66-97.8-125.6-151.98-180.65" fill="#1a5538" />
        <path d="M850.15,654.06v-15.69c0-12.61,8.33-24.31,20.68-26.86,39.66-8.18,73.31-45.3,82.79-98.27,20.08-112.24-72.73-200.74-148.34-140.61-19.7,15.67-46.59,59.86-46.59,90.99v600.03c0,15.36-12.45,27.81-27.81,27.81h0c-15.36,0-27.81-12.45-27.81-27.81l-.05-585.55c8.79-218.08,230.76-269.56,295.3-75.66,41.1,123.49-20.12,257.61-115.05,279-17.05,3.84-33.1-9.92-33.1-27.39Z" fill="#367a58" />
        <path d="M471.45,1091.47h-.3c-17.2,0-31.13-13.94-31.13-31.14l.06-501.43c-.98-50.91-31.98-97.31-81.45-111.93-90.17-26.64-171.43,58.55-140.45,147.56,14.24,40.92,49.97,67.95,91.28,74.58,14.91,2.39,25.33,16.18,25.33,31.28h0c0,19.28-17.36,33.75-36.42,30.82-129.94-19.95-199.39-176.58-110-287.38,102.16-126.64,307.72-55.11,314.26,105.12l-.06,511.39c0,17.19-13.94,31.13-31.13,31.13Z" fill="#367a58" />
        <path d="M435.01,358.75c-136.44,5.92-208-178.57-120.33-291.2,99.64-127.44,302.15-62.91,315.75,96.19v896.52c0,17.25-14,31.25-31.25,31.25s-31.45-14-31.45-31.25l.2-883.73c-2.43-103.49-132.91-153-200.49-73.05-60.47,71.43-15.02,176.75,69.6,189.13l3.36.39c17.31,2.3,31.34,14.83,31.34,33.09,0,15.02-9.48,29.52-22.73,31.45-3.48.51-10.49,1.07-14,1.22Z" fill="#367a58" />
      </g>
    </svg>
  </svg>
);

/**
 * 【自定義 健保快易通 ICON SVG】
 * 請在 <svg> 標籤內貼上您的 path 或其他 SVG 內容。
 * 這將顯示在登入按鈕的左側。
 */
const CustomNHIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <svg id="healthcare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1175.87">
      <g id="healthcare1">
        <path d="M1135.66,536.65v639.22h-414.21v-414.23h-242.88v414.23H64.34v-639.22c0-114.38,92.73-207.11,207.12-207.11s207.11,92.73,207.11,207.11v10.43h242.88v-10.43c0-114.38,92.73-207.11,207.11-207.11s207.11,92.73,207.11,207.11Z" fill="#fff" />
        <path d="M213.31,0h116.3C380.16,0,421.2,41.04,421.2,91.59v230.25H121.71V91.59C121.71,41.04,162.75,0,213.31,0Z" fill="#fff" />
        <circle cx="928.55" cy="161.42" r="160.42" fill="#fff" />
      </g>
    </svg>
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>('INITIAL');

  // Simulate API call/Loading when account is selected
  useEffect(() => {
    if (step === 'LOADING') {
      const timer = setTimeout(() => {
        onLogin();
      }, 500); // 0.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, [step, onLogin]);

  const handleAccountSelect = () => {
    setStep('LOADING');
  };

  const handleBack = () => {
    setStep('INITIAL');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-surface">

      {/* Fluid Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vh] h-[70vh] bg-primary/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-[40%] -right-[20%] w-[60vh] h-[60vh] bg-[#38bdf8]/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" style={{ animationDelay: '2s', animationDirection: 'reverse' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50vh] h-[50vh] bg-accent/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Center Group: Wraps everything to center vertically and horizontally */}
      <div className="z-10 w-full max-w-md flex flex-col items-center gap-10">
        
        {/* Branding Header */}
        <div className="text-center transition-all duration-500">
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-full p-5 shadow-xl inline-flex items-center justify-center ring-4 ring-white/40">
              <div className="bg-white rounded-full p-1 w-32 h-32 flex items-center justify-center">
                <CustomAppLogo />
              </div>
            </div>
          </div>
          <h1 className="text-[25.5pt] font-bold text-primary tracking-tight">AURA BOT</h1>
          <p className="text-[11pt] text-secondary/80 mt-2 font-medium tracking-wide">在醫療空間中重生的自由</p>
        </div>

        {/* Content Area: Switches states inline */}
        <div className="w-full flex justify-center min-h-[80px]">
          
          {/* --- Step 1: Initial Login Button --- */}
          {step === 'INITIAL' && (
            <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 px-6">
              <button
                onClick={() => setStep('SELECTION')}
                className="w-full bg-[#1e8e3e] text-white p-4 rounded-xl shadow-lg shadow-[#1e8e3e]/20 hover:bg-[#187a32] active:scale-95 transition-all flex items-center justify-center space-x-3 group"
              >
                <div className="bg-white/20 p-2 rounded-lg">
                  <CustomNHIIcon />
                </div>
                <span className="font-bold text-lg">使用 健保快易通 帳戶繼續</span>
              </button>
            </div>
          )}

          {/* --- Step 2: Account Selection (Inline Card) --- */}
          {step === 'SELECTION' && (
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center relative">
                <button 
                  onClick={handleBack}
                  className="absolute left-4 p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="font-bold text-slate-800 text-lg text-center w-full">選擇帳戶</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={handleAccountSelect}
                  className="w-full flex items-center p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-slate-100 group"
                >
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="font-bold text-slate-800 truncate">周大尾</p>
                    <p className="text-sm text-slate-500 truncate">yoyo1231234527@gmail.com</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                </button>

                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    使用其他帳戶
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- Step 3: Loading State (Inline) --- */}
          {step === 'LOADING' && (
            <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center animate-in fade-in duration-300 border border-white/50">
              <Loader2 size={48} className="text-primary animate-spin mb-4" />
              <p className="text-slate-600 font-medium">登入中...</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Login;
