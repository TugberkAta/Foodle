import DarkModeSwitch from "./utilities/DarkModeSwitch";
import { LuDonut } from "react-icons/lu";

type HeaderProps = {
  setDisplayMode: React.Dispatch<React.SetStateAction<boolean>>;
  displayMode: boolean;
};

function Header({ setDisplayMode, displayMode }: HeaderProps) {
  return (
    <>
      <h1 className="p-2 absolute flex justify-center w-full ">
        <p
          className={`flex items-center font-mono font-extrabold text-2xl ${
            displayMode ? "text-black" : "text-white"
          }`}
        >
          F<LuDonut></LuDonut>
          <LuDonut></LuDonut>
          DLE
        </p>
        <DarkModeSwitch
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          styleChoices={"absolute top-3 right-3"}
        />
      </h1>
    </>
  );
}

export default Header;
