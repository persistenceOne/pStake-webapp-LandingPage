import React from "react";
import pstakelogo from "../assets/pstakelogo.svg";
import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import Footer from "../components/Footer";

const homePage = () => {
  return (
    <React.Fragment>
      <div className="container-fluid p-0 text-center pt-5">
        <img src={pstakelogo} alt="logo" />
      </div>
      <div className="container">
        <div className="row">
          <SectionOne />
          <SectionTwo />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default homePage;
