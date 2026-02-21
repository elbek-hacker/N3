import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Loading, Modal, PATH } from "../components";
import toast from "react-hot-toast";
import { ArrowIcon } from "../images";

const Header = () => {

  const {setToken} = useContext(Context)
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [logOutModal, setLogOutModal] = useState<boolean>(false)
  const route = useLocation()

  function handleLogOut(){
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLogOutModal(false)
      setToken("")
      navigate(PATH.home)
      toast.success("Chiqib ketdingiz!")
    }, 1000);
  }

  return (
    <header className="sticky z-50 top-0 w-full px-4 py-4">
      <div className="absolute inset-0 -z-10 bg-[#0b1220]" />
  
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_30%,rgba(255,115,0,0.14),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.10),transparent_55%)]" />
  
      <div className="mx-auto flex items-center justify-between rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] px-4 py-3">
        
        <div className="flex items-center gap-4">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowIcon />
          </IconButton>
  
          <div className="leading-tight">
            <p className="text-white text-[20px] font-semibold">
              {route.pathname === PATH.home && "Asosiy"}
              {route.pathname === PATH.category && "Kategoriyalar"}
              {route.pathname === PATH.products && "Mahsulotlar"}
              {route.pathname === PATH.users && "Foydalanuvchilar"}
            </p>
          </div>
        </div>
  
        <Button onClick={() => setLogOutModal(true)} extraClass="bg-gradient-to-r !w-[100px] cursor-pointer !from-orange-500 !to-pink-500 !shadow-[0_0_18px_rgba(255,80,0,0.35)]"
          type="button"
        >
          Chiqish
        </Button>
      </div>
  
      <Modal
        title="Tizimdan chiqish"
        open={logOutModal}
        onClose={() => setLogOutModal(false)}
      >
        <div className="flex gap-5">
          <Button
            showBg={true}
            onClick={() => setLogOutModal(false)}
            extraClass="!text-white/80 !bg-white/20 !ring-1 !ring-white/10 hover:!bg-white/10 hover:!text-white"
            type="button"
          >
            Bekor qilish
          </Button>
  
          <Button
            onClick={handleLogOut}
            extraClass="bg-gradient-to-r !from-orange-500 !to-pink-500 !shadow-[0_0_18px_rgba(255,80,0,0.35)] hover:!brightness-110 hover:!shadow-[0_0_30px_rgba(255,80,0,0.5)]"
            type="button"
          >
            {loading ? <Loading /> : "Chiqish"}
          </Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
