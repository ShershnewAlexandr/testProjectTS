import * as React from "react";
import { cancelableDebounse, sliceToPages } from "../utils";
import {
  IFilters,
  Document,
  DocumentParticipant,
} from "../ducks/types";
import * as actions from "../ducks/actions";
import { Filters } from "../Components/Filters/Filters";
import { StateContext } from "../Containers/MainPageContainer";

function allSearchIncludes(keyWords: string[], searchWords: string[]): boolean {
  return !searchWords.map((searchWord: string) => {
    let found = false;
    keyWords.forEach((keyWord: string) => {
      if (keyWord.includes(searchWord)) {
        found = true;
      }
    });
    return found;
  }).includes(false);
}

function searchFilter(document: Document, search: string): boolean {
  let haveMatch = false;
  const searchWords = search.split(" ")
    .filter((str: string) => !!str)
    .map((str: string) => str.toLowerCase());

  const titleKeyWords = document.title.split(" ")
    .filter((str: string) => !!str)
    .map((str: string) => str.toLowerCase());

  const participantsKeyWords = document.participants
    .reduce((acc: string[][], participant: DocumentParticipant) => {
        return [...acc, [
          participant.firstname.toLowerCase(),
          participant.lastname.toLowerCase()
        ]];
      }, []);

  const keyWordsArr = [...participantsKeyWords, titleKeyWords];
  return keyWordsArr.map((keyWords: string[]): boolean => {
    return allSearchIncludes(keyWords, searchWords);
  }).includes(true);
}

function participantIdFilter(document: Document, participantId: string | null): boolean {
  if (!participantId) {
    return true;
  }
  return document.participants
    .filter((participant) => (!!participant.signedDate))
    .map((participant) => (participant.id))
    .includes(participantId);
}

function documentsFilter(documents: Document[], filters: IFilters, isCancel: boolean): Document[] {
  return documents.filter((document, idx) => {
    if (filters.signed && !!document.signedDate ) {
        return false;
    }

    if (!participantIdFilter(document, filters.participantId) || !searchFilter(document, filters.search)) {
      return false;
    };
    return true;
  });
}

function FiltersContainer() {
  const {state, dispatch} = React.useContext(StateContext);
  const { filters, data, paging } = state;
  const updateDependencies = [
    ...Object.values(filters),
    data?.documents?.length
  ]

  const onChangeSigned = (signed: boolean): void => {
    dispatch(actions.dataFilterRequestAction({
      signed
    }));
  }

  const onChangeSearch = (search: string): void => {
    dispatch(actions.dataFilterRequestAction({
      search
    }));
  }

  const onChangeParticipantId = (participantId: string): void => {
    dispatch(actions.dataFilterRequestAction({
      participantId
    }));
  }

  React.useEffect(() => {
    cancelableDebounse((isCancel: boolean) => {
      if (state.data) {
        const filteredDocuments = documentsFilter(state.data.documents, filters, isCancel);
        const slicedToPages = sliceToPages(filteredDocuments, paging.perPage);
        dispatch(actions.dataFilterSuccessAction(slicedToPages));
      }
    });
  }, updateDependencies);

  return (
    <Filters 
      filters={filters}
      participants={data?.participants || []}
      onChangeSigned={onChangeSigned}
      onChangeSearch={onChangeSearch}
      onChangeParticipantId={onChangeParticipantId}
    />
  );
}

export { FiltersContainer }