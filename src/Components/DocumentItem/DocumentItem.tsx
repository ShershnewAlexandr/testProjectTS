import * as React from "react";
import { Document } from "../../data";
import { formatDate } from "../../utils";
import { ParticipantItem } from "./ParticipantsItem/ParticipantItem";
import "./DocumentItem.css";

interface propsType {
  document: Document
}

function DocumentItem(props: propsType) {
  const { document: { title, signedDate, participants } } = props;
  const isSigned = !!signedDate;

  return (
    <div className="document-item__container">
      {isSigned && (
        <div className="document-item__signed-indicator"></div>
      )}
      <div className="document-item__title mb-5">{title}</div>
      {isSigned && (
        <div>
          Date of signing: {formatDate(signedDate)}
        </div>
      )}
      <div className="mb-15"></div>
      {participants.map((participant) => (
        <ParticipantItem participant={participant} key={participant.id} />
      ))}
    </div>
  );
}

export { DocumentItem };