const firstCurrency = document.querySelector('.firstCurrency');
const firstSum = document.querySelector('.firstSum');
const secondCurrency = document.querySelector('.secondCurrency');
const secondSum = document.querySelector('.secondSum');
const selectCurrency = document.querySelectorAll('select');
const exchangeButton = document.querySelector('.exchange');
const apiURL = 'http://api.exchangeratesapi.io/v1/latest?access_key=870f328132314e341a34802f5db3893b';
var html = '';

exchangeButton.addEventListener('click', () => {
    const temp = firstCurrency.value;
    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = temp;
});

async function calculateFunc() {
    const respon = await fetch(apiURL);
    const data = await respon.json();
    const arrKeys = Object.keys(data.rates);
    const rates = data.rates;
    console.log(rates);

    arrKeys.map(item => {
        return html += `<option value=${item}>${item}</option>`;
    });
    for (let i = 0; i < selectCurrency.length; i++) {
        selectCurrency[i].innerHTML = html;
    };

    firstSum.addEventListener('click', () => {
        secondSum.value = (firstSum.value * rates[secondCurrency.value] / rates[firstCurrency.value]).toFixed(2);
    });
    secondSum.addEventListener('click', () => {
        firstSum.value = (secondSum.value * rates[firstCurrency.value] / rates[secondCurrency.value]).toFixed(2);
    });
    firstCurrency.addEventListener('change', () => {
        secondSum.value = (firstSum.value * rates[secondCurrency.value] / rates[firstCurrency.value]).toFixed(2);
    });
    secondCurrency.addEventListener('change', () => {
        firstSum.value = (secondSum.value * rates[firstCurrency.value] / rates[secondCurrency.value]).toFixed(2);
    });
};

calculateFunc();