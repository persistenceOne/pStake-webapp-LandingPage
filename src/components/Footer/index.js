import React from "react";
import "../Footer/index.css";

import Icon from "../../webpages/Icon";
import {
  PSTAKE_TWITTER_URL,
  PSTAKE_TELEGRAM_URL,
  PSTAKE_DISCORD_URL,
  PSTAKE_GITHUB_URL,
} from "../../constants/config";

const Footer = () => {
  return (
    <React.Fragment>
      <section className="footer-section">
        <div className="container">
          <div className="icon-list">
            <div className="icon-box">
              <a
                href={PSTAKE_TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon viewClass="social_icon_img" icon="twitter-logo" />
              </a>
            </div>
            <div className="icon-box">
              <a
                href={PSTAKE_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon viewClass="social_icon_ig" icon="telegram-plane" />
              </a>
            </div>
            <div className="icon-box">
              <a
                href={PSTAKE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Icon viewClass="social_icon_img" icon="github" />
              </a>
            </div>
            <div className="icon-box">
              <a
                href={PSTAKE_DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Icon viewClass="social_icon_img" icon="discord" />
              </a>
            </div>
            <div className="icon-box">
              <span>&#8226;&nbsp;Powered By Persistence</span>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Footer;
