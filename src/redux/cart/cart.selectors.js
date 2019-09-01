import { createSelector } from 'reselect';

// input selector: does not uses createSelector
const selectCart = state => state.cart;

// output selector: uses createSelector and input selectors
// this is also a memoiselector because it is created by using the createSelector function
export const selectCartItems = createSelector(
    [selectCart], 
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity, 
        0)
);
