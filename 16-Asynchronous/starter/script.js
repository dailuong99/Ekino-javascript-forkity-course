'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  var languagesCountrie = Object.values(data.languages);
  console.log(languagesCountrie);

  var currenciesCountrie = Object.values(data.currencies);
  console.log(currenciesCountrie[0].name);

  const html = `
  <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${languagesCountrie}</p>
    <p class="country__row"><span>💰</span>${currenciesCountrie[0].name}</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country
//     renderCountry(data);

//     //Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //Ajax call country 2
//     const request2 = new XMLHttpRequest()
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText)
//       console.log(data2)

//       renderCountry(data2, 'neighbour')
//     })
//   });
// };

// getCountryAndNeighbour('usa');

//  const request=fetch(`https://restcountries.com/v3.1/name/vietnamese`);
//  console.log(request);

// const getCountryAndNeighbour = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       console.log('res', res);
//       return res.json();
//     })
//     .then(data => {
//       console.log('data', data)
//       renderCountry(data[0])
//     });
// };

const getJSON = function (url, errMsg = 'Somthing went wrong') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`Country not found ${errMsg} (${res.status})`);

    return res.json();
  });
};

const getCountryAndNeighbour = function (country) {
  //Country 1
  var a = getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found');

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Oop! something went wrong! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour('portugal');
});

// getCountryAndNeighbour('germany');

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

//       res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };

// whereAmI(52.508, 13.381);

// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geolocation
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log('dataGeo', dataGeo);

    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    console.log('res', res);
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log('data', data);
    renderCountry(data[0]);

    return `mày đang ở ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log('err', err);
    renderError(`some thing no bi ngu ${err.message}`);

    throw err;
  }
};

console.log('1. will get location');
// const city = whereAmI();
// console.log('city', city);
whereAmI()
  .then(city => console.log('2. city', city))
  .catch(err => console.error('2. err', err))
  .finally(() => console.log('3. finished getting location'));

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // const capital = [...data1.capital, ...data2.capital, ...data3.capital]
    // console.log(capital);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('vietnamese', 'laos', 'cambodia');
