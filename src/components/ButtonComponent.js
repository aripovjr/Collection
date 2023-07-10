import React from "react";
import { Button } from "react-bootstrap";
function ButtonComponent({ link, variant, onClick, text, icon }) {
  return (
    <Button href={link} variant={variant} onClick={onClick}>
      {icon}
      {text}
    </Button>
  );
}

export default ButtonComponent;
