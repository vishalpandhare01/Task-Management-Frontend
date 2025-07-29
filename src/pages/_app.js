import Authcomponent from "@/component/auth";
import { store } from "@/redux/sore";
import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
export default function App({ Component, pageProps }) {



  return (
    <Provider store={store}>
       <Authcomponent/>
      <Component {...pageProps} />
    </Provider>
  );
}
