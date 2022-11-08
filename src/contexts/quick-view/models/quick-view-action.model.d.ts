import { Product } from '@models/product.model';

import { QuickViewActionType } from './quick-view-action-type.model';

export type QuickViewAction =
  | {
      type: QuickViewActionType.Open;
      data: Product;
    }
  | {
      type: QuickViewActionType.Close;
    };
