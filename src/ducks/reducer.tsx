import { IState } from "./types";
import { actionTypes, ActionsType } from "./actions";
import { Scheduler } from "rxjs";

const initialState: IState = {
  data: null,
  filteredDocuments: [],
  loaded: false,
  filters: {
    signed: false,
    search: "",
    participantId: null,
  },
  paging: {
    page: 0,
    totalPages: 0,
    perPage: 5,
  }
}

function reducer(state: IState, action: ActionsType): IState {
  switch (action.type) {
    case actionTypes.DATA_SUCCESS: 
      return {
        ...state,
        loaded: true,
        data: action.payload,
      };
    case actionTypes.FILTER_REQUEST:
      return {
        ...state,
        loaded: JSON.stringify(state.filters) === JSON.stringify(action.payload),
        filters: {
          ...state.filters,
          ...action.payload
        },
      };
    case actionTypes.FILTER_SUCCESS: 
      return {
        ...state,
        loaded: true,
        filteredDocuments: action.payload,
        paging: {
          ...state.paging,
          page: 0,
          totalPages: action.payload.length,
        }
      };
    case actionTypes.SET_PAGING: 
      return {
        ...state,
        paging: {
          ...state.paging,
          ...action.payload,
        }
      };
    default: return state;
  }
}

export { reducer, initialState };