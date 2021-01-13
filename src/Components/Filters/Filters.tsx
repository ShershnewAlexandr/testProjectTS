import * as React from "react";
import { SignedFilter } from "./SignedFilter/SignedFilter";
import { SearchFilter } from "./SearchFilter/SearchFilter";
import { ParticipantFilter } from "./ParticipantFilter/ParticipantFilter";
import { IFilters, DocumentParticipant } from "../../ducks/types";
import "./Filters.css";

interface propsType {
  filters: IFilters,
  participants: DocumentParticipant[],
  onChangeSigned: (signed: boolean) => void,
  onChangeSearch: (search: string) => void,
  onChangeParticipantId: (participantId: string) => void,
}

function Filters(props: propsType) {
  const { 
    filters,
    participants,
    onChangeSigned,
    onChangeSearch,
    onChangeParticipantId
  } = props;

  return (
    <div className="filters__container">
      <SignedFilter signed={filters.signed} onChange={onChangeSigned} />
      <SearchFilter onChange={onChangeSearch} />
      <ParticipantFilter participants={participants} onChange={onChangeParticipantId} />
    </div>
  );
}

export { Filters };