import { FormProvider, useForm } from "react-hook-form";
import InputDefault from "../formUtils/InputDefault.tsx";
import { useState } from "react";
import TextAreaDefault from "../formUtils/TextAreaDefault.tsx";
import DarkModeSwitch from "../utilities/DarkModeSwitch.tsx";

type CreateFoodProps = {
  displayMode: boolean;
  setDisplayMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateFood = ({ displayMode, setDisplayMode }: CreateFoodProps) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [stepsArray, setStepsArray] = useState<string[]>([]);
  const [triviaArray, setTriviaArray] = useState<string[]>([]);

  const onSubmit = methods.handleSubmit(async (data) => {
    const formData = {
      ...data,
      foodStepsArray: stepsArray,
      foodTriviaArray: triviaArray,
    };
    try {
      console.log(formData);
      const response = await fetch("http://localhost:3000/food/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess(true);
        methods.reset();
        setStepsArray([]);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    methods.reset();
    window.location.href = "/create-food";
  });

  return (
    <>
      <DarkModeSwitch
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        styleChoices={"absolute top-3 right-3"}
      ></DarkModeSwitch>
      <div
        className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover h-full ${
          displayMode
            ? "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/dark-mode.svg')]"
            : "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/light-mode.svg')]"
        }`}
      >
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="flex flex-col items-center justify-center gap-6 shadow-md px-24 py-6 rounded-md border-t-4 rounded-t-none border-cyan-400  bg-slate-100 mt-16 mb-16">
              <h1 className="flex justify-center text-2xl font-semibold">
                CREATE FOOD
              </h1>
              <div className="grid grid-rows-2 grid-cols-2 gap-4">
                <InputDefault
                  id="foodName"
                  type="input"
                  placeholder="Name of food..."
                  labelText="Name of food"
                  setSuccess={setSuccess}
                ></InputDefault>
                <InputDefault
                  id="foodCalories"
                  type="input"
                  placeholder="Food Calories..."
                  labelText="Food Calories"
                  setSuccess={setSuccess}
                ></InputDefault>
                <InputDefault
                  id="foodRegion"
                  type="input"
                  placeholder="Region..."
                  labelText="Food Region"
                  setSuccess={setSuccess}
                ></InputDefault>
                <InputDefault
                  id="foodNutrient"
                  type="input"
                  placeholder="Nutrient Info..."
                  labelText="Nutrient Info"
                  setSuccess={setSuccess}
                ></InputDefault>
                <InputDefault
                  id="wikiLink"
                  type="input"
                  placeholder="Wikipedia link..."
                  labelText="Wikipedia link"
                  setSuccess={setSuccess}
                ></InputDefault>
              </div>
              <TextAreaDefault
                setStringArray={setTriviaArray}
                stringArray={triviaArray}
                id="foodTriviaArray"
                labelText="Trivia"
                setSuccess={setSuccess}
                textType="Trivia"
              ></TextAreaDefault>
              <TextAreaDefault
                setStringArray={setStepsArray}
                stringArray={stepsArray}
                id="foodStepsArray"
                labelText="Cooking steps"
                setSuccess={setSuccess}
                textType="Step"
              ></TextAreaDefault>
              <div className="flex flex-col gap-3 items-center ">
                <InputDefault
                  id="foodImg"
                  type="input"
                  placeholder="Url..."
                  labelText="Image Url"
                  setSuccess={setSuccess}
                ></InputDefault>
                <InputDefault
                  id="imgAlt"
                  type="input"
                  placeholder="Description..."
                  labelText="Image Description"
                  setSuccess={setSuccess}
                ></InputDefault>

                <div className="flex justify-center w-56">
                  {success && (
                    <p className="font-semibold text-green-500">
                      Post sent successfully
                    </p>
                  )}
                  {!success && <></>}
                </div>
                <button
                  className=" w-10/12 p-2 bg-blue-500 text-white rounded-sm"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreateFood;
