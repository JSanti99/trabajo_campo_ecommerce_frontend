import React, { useEffect } from "react";

const ButtonEpayco = ({ description, amount, taxBase, tax }) => {
  useEffect(() => {
    const button = document.querySelector("#button-epayco");
    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = "https://checkout.epayco.co/checkout.js";
    script.setAttribute("data-epayco-key", "323b2dcf18b7ba6732292fe5b617f3ec");
    script.setAttribute("class", "epayco-button");
    script.setAttribute("data-epayco-amount", amount);
    script.setAttribute("data-epayco-tax", "" + tax);
    script.setAttribute("data-epayco-tax-base", "" + taxBase);
    script.setAttribute("data-epayco-name", "qwdqw");
    script.setAttribute("data-epayco-description", "" + description);
    script.setAttribute("data-epayco-currency", "cop");
    script.setAttribute("data-epayco-country", "CO");
    script.setAttribute("data-epayco-test", "true");
    script.setAttribute("data-epayco-external", "false");
    script.setAttribute(
      "data-epayco-response",
      "http://localhost:3000/epayco/confirmation"
    );
    script.setAttribute("data-epayco-confirmation", "");
    script.setAttribute(
      "data-epayco-button",
      "https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn1.png"
    );
    form.appendChild(script);
    button.appendChild(form);
    return () => {
      button.removeChild(form);
    };
  }, []);
  return <div id="button-epayco"></div>;
};

export default ButtonEpayco;
