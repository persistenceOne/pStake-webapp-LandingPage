import React from "react";
import Footer from "../organisms/Footer";

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
    <div className="appLayout grid gap-6 md:block">
      <div className={`mainContainer` + className}>{children}</div>
      <Footer />
    </div>
  );
};
