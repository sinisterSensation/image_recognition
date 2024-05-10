import React, { useState } from "react";
import "./assets/style.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);

  return (
    <div className="App">
      <Navbar switchChecked={switchChecked} />
      <Sidebar />
    </div>
  );
}

export default App;
