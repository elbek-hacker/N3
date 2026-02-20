import toast from "react-hot-toast";
import instance from "../hook";
import { PATH } from "../components";
import type { RegisterDataType } from "../pages/Auth/Register";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

export const RegisterFn = (data:RegisterDataType, navigate:NavigateFunction, setLoading:Dispatch<SetStateAction<boolean>>)=> {
  instance().post("/users", data).then(() => {
      toast.success(`Muvaffaqqiyatli qo'shildi!👍🏻 ${data.name}`)
      setTimeout(() => navigate(PATH.login), 1000);
    }).catch(()=> toast.error("Xatolik bor!❌")).finally(()=> setLoading(false));
};

export const LoginFn = (data: {email: string, password: string}, setLoading:Dispatch<SetStateAction<boolean>>, setToken:Dispatch<SetStateAction<string>>, navigate: NavigateFunction)=> {
  instance().post("/auth/login", data).then((res)=>{
    toast.success("Muvaffaqqiyatli kirdingiz! 👍🏻")
    setTimeout(() => setToken(res.data.access_token), 1000);
    navigate(PATH.home);
  }).catch(()=> toast.error("Xatolik bor!❌")).finally(()=>setLoading(false))
}