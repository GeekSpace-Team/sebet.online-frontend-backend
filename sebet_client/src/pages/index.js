import { lazy } from "react";

export const NotFound = lazy(() => import("./404/404"));
export const Test = lazy(() => import("./test"));
export const Home = lazy(()=>import("./homepage/home"));
export const Arzanladysh = lazy(()=>import("./arzanladyshlar/arzanladysh"));
export const Login = lazy(()=>import("./login/login"));
export const ChangePassword = lazy(()=>import("./login/changePassword"));
export const ForgetPassword = lazy(()=>import("./login/forgetPassword"));
export const Signup = lazy(()=>import("./login/signup"));
export const About = lazy(()=>import("./about_us/about"));
export const Aragatnashyk = lazy(()=>import("./about_us/aragatnashtk"));
export const EltipBermek = lazy(()=>import("./about_us/eltipbermek"));
export const UlanyshDuzgunleri = lazy(()=>import("./about_us/ulanyshDuzgunleri"));
export const Brend = lazy(()=>import("./brendler/brend"));
export const Sebet = lazy(()=>import("./sebet/sebet"));
export const Sargyt = lazy(()=>import("./sargyt/sargyt"));
export const Profile = lazy(()=>import("./profile/profile"));
export const Hasabym = lazy(()=>import("./hasabym/hasabym"));
export const Products = lazy (()=>import("./products_components/productsComponents2"))


