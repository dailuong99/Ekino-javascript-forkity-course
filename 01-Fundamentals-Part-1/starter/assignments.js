let country = "VietNam";
console.log(country)
let continent = "Asia";
console.log(continent)
let population = 7000000;
console.log(population)
/////////
const language = "Vietnamese";
let isIsland = false;
console.log(typeof isIsland);
console.log(language);
 
let Portugal = {
    name:'Portugal',continent:'Euro',population:11000000,language:'portuguese'
}
console.log(Portugal)

// '9' - '5';
// '19' - '13' + '17';
// '19' - '13' + 17;
// '123' < 57;
// 5 + 6 + '4' + 9 - 4 - 2;
var x = '9' - '5';
console.log(x)
if(x == '95')
console.log(true)
else console.log(false);

var y = '19' - '13' + '17';
console.log(typeof y)
console.log(y)
if(y == '617')
console.log(true)
else console.log(false);

var z = '19' - '13' + 17;
console.log(z)
console.log(typeof y)
if(z == '23')
console.log(true)
else console.log(false);

var c = '123' < 57;
console.log(c)
if(c)
console.log(true)
else console.log(false);

var g = 5 + 6 + '4' + 9 - 4 - 2;
console.log("g", g)
console.log("g",typeof g)
if(g == '22')
console.log(true)
else console.log(false);


console.log(population / 2);
population++;
console.log(population);
console.log(population > 6);
console.log(population < 33);
const description1 =
country +
' is in ' +
continent +
', and its ' +
population +
' million people speak ' +
language;
console.log(description1);