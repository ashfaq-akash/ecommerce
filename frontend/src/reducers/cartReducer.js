import { CARD_ADD_ITEM } from '../constants/cartConstants'

//check if the items are already exist in the cart then only update the quantity
//and not in the cart then it take action.payload and update cart array
export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state
  }
}
