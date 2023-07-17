import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemId = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // здесь будет хранится найденный id элемента

    const existingCartItem = state.items[existingCartItemId]; // если в existingCartItemId нашелся элемент, тут будет true, иначе null

    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemId] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = state.items.concat(updatedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemId = state.items.findIndex(
      (item) => item.id === action.id
    ); // здесь будет хранится найденный id элемента

    const elementCartItem = state.items[existingCartItemId]; // если в existingCartItemId нашелся элемент, тут будет true, иначе null

    const updatedTotalAmount = state.totalAmount - elementCartItem.price;

    let updatedItemsR;

    if (elementCartItem.amount === 1) {
      updatedItemsR = state.items.filter((item) => item.id != action.id);
    } else {
      const updatedItem = {
        ...elementCartItem,
        amount: elementCartItem.amount - 1,
      };
      updatedItemsR = [...state.items];
      updatedItemsR[existingCartItemId] = updatedItem;
    }
    return {
      items: updatedItemsR,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispathCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispathCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispathCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  }; // передаем в качестве обьекта указатели на функции с логикой какого-то действия

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  ); // передаем начальные значения из компонента cartContext
};

export default CartContextProvider;
