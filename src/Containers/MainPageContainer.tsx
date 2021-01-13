import * as React from "react";
import { MainPage } from "../Components/MainPage";
import { getFakeData } from "../data";
import { reducer, initialState } from "../ducks/reducer";
import * as actions from "../ducks/actions";
import { IState } from "../ducks/types";

interface IStateContext {
  state: IState,
  dispatch: any,
};

export const StateContext = React.createContext<IStateContext>({
  state: initialState,
  dispatch: () => {},
});

function MainPageContainer() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    (async () => {
      const response = await getFakeData();
      console.log(response);
      dispatch(actions.dataSuccessAction(response));
    })();
  }, []);

  return (
    <StateContext.Provider value={{state, dispatch}}>
      <MainPage/>
    </StateContext.Provider>
  );
}

export { MainPageContainer }