import * as React from "react";
import classnames from "classnames";
import { StateContext } from "../../Containers/MainPageContainer";
import * as actions from "../../ducks/actions";
import "./Pagination.css";

function Pagination() {
  const { state, dispatch } = React.useContext(StateContext);
  const { paging: { perPage, page, totalPages } } = state;

  const haveNextPage = page < totalPages - 1;
  const havePrevPage = page !== 0;

  const onNext = () => {
    if (haveNextPage) {
      dispatch(actions.dataSetPagingAction({
        page: page + 1
      }));
    }
  }

  const onPrev = () => {
    if (havePrevPage) {
      dispatch(actions.dataSetPagingAction({
        page: page - 1
      }));
    }
  }

  return totalPages === 0 ? (<div>Not found</div>) : (
    <div className="pagination__container">
      <button 
        className={classnames("pagination__button", {
          "pagination__button_disabled": !havePrevPage,
        })}
        disabled={!havePrevPage}
        onClick={onPrev}
      >
        prev
      </button>
      <span> {page + 1} of {totalPages} </span>
      <button 
        className={classnames("pagination__button", {
          "pagination__button_disabled": !haveNextPage,
        })}
        disabled={!haveNextPage}
        onClick={onNext}
      >
        next
      </button>
    </div>
  );
}

export { Pagination };