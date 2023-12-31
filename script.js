'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const totalCountry = document.querySelector('.total__country');

///////////////////////////////////////

// All Country information on restcountries API to Callback Hell

const renderCountry = function (data, className = '') {
  totalCountry.textContent = `Toatal County: ${data.length}`;
  if (data.length === 0) return;
  else {
    data.forEach((data, index) => {
      const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__number"><span>${index + 1}</span></div>
  <div class="country__data">
    <h3 class="country__name">${
      data.name.common
    }<span class="country__region"> (${data.region})</span></h3>
    <p class="country__row"><span>👫</span>${data.population.toLocaleString()}</p>
    <p class="country__row"><span>🗣️</span>${
      typeof data.languages === 'object'
        ? data.languages[Object.keys(data.languages)[0]]
        : ''
    }</p>
    <p class="country__row"><span>💰</span>

    ${
      typeof data.currencies === 'object'
        ? data.currencies[Object.keys(data.currencies)[0]].name
        : ''
    }
    </p>
  </div>
</article>`;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  }
};

const getCountryDataAndNaibur = function () {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/all`);
  request.send();
  request.addEventListener('load', function () {
    const [...data] = JSON.parse(this.responseText);
    renderCountry(data);
  });
};

getCountryDataAndNaibur();
