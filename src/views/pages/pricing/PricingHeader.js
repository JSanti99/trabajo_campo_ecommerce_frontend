import { duration } from "moment";
import { CustomInput } from "reactstrap";

const PricingHeader = ({ duration, setDuration }) => {
  const onChange = (e) => {
    if (e.target.checked) {
      setDuration("yearly");
    } else {
      setDuration("monthly");
    }
  };

  return (
    <div className="text-center">
      <h1 className="mt-5">Planes</h1>
      <br></br>
      {/* <div className="d-flex align-items-center justify-content-center mb-5 pb-50">
        <h6 className="mr-1 mb-0">Monthly</h6>
        <CustomInput
          id="plan-switch"
          type="switch"
          checked={duration === "yearly"}
          onChange={onChange}
        />
        <h6 className="ml-50 mb-0">Annually</h6>
      </div> */}
    </div>
  );
};

export default PricingHeader;
