import { Data, Document } from "./types"

export const actionTypes = {
  DATA_SUCCESS: "@@data/success",
  FILTER_REQUEST: "@@data/filter-request",
  FILTER_SUCCESS: "@@data/filter-success",
  SET_PAGING: "@@data/set-paging",
};

export interface IDataSuccess {
  type: string,
  payload: Data
}
export function dataSuccessAction(payload: Data): IDataSuccess {
  return {
    type: actionTypes.DATA_SUCCESS,
    payload,
  };
};

export interface IDataFilterRequest {
  type: string,
  payload: any
}
export function dataFilterRequestAction(payload: any) {
  return {
    type: actionTypes.FILTER_REQUEST,
    payload,
  };
};

export interface IDataFilterSuccess {
  type: string,
  payload: Document[]
}
export function dataFilterSuccessAction(payload: Document[]) {
  return {
    type: actionTypes.FILTER_SUCCESS,
    payload,
  };
};

type paging = {
  page?: number,
  perPage?: number,
  totalPages?: number,
};
export interface IDataSetPaging {
  type: string,
  payload: paging, 
}
export function dataSetPagingAction(payload: paging) {
  return {
    type: actionTypes.SET_PAGING,
    payload,
  };
};

export type ActionsType = 
IDataSuccess |
IDataFilterRequest |
IDataFilterSuccess |
IDataSetPaging;