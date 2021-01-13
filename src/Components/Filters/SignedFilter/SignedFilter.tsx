import * as React from "react";
import classnames from "classnames";
import "./SignedFilter.css";

interface propsType {
  signed: boolean,
  onChange: (signed: boolean) => void,
}

function SignedFilter(props: propsType) {
  const { signed, onChange } = props;

  return (
    <div className="signed-filter__container">
      <div className={classnames("signed-filter__button", {
        "signed-filter__button_active": !signed
      })}
        onClick={() => onChange(false)}
      >
        All
      </div>
      <div className={classnames("signed-filter__button", {
        "signed-filter__button_active": signed
      })}
        onClick={() => onChange(true)}
      >
        By me
      </div>
    </div>
  );
}

export { SignedFilter };