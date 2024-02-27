import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { isFormInvalid } from "../utils/isFormValid";
import { findInputError } from "../utils/inputError";
import { useEffect } from "react";

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  labelText: string;
  setSuccess: (value: boolean) => void;
};

const InputDefault = ({
  id,
  type,
  placeholder,
  labelText,
  setSuccess,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  const validationRules = {
    required: {
      value: true,
      message: "required",
    },
  };

  useEffect(() => {
    if (isInvalid) {
      setSuccess(false);
    }
  }, [isInvalid, setSuccess]);

  return (
    <div className="flex flex-col w-56">
      <label htmlFor={id}>{labelText}</label>
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={
              (inputError as { error: { message: string } }).error.message
            }
            key={(inputError as { error: { message: string } }).error.message}
          />
        )}
      </AnimatePresence>
      <input
        id={id}
        className="border-2 rounded-md p-1"
        type={type}
        placeholder={placeholder}
        {...register(id, validationRules)}
      />
    </div>
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

export default InputDefault;
