import { FC, PropsWithChildren } from "react";
import { Header } from "../Header/Header";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
