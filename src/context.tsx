import React, { ComponentProps, FC } from "react";
import { CartContextProvider } from "./modules/cart/context";
import { ProductContextProvider } from "./modules/product/context";
import { OrderContextProvider } from "./modules/order/context";
import { SignInContextProvider } from "./modules/auth/login/context";
import { ForgetPasswordContextProvider } from "./modules/auth/forgetPassword/context";
import { ResetPasswordContextProvider } from "./modules/auth/resetPassword/context";
import { SignUpContextProvider } from "./modules/auth/signup/context";

export const combineContext = (...components: FC[]): FC<any> => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      return ({ children }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

const providers = [
  CartContextProvider,
  ProductContextProvider,
  OrderContextProvider,
  SignInContextProvider,
  ForgetPasswordContextProvider,
  ResetPasswordContextProvider,
  SignUpContextProvider,
] as any;

export const AppContextProvider = combineContext(...providers);
