import React from "react";
import { useLinkClickHandler } from "react-router-dom";

interface LinkProps {
  isExternal?: boolean;
  href: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}

const Link = (props: LinkProps) => {
  const { isExternal, href, children, onClick, ...rest } = props;

  let handleClick = useLinkClickHandler(href);
  return (
    <a
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
    >
      {children}
    </a>
  );
};
export default Link;
