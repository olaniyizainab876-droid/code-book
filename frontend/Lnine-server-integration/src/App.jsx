import React from "react";
import { Footer, Header } from "./Components"

import { Homepage } from "./Pages";
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
