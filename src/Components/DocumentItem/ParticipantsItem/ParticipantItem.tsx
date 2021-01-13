import * as React from "react";
import classnames from "classnames";
import { DocumentParticipant } from "../../../data";
import "./ParticipantItem.css";

interface propsType {
  participant: DocumentParticipant
}

function ParticipantItem(props: propsType) {
  const { participant: { firstname, lastname, signedDate } } = props;
  const isSigned = !!signedDate;

  return (
    <div className={classnames({
      "participant-item__signed": isSigned,
    })}>
      {`${firstname} ${lastname}`}
    </div>
  );
}

export { ParticipantItem };