import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

function App() {

  console.log("Hey... Run help() command to get help");
  
  return (
    <div>
      <BrowserRouter>
        <div className="bg-red-600 py-10 text-white text-center font-bold text-2xl">
          <h1>Only Friends</h1>
        </div>

        <div className="py-20">
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
