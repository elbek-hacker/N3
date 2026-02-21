import { useContext } from "react";
import { AuthRoute, DashboardRoute } from "./routes";
import { Context } from "./context/Context";

const App = () => {
  console.log("App pagedaman!")
  const { token } = useContext(Context);
  console.log(token)
  return token ? <DashboardRoute /> : <AuthRoute />;
};

export default App;

