import React, { useEffect, useState } from "react";
import Button from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import {Modal} from "../../molecules/modal";

const TermsModal = () => {
  const [show, setShow] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (
        sessionStorage.getItem(`terms-terms`) !== "hide"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(`terms-terms`, "hide");
    setShow(false);
  };

  const handleCheckBox = (evt: any) => {
    console.log(evt, "checkb-x");

    setCheckAll((state) => !state);
    setCheckBox1(evt);
    setCheckBox2(evt);
    setCheckBox3(evt);
  };

  return (
      <Modal
          show={show}
          onClose={handleClose}
          header="Terms & Privacy policy"
          className="termsModal"
          staticBackDrop={true}
          closeButton={null}
      >
        <div className="content max-h-[400px] overflow-auto px-8 mb-4">
          <p className={"mb-4 text-white-300 text-sm"}>
            <span className={"font-medium"}>Important Disclaimer:</span> Before
            proceeding, please confirm your agreement to the terms by checking the
            boxes below. If you do not agree, please leave the website:
          </p>
          <div className={"flex items-center mb-3"}>
            <div
                className={"mr-4"}
                onClick={() => {
                  setCheckBox1((state) => !state);
                  if (checkAll) {
                    setCheckAll(false);
                  }
                }}
            >
              {checkBox1 ? (
                  <Icon
                      viewClass="arrow-right !w-[20px] !h-[20px]"
                      iconName="checkbox-square"
                  />
              ) : (
                  <div
                      className={
                        "w-[20px] h-[20px] border-[#787878] border-[2px] rounded-[2px]"
                      }
                  />
              )}
            </div>
            <p className={" text-light-500 text-xsm"}>
              I have read and understood, and hereby agree to be legally bound as
              a ‘User’ to all the terms contained in the{" "}
              <a
                  href="https://pstake.finance/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline text-blue-500"}
              >
                Terms and Conditions
              </a>
              (including the{" "}
              <a
                  href="https://pstake.finance/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline text-blue-500"}
              >
                Privacy Policy
              </a>
              ) without qualification.
            </p>
          </div>
          <div className={"flex items-center mb-3"}>
            <div
                className={"mr-4"}
                onClick={() => {
                  setCheckBox2((state) => !state);
                  if (checkAll) {
                    setCheckAll(false);
                  }
                }}
            >
              {checkBox2 ? (
                  <Icon
                      viewClass="arrow-right !w-[20px] !h-[20px]"
                      iconName="checkbox-square"
                  />
              ) : (
                  <div
                      className={
                        "w-[20px] h-[20px] border-[#787878] border-[2px] rounded-[2px]"
                      }
                  />
              )}
            </div>
            <p className={" text-light-500 text-xsm"}>
              I declare that I am not an Excluded Person as defined in the{" "}
              <a
                  href="https://pstake.finance/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline text-blue-500"}
              >
                Terms and Conditions.
              </a>
            </p>
          </div>
          <div className={"flex items-center mb-3"}>
            <div
                className={"mr-4"}
                onClick={() => {
                  setCheckBox3((state) => !state);
                  if (checkAll) {
                    setCheckAll(false);
                  }
                }}
            >
              {checkBox3 ? (
                  <Icon
                      viewClass="arrow-right !w-[20px] !h-[20px]"
                      iconName="checkbox-square"
                  />
              ) : (
                  <div
                      className={
                        "w-[20px] h-[20px] border-[#787878] border-[2px] rounded-[2px]"
                      }
                  />
              )}
            </div>
            <p className={" text-light-500 text-xsm"}>
              I agree that my use and continued use of this site is subject to my
              continued agreement to the prevailing{" "}
              <a
                  href="https://pstake.finance/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline text-blue-500"}
              >
                Terms and Conditions
              </a>{" "}
              (which may change from time to time) and will apply to all actions I
              take on the site without requiring my confirmation in each specific
              instance.
            </p>
          </div>
          <div className={"flex items-center mb-3"}>
            <div
                className={"mr-4"}
                onClick={() =>
                    handleCheckBox(!(checkBox1 && checkBox2 && checkBox3))
                }
            >
              {checkBox1 && checkBox2 && checkBox3 ? (
                  <Icon
                      viewClass="arrow-right !w-[20px] !h-[20px]"
                      iconName="checkbox-square"
                  />
              ) : (
                  <div
                      className={
                        "w-[20px] h-[20px] border-[#787878] border-[2px] rounded-[2px]"
                      }
                  />
              )}
            </div>
            <p className={" text-light-500 text-xsm"}>Select All</p>
          </div>
        </div>
        <div className="text-center mb-4">
          <Button
              className="button md:py-2 md:text-sm m-auto !w-[250px]"
              type="primary"
              size="medium"
              disabled={!checkBox1 || !checkBox2 || !checkBox3}
              onClick={handleClose}
              content="Proceed"
          />
        </div>
      </Modal>
  );
};

export default TermsModal;
