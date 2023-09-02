import {
  CARD_ADD_ITEM,
  CARD_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CARD_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

//check if the items are already exist in the cart then only update the quantity
//and not in the cart then it take action.payload and update cart array
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CARD_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          //It returns a new state with cartItems updated. It maps over each item (x) in the cart.
          //If the current item matches the existItem, it replaces it with the new item.
          // Otherwise, it leaves the item unchanged.
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], //return original state and new item to the cart items
        }
      }
    case CARD_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CARD_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
