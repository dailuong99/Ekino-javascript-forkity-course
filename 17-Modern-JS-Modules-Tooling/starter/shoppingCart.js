//Exporting module
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product},${quantity} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as di };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product} ${quantity} added to cart`);
}

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   }

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier `);
//   }

//   return{
//       addToCart,
//       cart,
//       totalPrice,
//       totalQuantity
//   }
// })();

// ShoppingCart2.addToCart('apple', 4)
// ShoppingCart2.addToCart('banh mi', 2)

// console.log(ShoppingCart2)





import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

