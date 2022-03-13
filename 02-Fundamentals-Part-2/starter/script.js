'use strict'

const calcAge = function(temps) {
    let max = temps[0];
    let min = temps[0];
    for (let i = 0; i < temps.length; i++) {
        if(temps[i] > max) max = temps[i];
        if(temps[i] < min) min = temps[i];

    }
    console.log('min',min)
    console.log(max)
};


calcAge([11,2,7,4,5,9])