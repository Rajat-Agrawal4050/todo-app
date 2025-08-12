import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import About from "./components/About";
import Home from "./components/Home";
import NoteContext from "./context/NoteContext";

import { useState } from "react";

function App() {

  const [all_data, setData] = useState([]);
 
  return (
    <>
  <NoteContext.Provider value={{all_data, setData}}>

      <Routes>
  
        <Route exact path="/todo-app/" element={<Home />} />
        <Route exact  path="/todo-app/details/:itemId" element={<Details />} />
        <Route exact  path="/todo-app/about/" element={<About />} />
      </Routes>
      </NoteContext.Provider>
    </>
  );
}

export default App;
