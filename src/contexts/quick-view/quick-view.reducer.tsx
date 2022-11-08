import { QuickViewActionType } from './models/quick-view-action-type.model';
import { QuickViewAction } from './models/quick-view-action.model';
import { QuickViewState } from './models/quick-view-state.model';

export const quickViewInitialState: QuickViewState = {
  product: null,
};

export const quickViewReducer = (state: QuickViewState, action: QuickViewAction) => {
  switch (action.type) {
    case QuickViewActionType.Open: {
      return {
        product: action.data,
      };
    }
    case QuickViewActionType.Close: {
      return quickViewInitialState;
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
