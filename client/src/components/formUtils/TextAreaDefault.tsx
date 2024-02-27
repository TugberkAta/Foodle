import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { isFormInvalid } from "../utils/isFormValid";
import { findInputError } from "../utils/inputError";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type TextAreaDefaultProps = {
  id: string;
  labelText: string;
  setSuccess: (value: boolean) => void;
  setStringArray: (value: string[]) => void;
  stringArray: string[];
  textType: string;
};

const TextAreaDefault = ({
  id,
  labelText,
  setSuccess,
  setStringArray,
  stringArray,
  textType,
}: TextAreaDefaultProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [text, setText] = useState("");
  const [currentDisplayPage, setCurrentDisplayPage] = useState(0);

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  const validationRules = {
    validate: {
      notEmpty: (value: string) =>
        value.trim() === "" || `Don't forget to save your text`,
      firstTextNotEmpty: () =>
        stringArray.length > 0 ||
        `You need to have at least one ${textType} saved`,
    },
  };

  useEffect(() => {
    if (isInvalid) {
      setSuccess(false);
    }
  }, [isInvalid, setSuccess]);

  function onAdd() {
    //if we are not on the current page update the text
    if (currentDisplayPage < stringArray.length) {
      const updatedTexts = [...stringArray];
      updatedTexts[currentDisplayPage] = text.trim();
      setStringArray(updatedTexts);
      setCurrentDisplayPage(stringArray.length);
    } else {
      // add new text
      setStringArray([...stringArray, text.trim()]);
      setCurrentDisplayPage(stringArray.length + 1);
    }
    // Update the displayed text with an empty field
    setText("");
    // Update the react hook to inform the field is empty
    setValue(id, "", { shouldValidate: true });
  }

  function onDelete() {
    // Check if there's anything to delete.
    if (stringArray.length > 0) {
      // Create a new array without the current text.
      const updatedTexts = stringArray.filter(
        (_, index) => index !== currentDisplayPage
      );
      setStringArray(updatedTexts);

      const newDisplayPage =
        currentDisplayPage > 0 ? currentDisplayPage - 1 : 0; // Adjust the current display page if we're at the end of the array.
      setCurrentDisplayPage(newDisplayPage);
      // Update the displayed text to the new current page's text, or empty if none.
      setText(
        newDisplayPage < updatedTexts.length ? updatedTexts[newDisplayPage] : ""
      );
    }
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  // Function to handle the right-click event for pagination.
  function onRightClick() {
    setCurrentDisplayPage((prevCurrentDisplayPage) => {
      const nextPage = prevCurrentDisplayPage + 1; // Calculate the next page number based on the current page.
      // Check if the next page is within the bounds of the stringArray.
      if (nextPage < stringArray.length) {
        setText(stringArray[nextPage]); // Update the text content to the content of the next page.
        return nextPage;
      } else if (nextPage === stringArray.length) {
        // If navigating to a page beyond the last content page, clear the text.
        setText("");
        return nextPage;
      }
      return prevCurrentDisplayPage;
    });
  }

  // Function to handle the left-click event for pagination.
  function onLeftClick() {
    setCurrentDisplayPage((prevCurrentDisplayPage) => {
      const prevPage = prevCurrentDisplayPage - 1; // Calculate the next page number based on the current page.
      // Check if the next page is within the bounds of the stringArray.
      if (prevPage >= 0) {
        setText(stringArray[prevPage]); // Update the text content to the content of the next page.
        return prevPage;
      }
      return prevCurrentDisplayPage;
    });
  }

  return (
    <>
      <div className="flex flex-col w-96 text-sm">
        <div className="w-full flex justify-between mb-1 items-center">
          <label htmlFor={id}>{labelText}</label>
          <div className="flex gap-3 items-center">
            <p>
              {" "}
              Viewing {textType} {currentDisplayPage + 1}
            </p>
            <button onClick={onLeftClick}>
              <FaArrowLeft></FaArrowLeft>
            </button>
            <button onClick={onRightClick}>
              <FaArrowRight></FaArrowRight>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {" "}
          {isInvalid && (
            <InputError
              message={
                (inputError as { error: { message: string } }).error.message
              }
              key={(inputError as { error: { message: string } }).error.message}
            />
          )}
        </AnimatePresence>
        <textarea
          id={id}
          className="border-2 rounded-md p-1 min-h-24 max-h-96"
          value={text}
          onInput={handleMessageChange}
          {...register(id, validationRules)}
        />
        <div className="flex w-full justify-between mt-1 items-center">
          <div className="flex gap-3 items-center">
            <button onClick={onDelete}>
              <MdDelete className="fill-red-500 h-5 w-5"></MdDelete>
            </button>
            <p>Delete current {textType}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p>
              {textType} count is {stringArray.length}
            </p>
            <button onClick={onAdd} className="h-5 w-5">
              <FaPlus></FaPlus>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputError = ({ message }: { message: string }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 max-w-56 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default TextAreaDefault;
