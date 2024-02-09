import React from "react";
import { Link } from "react-router-dom";
import { CustomLinkProps } from "../../models";
import "./custom-link.scss";

const styles = {
  themes: {
    def: "custom-link",
  },
};

export const CustomLink = ({
  path = "/",
  value = "Link",
  theme,
  state = "/",
}: // ...props
CustomLinkProps) => {
  return (
    <Link
      to={path}
      state={state}
      // @ts-expect-error but it works, there is no other way
      className={styles.themes[theme]}
      // {...props}
    >
      {value}
    </Link>
  );
};
