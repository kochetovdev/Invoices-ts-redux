import { FieldValue } from "react-hook-form";

const ErrorMessage = ({ children }: FieldValue<any>) => {
  if (!children) return null;

  return <article className="text-red-500 text-sm">{children}</article>;
};

export default ErrorMessage;
