import React from "react";
import Sidebar from "../organisms/sidebar";

export const PageTemplate = ({
  children,
  className,
  title
}: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  return (
    <div className="flex md:block bg-body-bg">
      <Sidebar />
      <div
        className={
          "mainContainer flex-1 h-screen overflow-auto bg-no-repeat pb-4"
        }
      >
        {children}
      </div>
    </div>
  );
};
