const tip = 20;
const bill= 217;
const final = bill + tip;
console.log(`money tip for john is ${tip >= 50 && tip <= 300 ? bill * 0.15 : bill * 0.2 }`)
console.log(`the bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`)