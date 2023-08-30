import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk' //Redux Thunk is a middleware that allows to write action creators that return a function instead of an action. It's useful for handling asynchronous actions, such as API calls.
import { composeWithDevTools } from 'redux-devtools-extension' //This is a development tool for debugging Redux state and actions.
import { productListReducers } from './reducers/productReducers'
import { productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducers } from './reducers/userReducer'

//Redux reducers reduce a set of actions (over time) into a single state.
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
}) //combineReducers to combine multiple reducer functions into a single reducer function.

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk] //Middleware in Redux is a way to extend Redux with custom functionality.

//The Redux store brings together the state, actions, and reducers that make up your app
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
