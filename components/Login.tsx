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
  <svg
    viewBox="0 0 1195.09 1086.05"
    className="w-full h-full text-primary overflow-visible"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <g id="AuraLogoGroup" transform="translate(-50, 30)">
      <path d="M152.58,584.62c129.03,80.05,325.18,74.36,470.87,73.8l300.66-1.16c81.27-.31,157.58,38.88,194.05,116.26,30.86,65.48,31.18,144.31-3.1,208.29-53.68,100.21-176.59,133.11-272.28,76.97-51.73-30.35-84.1-85.86-89.39-147.41-1.68-19.58,8.76-35.04,26.26-37.97,16.49-2.77,35,8.95,36.4,28.71,2.94,41.49,22.51,77.3,57.79,99.63,40.71,25.77,91.41,26.15,135.39,1.05,37.81-21.58,64.65-64.11,68.32-113.4,4.08-54.8-16.81-108.73-61.26-140.11-26.32-18.58-57.43-28.7-89.43-29.39l-127.83-2.75-259.58-.66c-53.59-.14-104.2-3.32-157.01-8.65-47.9-4.83-93.02-13.58-139.34-26.87-95.81-27.47-176.31-87.73-230.41-174.13-3.83-6.11-8.28-8.75-12.69-17.18,112.92,39.77,221.87,62.89,343.21,55.48,101.49-6.2,206.51-40.49,273.62-124.54-1.34-30.67-2.62-59.05.11-89.57,10.96-122.33,72.58-218.24,177.48-275.24C910.77-7.42,1068.6-10.93,1195.09,15.64c-60.83,63-79.4,154.62-101.85,237.9-12.88,47.77-30.68,92.3-58.25,132.64-81.01,118.53-227.99,136-355.56,101.63,24.81-34.66,47.03-71.97,75.35-103.12,57.24-24.57,118.86-30.66,179.92-38.72-51.15-12.84-100.78-8.28-149.2-2.78,111.79-126.3,61.11-105.05,229.43-137.5-33.47-6.69-69.96-5.89-103.59-1.1l106.02-98.96c-73.83,37.74-134.34,91.59-194.77,147.76-2.71-39.79,6.18-77.51,10.46-118.43-30.06,45.73-29.96,101.9-44.36,151.67l-93.1,114.49c-14.68,18.06-27.99,34.29-42.53,52.23-44.07,54.4-100.94,92.62-165.44,116.55-48,17.81-95.66,25-146.72,28.64-63.48,4.53-123.4-3.27-188.31-13.92Z" />
      <path d="M883.06,944.55c26.37,6.33,54.01,3.86,73.37-17.52,18.29-20.19,20.58-52.95,4.22-75.4-10.56-14.48-27.88-22.49-45.91-22.86l-274.83-5.6c-120.76-2.46-305.84-13.57-402.91-90.44,160.33,44.76,323.17,38.6,487.39,38.62l176.58.02c32.95,0,64.22,7.51,89.49,30.03,35.65,31.75,43.13,88.52,15.9,129.21-27.58,41.22-87.03,48.73-123.31,13.93Z" />
    </g>
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
          <p className="text-[11pt] text-secondary/80 mt-2 font-medium tracking-wide">風與植栽的醫院導引裝置</p>
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
