import { Data, DocumentParticipant, Document } from "../data";

export interface IFilters {
    signed: boolean,
    search: string,
    participantId: string | null,
}

export interface IState {
  data: Data | null;
  filteredDocuments: Document[][];
  loaded: boolean;
  filters: IFilters;
  paging: {
    page: number,
    perPage: number,
    totalPages: number,
  }
}

export {
  Data, 
  DocumentParticipant,
  Document
}