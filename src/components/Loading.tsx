const Loading = () => {
    return (
      <>
        <style>{`
          @keyframes rotate {
            100% { transform: rotate(360deg); }
          }
          @keyframes dash {
            0%   { stroke-dashoffset: 150; stroke-dasharray: 30 120; }
            50%  { stroke-dashoffset: 50;  stroke-dasharray: 100 50; }
            100% { stroke-dashoffset: 150; stroke-dasharray: 30 120; }
          }
          @keyframes dot-pulse {
            0%, 100% { r: 4; opacity: 0.4; }
            50%       { r: 6;   opacity: 1; }
          }
          .svg-spinner { animation: rotate 1.6s linear infinite; }
          .arc-main    { animation: dash 1.6s ease-in-out infinite; stroke: url(#grad); stroke-linecap: round; }
          .arc-track   { stroke: rgba(255,255,255,0.07); }
          .center-dot  { animation: dot-pulse 1.6s ease-in-out infinite; }
        `}</style>
  
        <div className="flex items-center justify-center">
          <div className="relative w-5.5 h-5.5">
  
            {/* Spinning arc */}
            <svg className="svg-spinner absolute inset-0" width="30" height="30" viewBox="0 0 40 40">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#fff" />
                  <stop offset="100%" stopColor="#e67e22" />
                </linearGradient>
                <radialGradient id="dot-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#fff" />
                  <stop offset="100%" stopColor="#e67e22" />
                </radialGradient>
              </defs>
              <circle className="arc-track" cx="20" cy="20" r="16" fill="none" strokeWidth="6" />
              <circle className="arc-main"  cx="20" cy="20" r="16" fill="none" strokeWidth="6"
                strokeDasharray="30 120" strokeDashoffset="150" />
            </svg>
  
            {/* Center dot — static */}
            <svg className="absolute inset-0" width="30" height="30" viewBox="0 0 40 40">
              <circle className="center-dot" cx="20" cy="20" r="5" fill="#ffffff" />
            </svg>
  
          </div>
        </div>
      </>
    );
  };
  
  export default Loading;