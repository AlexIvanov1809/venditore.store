import React from "react";
import { Route, Routes } from "react-router-dom";
import MarketPlace from "./layouts/marketPlace";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/common/navBar";
import AdminPanel from "./layouts/adminPanel";
import EditCoffeeItem from "./components/pages/coffeePages/editCoffeeItem";
import CreateCoffeeItem from "./components/pages/coffeePages/createCoffeeItem";
import CreateTeaItem from "./components/pages/teaPages/createTeaItem";
import EditTeaItem from "./components/pages/teaPages/editTeaItem";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/market/:store" element={<MarketPlace />} />
        <Route path="/adminPanel/:store" element={<AdminPanel />} />
        <Route
          path="/adminPanel/coffee/create"
          element={<CreateCoffeeItem />}
        />
        <Route path="/adminPanel/tea/create" element={<CreateTeaItem />} />
        <Route path="/adminPanel/coffee/:itemId" element={<EditCoffeeItem />} />
        <Route path="/adminPanel/tea/:itemId" element={<EditTeaItem />} />
        {/* <Route path="/login" exact element={<Login />} /> */}
        <Route path="/:type" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;