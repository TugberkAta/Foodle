type MainPageProps = {
  displayMode: boolean;
};

function MainPage({ displayMode }: MainPageProps) {
  return (
    <>
      <div
        className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
          displayMode
            ? "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/dark-mode.svg')]"
            : "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/light-mode.svg')]"
        }`}
      />
    </>
  );
}

export default MainPage;
