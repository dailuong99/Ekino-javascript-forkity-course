//Importing module
// import { addToCart, totalPrice as price,di} from './shoppingCart.js';
// console.log(shippingCost)
// addToCart('bread', 5);
// console.log(price,di);
// console.log('Importing module');

import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { cart } from './shoppingCart.js';
// add('pizza', 3);
// add('banh mi', 4);
// add('bun bo', 5);

// console.log(cart);

// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
// const data = await res.json()
// console.log(data)

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, title: data.at(-1).body };
// };

// const LastPost = getLastPost();
// console.log(LastPost);

// const LastPost2 = await getLastPost();
// console.log(LastPost2);

const state = {
    cart: [
      { product: 'banh mi', quantity: 5 },
      { product: 'pho bo', quantity: 2 },
    ],
    user: { loggedIn: true },
  };
  
  const stateClone = Object.assign({}, state);
  
  state.user.loggedIn = false;
  console.log(stateClone);