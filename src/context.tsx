import React, { ComponentProps, FC } from "react";
import { CartContextProvider } from "./modules/cart/context";
import { ProductContextProvider } from "./modules/product/context";
import { OrderContextProvider } from "./modules/order/context";
import { SignInContextProvider } from "./modules/auth/login/context";
import { ForgetPasswordContextProvider } from "./modules/auth/forgetPassword/context";
import { ResetPasswordContextProvider } from "./modules/auth/resetPassword/context";
import { SignUpContextProvider } from "./modules/auth/signup/context";
import { CategoryContextProvider } from "./modules/category/context";
import { PaymentContextProvider } from "./modules/payment/context";

export const combineContext = (...components: FC[]): FC<any> => {
  const CombinedComponent = components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      const WrapperComponent: FC<any> = ({
        children,
      }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      // Assign a displayName to the WrapperComponent
      WrapperComponent.displayName = `Combined(${
        CurrentComponent.displayName || CurrentComponent.name || "Unknown"
      })`;

      return WrapperComponent;
    },
    ({ children }: any) => <>{children}</>
  );

  return CombinedComponent;
};

const providers = [
  CartContextProvider,
  ProductContextProvider,
  OrderContextProvider,
  SignInContextProvider,
  ForgetPasswordContextProvider,
  ResetPasswordContextProvider,
  SignUpContextProvider,
  CategoryContextProvider,
  PaymentContextProvider
] as any;

export const AppContextProvider = combineContext(...providers);
