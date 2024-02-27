import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import CreateFood from "./components/foodCrud/CreateFood";

function App() {
  const [displayMode, setDisplayMode] = useState<boolean>(
    localStorage.getItem("displayMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode.toString());
  }, [displayMode]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
              ></Header>
              <MainPage displayMode={displayMode}></MainPage>
            </>
          }
        />
        <Route
          path="/create-food"
          element={
            <>
              <CreateFood
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
              ></CreateFood>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
