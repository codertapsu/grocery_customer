import { CartActionType } from './models/cart-action-type.model';
import { CartAction } from './models/cart-action.model';
import { CartItem } from './models/cart-item.model';
import { CartState } from './models/cart-state.model';

const calculateTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, curr) => acc + curr.product.price, 0);
};

export const cartInitialState: CartState = {
  items: [
    {
      product: {
        id: 1,
        price: 100000,
        name: 'Beige knitted elastic runner shoes',
        images: ['/assets/images/products/product-1.jpg'],
      },
      quantity: 10,
    },
    {
      product: {
        id: 2,
        price: 200000,
        name: 'Blue utility pinafore denim dress',
        images: ['/assets/images/products/product-1.jpg'],
      },
      quantity: 10,
    },
  ],
  totalPrice: 0,
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartActionType.AddProduct: {
      const cartItems = [...state.items];
      const newCartItem = action.data;
      const existingCartItem = cartItems.find((item) => item.product.id === newCartItem.product.id);

      if (existingCartItem) {
        existingCartItem.quantity += newCartItem.quantity;
      } else {
        cartItems.push(newCartItem);
      }

      const totalPrice = calculateTotalPrice(cartItems);

      return {
        items: cartItems,
        totalPrice,
      };
    }
    case CartActionType.RemoveProduct: {
      const currentCartItems = [...state.items];
      const removingCartItem = action.data;

      const cartItems = currentCartItems.filter((item) => item.product.id !== removingCartItem.product.id);

      const totalPrice = calculateTotalPrice(cartItems);

      return {
        items: cartItems,
        totalPrice,
      };
    }
    case CartActionType.Reset: {
      return cartInitialState;
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
