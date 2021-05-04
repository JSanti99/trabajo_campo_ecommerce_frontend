import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import PricingFaqs from "./PricingFaqs";
import PricingCards from "./PricingCards";
import PricingTrial from "./PricingTrial";
import PricingHeader from "./PricingHeader";

import "@styles/base/pages/page-pricing.scss";

const Pricing = () => {
  const [data, setData] = useState(null),
    [faq, setFaq] = useState(null),
    [duration, setDuration] = useState("monthly");

  useEffect(() => {
    const planData = {
      title: "Comerciante",
      img: "/static/media/Pot1.430ec954.svg",
      monthlyPrice: 11900,
      planBenefits: [
        "Comercio de productos",
        "Configuracion de tienda",
        "Visibilidad",
      ],
      popular: true,
      subtitle: "Para pequeñas y medianas empresas",
      yearlyPlan: {
        perMonth: 7900,
        totalAnnual: 94.8,
      },
    };
    setData([planData]);
  }, []);

  return (
    <div id="pricing-table">
      <PricingHeader duration={duration} setDuration={setDuration} />
      {data !== null ? (
        <Fragment>
          <PricingCards data={data} duration={duration} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default Pricing;
