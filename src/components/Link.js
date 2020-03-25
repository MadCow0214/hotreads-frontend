import React from "react";
import PropTypes from "prop-types";
import { Link as ReactLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const CustomLink = props => {
  const { children, underline, color, ...others } = props;
  return (
    <Link {...others} component={ReactLink} color={color} underline={underline}>
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  underline: PropTypes.string
};

CustomLink.defaultProps = {
  color: "inherit",
  underline: "none"
};

export default CustomLink;
