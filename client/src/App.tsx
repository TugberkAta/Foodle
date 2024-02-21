import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import Header from "./components/Header";

function App() {
  const [displayMode, setDisplayMode] = useState<boolean>(
    localStorage.getItem("displayMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode.toString());
  }, [displayMode]);

  return (
    <>
      <Header
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      ></Header>
      <MainPage displayMode={displayMode}></MainPage>
    </>
  );
}

export default App;
