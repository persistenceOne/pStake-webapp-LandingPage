import React, { useRef } from "react";
import Sidebar from "./index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { hideMobileSidebar } from "../../../store/reducers/sidebar";
import { useOnClickOutside } from "hooks";
import { useWindowSize } from "hooks";
import styles from "./styles.module.css";

const MobileSideBar = () => {
  const dispatch = useDispatch();
  const { show } = useSelector((state: RootState) => state.mobileSidebar);

  const closeHandler = () => {
    dispatch(hideMobileSidebar());
  };
  const { isMobile } = useWindowSize();

  const sideBarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sideBarRef, closeHandler);

  return (
    <div
      className={`${
        isMobile ? `${styles.mobileDropdownContainer} offCanvas` : ""
      } ${show ? "show" : "close"} w-[284px]`}
    >
      <div
        className={`${isMobile ? styles.mobileSidebarBackdrop : ""} backDrop`}
      />
      <div
        className={`${isMobile ? styles.mobileSidebar : ""}`}
        ref={sideBarRef}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default MobileSideBar;
