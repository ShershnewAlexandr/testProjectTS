import * as React from "react";
import classnames from "classnames";
import { DocumentParticipant } from "../../../ducks/types";
import "./ParticipantFilter.css";

interface propsType {
  participants: DocumentParticipant[],
  onChange: (participantId: string) => void,
}

function ParticipantFilter(props: propsType) {
  const { participants, onChange } = props;

  return (
    <div>
      <span>Signed:</span>
      <select className="participant-filter__select"
        onChange={(e) => {onChange(e.target.value)}}
      >
        <option value="">Participants</option>
        {participants.map((participant) => (
          <option 
            key={participant.id}
            value={participant.id}
          >
            {`${participant.firstname} ${participant.lastname}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export { ParticipantFilter };