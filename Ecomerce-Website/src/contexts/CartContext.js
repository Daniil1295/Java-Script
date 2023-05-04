import React, { createContext, useEffect, useState } from 'react';
import { IoMdThermometer } from 'react-icons/io';


export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

//total price state
const [total, setTotal] = useState(0);
useEffect(() => {
  const total = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.amount;
  },0);
  setTotal(total);
})
  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if the item is already in the cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    // if cartItem is already in the cart
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 }
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // clear carrt
  const clearCart = () => {
    setCart([]);
  };

  // increaese amount
  const increaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    addToCart(cartItem, id);
  }

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => {
      return item.id === id;;
    });
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  }

  return <CartContext.Provider value={{
    decreaseAmount,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    itemAmount,
    total
  }}>{children}</CartContext.Provider>;
};

export default CartProvider;
