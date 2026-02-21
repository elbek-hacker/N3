import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../components";
import { CategoryIcon, HomeIcon, ProductIcon, UsersIcon } from "../assets/icons";

const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="grid size-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80">
    {children}
  </span>
);
const Sitebar = () => {
  const nav = [
    {
      label: "Asosiy",
      href: PATH.home,
      icon: <HomeIcon w={18} h={18}/>,
    },
    {
      label: "Mahsulotlar",
      href: PATH.products,
      icon: <ProductIcon w={18} h={18}/>,
    },
    {
      label: "Kategoriyalar",
      href: PATH.category,
      icon: <CategoryIcon w={18} h={18}/>,
    },
    {
      label: "Foydalanuvchilar",
      href: PATH.users,
      icon: <UsersIcon w={18} h={18}/>,
    },
  ];

  return (
    <aside className="relative h-screen w-[22%] p-4">
      <div className="absolute inset-0 -z-10 bg-[#0b1220]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />

      <div className="h-full rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 shadow-[0_10px_25px_rgba(255,80,0,0.25)]">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold tracking-wide">Admin</p>
              <p className="text-white/55 text-xs">Admin info</p>
            </div>
          </div>
          <div className="mt-5 h-px bg-white/10" />
        </div>
        <nav className="px-3 pb-4">
          <p className="px-2 pb-2 text-xs font-medium tracking-widest text-white/40">
            MENU
          </p>

          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <NavLink to={item.href} className={["group hover:bg-white/6 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition","ring-1 ring-transparent hover:ring-white/10"].join(" ")}
                >
                  <div className={["transition"].join(" ")}>
                    <NavIcon>{item.icon}</NavIcon>
                  </div>
                  <div className="flex-1 title-wrapper">
                    <p className={["text-sm nav-title font-medium","text-white/75 group-hover:text-white"].join(" ")}>
                      {item.label}
                    </p>
                    <div className="mt-1 h-0.5 w-0 rounded-full bg-linear-to-r from-orange-500 to-pink-500 opacity-0 transition-all duration-300 group-hover:w-10 group-hover:opacity-100" />
                  </div>
                  <span className={["size-2 dots rounded-full transition bg-white/10 group-hover:bg-white/20"].join(" ")}/>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
export default Sitebar
