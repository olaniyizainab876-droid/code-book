import React from "react";
import { Footer, Header } from "./Components/Index"

import { Homepage } from "./Pages/Index";
import AllRoutes from "./Routes/Allroutes";



const App = () => {
  return (
    <div className="App dark:bg-dark">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App
