import { ErrorMessage, useField } from "formik";
import React, { useEffect } from "react";
import { ApTextInput } from "./TextInput";
import { Button } from "antd";

interface IProps {
  label?: string;
  name: string;
  disable?: boolean;
  inputClassName?: string;
  btnClassName?: string;
  onChange?: (value: number) => void;
}

export const ApPlusMinusInput: React.FC<IProps> = (props) => {
  const { label, name, btnClassName, inputClassName, onChange, disable } =
    props;
  const [field, meta, { setValue }] = useField(name);

  useEffect(() => {
    if (onChange) onChange(+field.value);
  }, [field.value]);
  return (
    <div className="mb-5">
      <label className="label block mb-2" htmlFor="email">
        {label}
      </label>

      <div className="flex ">
        <Button
          className="  text-blue-600 text-base font-medium "
          htmlType="button"
          onClick={() => {
            if (field.value && field.value > 1) {
              setValue(--field.value);
            }
          }}
        >
          -
        </Button>
        <ApTextInput
          className={`w-16 h-7 rounded-sm p-0 relative  bg-white `}
          name="quantity"
          type="button"
        />
        <Button
          className="  text-blue-600 text-base font-medium "
          htmlType="button"
          // title="+"
          onClick={() => {
            if (field.value) {
              setValue(++field.value);
            }
          }}
          disabled={disable}
        >
          +
        </Button>
      </div>

      <ErrorMessage className="danger" name={name} component="div" />
    </div>
  );
};
