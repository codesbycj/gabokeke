import React from "react";
import { Loading } from "./components";
import { Home } from "./pages/Home";
import { Summary } from "./pages/Summary";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element= {<Summary />}/>
      </Routes>
    </div>
  );
};

export default App;
