import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect } from "react";

interface IProps {
  label?: string;
  type: string;
  name: string;
  plusMinusInput?: boolean;
  className?: string;
  placeHolder?: string;
  sideLabel?: string;
  // onChange?:(value:string)=>void;
  props?: {
    [x: string]: any;
  };
  containerClass?: string;
}

export const ApTextInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeHolder,
  containerClass,
  sideLabel,
  plusMinusInput = false,
  ...props
}) => {
  const [field, meta] = useField(name);

  useEffect(() => {}, [field]);

  return (
    <div
      // style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}
      className={`mb-[10] flex flex-col ${containerClass}`}
    >
      {label && <label>{label}</label>}
      {type == "textarea" ? (
        <textarea
          className={`w-full p-4 mb-2 bg-stone-50 border ${className}`}
          {...field}
          {...props}
          name={name}
          rows={4}
          placeholder={placeHolder}
        ></textarea>
      ) : (
        <Field
          type={type}
          {...field}
          {...props}
          name={name}
          className={
            plusMinusInput === true
              ? `mb-2 border-none ${className}`
              : `w-full mb-2 border-none ${className}`
          }
          placeholder={placeHolder}
        />
      )}

      <ErrorMessage className="text-red-500" name={name} component="div" />
    </div>
  );
};
