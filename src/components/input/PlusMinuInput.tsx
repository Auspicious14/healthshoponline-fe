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

      <div className="flex items-center">
        <Button
          className="text-primary  border-none text-lg font-medium "
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
          className={`w-8 h-8 mx-2 mt-2.5 rounded-full bg-primary text-white`}
          name="quantity"
          type="button"
          plusMinusInput={true}
        />
        <Button
          className="text-blue-600 border-none text-lg font-medium "
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
