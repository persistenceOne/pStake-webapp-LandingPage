import React from "react";
import Tooltip from "rc-tooltip";
import { Icon } from "../atoms/icon";

const Footer = () => {
  const socialList = [
    {
      url: "https://twitter.com/pStakeFinance",
      iconName: "twitter-logo",
      tooltip: "twitter"
    },
    {
      url: "https://t.me/pstakefinance",
      iconName: "telegram-plane",
      tooltip: "telegram"
    },
    {
      url: "https://blog.pstake.finance/",
      iconName: "medium-m",
      tooltip: "medium"
    },
    {
      url: "https://discord.com/invite/2ek5rUyT8x",
      iconName: "discord",
      tooltip: "discord"
    }
  ];
  return (
    <div className={`socialLinks flex pb-10 px-4 pt-6 justify-center -md:hidden`}>
      {socialList.map((item, index) => (
        <Tooltip placement="bottom" overlay={item.tooltip} key={index}>
          <a
            href={item.url}
            rel="noopener noreferrer"
            className="mr-4"
            target="_blank"
          >
            <Icon
              viewClass="w-[18px] h-[18px] fill-[#a6a6a6] hover:fill-[#FCFCFC]"
              iconName={item.iconName}
            />
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default Footer;
