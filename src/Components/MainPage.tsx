import * as React from "react";
import { DocumentItem } from "./DocumentItem/DocumentItem";
import { FiltersContainer } from "../Containers/FiltersContainer";
import { Pagination } from "./Pagination/Pagination";
import { Document } from "../ducks/types";
import { StateContext } from "../Containers/MainPageContainer";

function MainPage() {
  const { state, dispatch } = React.useContext(StateContext);
  const { filteredDocuments, loaded, paging } = state;

  return (
    <React.Fragment>
      <FiltersContainer/>

      {!loaded ? (<div>Loading...</div>) : (
        <React.Fragment>
          <Pagination/>
          {filteredDocuments[paging.page]?.map((document: Document) => (
            <DocumentItem document={document} key={document.id}/>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export { MainPage };