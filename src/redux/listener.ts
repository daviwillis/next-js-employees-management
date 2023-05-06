import { createListenerMiddleware } from '@reduxjs/toolkit';
import { toggleChangeAction, updateAction } from './reducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, listenerAPI) => {
    listenerAPI.dispatch(updateAction(action.payload));
  },
});

export default listenerMiddleware;
