import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Loading, PATH } from "../../components";
import { useState, type SubmitEvent } from "react";
import { RegisterFn } from "../../services";

export interface RegisterDataType {
  name: string,
  email: string,
  password: string,
  avatar: string
}

const Register = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>){
    setLoading(true)
    evt.preventDefault()
    const data:RegisterDataType = {
      name: evt.target.fullName.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsQN7nY_oEQF9_xzl91FZ5oO0P0QWoyDs3Zw&s"
    }
    RegisterFn(data, navigate, setLoading)
  }

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#07091a] font-['Jost',sans-serif]">
    <style>{`
      /* Login dagi barcha style lar shu yerda ham ishlaydi */
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Jost:wght@300;400;500&display=swap');
      @keyframes drift {
        from { transform: translate(0,0) scale(1); }
        to   { transform: translate(30px,-40px) scale(1.08); }
      }
      .blob { animation: drift 12s ease-in-out infinite alternate; }
      .blob-1 { animation-delay: 0s; }
      .blob-2 { animation-delay: 3s; }
      .blob-3 { animation-delay: 6s; }
      .btn-login::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(135deg, #c0392b 0%, #e67e22 100%);
        opacity: 0; transition: opacity 0.3s; border-radius: 10px;
      }
      .btn-login:hover::before { opacity: 1; }
      .glass-card {
        background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(255,255,255,0.10);
        box-shadow: 0 0 0 1px rgba(192,57,43,0.08) inset, 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(192,57,43,0.06);
        backdrop-filter: blur(24px);
      }
      .glass-card::before {
        content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
        background: linear-gradient(145deg, rgba(230,126,34,0.35) 0%, rgba(192,57,43,0.2) 30%, rgba(255,255,255,0.05) 60%, rgba(192,57,43,0.15) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
      }
      .glow-dot {
        position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
        width: 80px; height: 2px;
        background: linear-gradient(90deg, transparent, #e67e22, transparent); border-radius: 999px;
      }
      .glow-dot::after {
        content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
        width: 40px; height: 12px; background: rgba(230,126,34,0.3); filter: blur(8px); border-radius: 999px;
      }
    `}</style>
  
    {/* Blobs */}
    <div className="blob blob-1 absolute rounded-full pointer-events-none"
      style={{ width: 520, height: 520, background: "#8b0000", top: -120, left: -80, filter: "blur(90px)", opacity: 0.25 }} />
    <div className="blob blob-2 absolute rounded-full pointer-events-none"
      style={{ width: 400, height: 400, background: "#b84700", bottom: -80, right: 60, filter: "blur(90px)", opacity: 0.25 }} />
    <div className="blob blob-3 absolute rounded-full pointer-events-none"
      style={{ width: 300, height: 300, background: "#0a1854", top: "40%", left: "35%", filter: "blur(90px)", opacity: 0.25 }} />
  
    <form onSubmit={handleSubmit} autoComplete="off" className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
      <div className="absolute top-0 right-0 w-50 h-50 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(192,57,43,0.15), transparent 70%)" }} />
  
      <div className="glass-card relative w-full max-w-md rounded-2xl px-10 py-12">
        <div className="glow-dot" />
  
        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-6 h-6 opacity-20"
          style={{ borderTop: "1px solid #e67e22", borderRight: "1px solid #e67e22", borderRadius: "0 4px 0 0" }} />
        <div className="absolute bottom-4 left-4 w-6 h-6 opacity-20"
          style={{ borderBottom: "1px solid #e67e22", borderLeft: "1px solid #e67e22", borderRadius: "0 0 0 4px" }} />
  
        {/* Header */}
        <h2 className="text-[2rem] text-[#f0e6d3] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Create Account
        </h2>
        <p className="text-[0.85rem] text-[#566170] mb-8 font-light tracking-[0.5px]">
          Join us and start your journey
        </p>
  
        {/* Fields */}
        {([
            {
              label: "Full name",
              name: "fullName",
              type: "text",
              placeholder: "John Doe",
              icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            },
            {
              label: "Email address",
              name: "email",
              type: "email",
              placeholder: "you@example.com",
              icon: (
                <>
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 7 10-7" />
                </>
              )
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "••••••••",
              icon: (
                <>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </>
              )
            },
          ] as const).map(({ label, name, type, placeholder, icon }) => (
            <div key={name} className="mb-5 relative">
              <label className="block text-[0.7rem] tracking-[3px] uppercase text-[#8892a4] mb-2.5 font-medium">
                {label}
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-45">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c0392b"
                    strokeWidth="2"
                  >
                    {icon}
                  </svg>
                </span>

                <Input type={type} name={name} placeholder={placeholder} />
              </div>
            </div>
          ))}
        <Button type="submit">{loading ? <Loading/> : "Ro'yxatdan o'tish"}</Button>
  
        <p className="text-center mt-7 text-[0.82rem] text-[#3a4050]">
          Already have an account?{" "}
          <Link to={PATH.login} className="text-[#e67e22] no-underline cursor-pointer hover:underline">Sign in →</Link>
        </p>
      </div>
    </form>
  </div>
  );
};

export default Register;
