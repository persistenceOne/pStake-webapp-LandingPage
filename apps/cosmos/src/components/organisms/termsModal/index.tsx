import React, { useEffect, useState } from "react";
import { Button, Modal } from "ui";

const TermsModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("terms") === "disabled") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("terms", "disabled");
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      header="Terms & Privacy policy"
      className="termsModal"
      staticBackDrop={true}
      closeButton={false}
    >
      <div className="content max-h-[400px] overflow-auto">
        <p>
          pSTAKE is a liquid staking solution protocol that unlocks the true
          potential of PoS tokens by unlocking liquidity of staked assets. These
          terms of use and conditions herein by reference (“{" "}
          <a
            href="https://pstake.finance/terms"
            target="_blank"
            rel="noreferrer"
            className="text-[#3e73f0]"
          >
            <b>Terms</b>
          </a>
          ”) govern your access to and use of the staking protocols as available
          on the official website and app. You must read the Terms carefully. By
          accessing, browsing or otherwise using the Interface, or by
          acknowledging agreement to the Terms on the Interface, you agree that
          you have read, understood and accepted all of the Terms and our
          Privacy Policy (the “
          <a
            href="https://pstake.finance/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-[#3e73f0]"
          >
            <b>Privacy Policy</b>
          </a>
          ”), which is incorporated by reference into the Terms.
          <span>
            THE TERMS CONTAIN IMPORTANT INFORMATION, INCLUDING A BINDING
            ARBITRATION PROVISION AND A CLASS ACTION WAIVER, BOTH OF WHICH
            IMPACT YOUR RIGHTS AS TO HOW DISPUTES ARE RESOLVED.
          </span>
        </p>
        <p>
          The Privacy Policy details out how PSTAKE TECHNOLOGIES, handles the
          personal data of individuals/ corporates (referred to as “you”,
          “your”) with regards to accessing and using the website, application
          (referred to as “app”) and related services as available at{" "}
          <a
            href="https://pstake.finance/"
            target="_blank"
            rel="noreferrer"
            className="text-[#3e73f0]"
          >
            https://pstake.finance/
          </a>{" "}
          (“The Website”). PSTAKE TECHNOLOGIES (referred to as the “
          <b>Company”</b>, “<b>we</b>”, “<b>our</b>”, “<b>us</b>”) is the
          controller for your personal data within the scope of this Privacy
          Policy. The Company decides “why” and “how” your personal data is
          processed in connection with the Staking Protocols & Services. This
          Privacy Policy is a part of the Terms of Use which is incorporated in
          this Privacy Policy by way of reference. By using this Staking
          Protocols & Services and accessing the website and app, you agree to
          the terms and conditions of this Privacy Policy and consent to our use
          and disclosure of information provided by you in the manner described
          in this Privacy Policy. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY,
          PLEASE DO NOT USE THIS WEBSITE and APP.
          <span>
            We reserve the right to revise this Privacy Policy and/or update the
            Website and App. Please check this page from time to time to take
            notice of any changes we make.
          </span>
        </p>
        <p>
          It can take upto 10 mins for assets to reflect. If the assets don’t
          reflect even after 10 mins, kindly ‘Raise a ticket’ and we will get
          back to you within 24 hours.
        </p>
        <p>
          THE pSTAKE FINANCE PROTOCOL IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND
          WITHOUT WARRANTIES OF ANY KIND.
        </p>
      </div>
      <div className="text-center">
        <Button
          className="button md:py-2 md:text-sm m-auto"
          type="primary"
          size="large"
          disabled={false}
          onClick={handleClose}
          content="Accept & Continue"
        />
      </div>
    </Modal>
  );
};

export default TermsModal;
