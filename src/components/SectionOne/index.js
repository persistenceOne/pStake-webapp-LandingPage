import React from "react";
import { useTranslation } from "react-i18next";
import "../SectionOne/index.css";
const SectionOne = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section className="section-2 bg-product product-padding" id="sectiontwo">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 stats">
              <div className="stats-section">
                <h2>$28.12M+</h2>
                <h6>{t("LIQUIDITYSTKASSETS")}</h6>
                <span className="vline"></span>
              </div>
              <div className="stats-section">
                <h2>5,107</h2>
                <h6>{t("NUMBEROFSTAKERS")}</h6>
                <span className="vline"></span>
              </div>
              <div className="stats-section">
                <h2>$49.05M+</h2>
                <h6>{t("VALUEOFSTKASSETS")}</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SectionOne;
