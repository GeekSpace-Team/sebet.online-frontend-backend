import logo from "./logo.svg";
import "./App.css";
import SebedimContextProvider from './context/Sebedim';

import Routes from "./routes/routes";
function App() {
  
  return <SebedimContextProvider>
           <Routes />
      </SebedimContextProvider>
}

export default App;
