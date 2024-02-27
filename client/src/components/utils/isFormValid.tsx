interface FormFieldError {
  message: string;
  type?: string;
}

interface FormErrors {
  [fieldName: string]: FormFieldError;
}

export const isFormInvalid = (err: FormErrors) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
