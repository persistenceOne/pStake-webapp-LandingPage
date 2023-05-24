import React from "react";
import { TabContentTypes } from "./types";

export const TabContent = ({
  activeTab,
  id,
  children,
  className,
}: TabContentTypes) => {
  return activeTab === id ? (
    <div className={`${className} tabContent`}>{children}</div>
  ) : null;
};
