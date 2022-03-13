'use strict';

const Person = function (firtName, birthYear) {
  this.firtName = firtName;
  this.birthYear = birthYear;
};
const Dai = new Person('daine', 1999);
console.log(Dai);

const arr = [1, 2, 3.4, 5, 6, 7, 8, 9];
console.log(arr.__proto__);

