import React, { useEffect, useState } from "react";
import { CategoryIcon, ProductIcon, UsersIcon } from "../../assets/icons";
import { Loading, PATH } from "../../components";
import { useNavigate } from "react-router-dom";
import instance from "../../hook";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/85">
    {children}
  </div>
);

const Home = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState<number[]>([])
  const products = () => instance().get("/products")
  const category = () => instance().get("/categories")
  const users = () => instance().get("/users")
  useEffect(() => {
    Promise.all([products(), category(), users()]).then(res => setResults([res[0].data.length, res[1].data.length, res[2].data.length]))
  }, [])
  const stats = [
    {
      label: "Mahsulotlar",
      value: results[0],
      icon: <ProductIcon w={20} h={20} />,
      path: PATH.products
    },
    {
      label: "Kategoriya",
      value: results[2],
      icon: <CategoryIcon w={20} h={20} />,
      path: PATH.category
    },
    {
      label: "Foydalanuvchilar",
      value: results[1],
      icon: <UsersIcon w={20} h={20} />,
      path: PATH.users
    }
  ];
  return (
    <section className="p-4 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] h-[95%]">
      <div className="absolute inset-0 -z-10 bg-[#0b1220]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_15%,rgba(255,115,0,0.14),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.10),transparent_55%)]" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-white text-lg font-semibold">Asosiy sahifa</h2>
            <p className="text-white/50 text-sm">Statistikalar</p>
          </div>
          <div className="h-1 w-28 rounded-full bg-linear-to-r from-orange-500 to-pink-500 opacity-70" />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div onClick={() => navigate(s.path)} key={s.label} className="cursor-pointer rounded-3xl hover:bg-white/10 duration-300 bg-white/5 ring-1 ring-white/10 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.25)]" >
              <div className="flex items-center justify-between">
                <IconBox>{s.icon}</IconBox>
                <span className="text-white/35 text-xs">hammasi</span>
              </div>
              <div className="mt-4">
                <p className="text-white/55 text-sm">{s.label}</p>
                <p className="mt-1 text-white text-3xl font-semibold tracking-tight">
                  {s.value ? s.value : <Loading />}
                </p>
                <div className="mt-3 h-0.5 w-12 rounded-full bg-linear-to-r from-orange-500 to-pink-500 opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home
