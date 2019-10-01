//variables

const form = document.getElementById('request-quote');
const level = document.querySelector('input[name="level"]:checked').value;
EventListerners();

function EventListerners() {

    //eventListeners
    document.addEventListener('DOMContentLoaded', function () {
        const html = new HTMLUI('John');
        html.displayYears();

    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const html = new HTMLUI('John');
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        // console.log(make);
        // console.log(year);

        if (make === '' || year === '' || level === '') {
            html.displayError('All the fields are mandatory');
        }
        else {

            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            html.showResults(price, insurance);
            //make the qoautation
        }
    })
}

function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}

Insurance.prototype.calculateQuotation = function (insurance) {
    // console.log(insurance);
    let price;
    const base = 2000;
    //
    const make = insurance.make;
    /*     
    1 = American 15%
    2 = Asian 0.5%
    3 = European 35%
    */
    switch (make) {
        case '1':
            price = base * 1.15;
            break
        case '2':
            price =
                base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
    }
    const year = insurance.year;
    //Get years difference  ..Age of car
    const difference = this.getYearDifference(year);
    //console.log(difference);

    //Each year cost of insurance decrease by 3%
    price = price - ((difference * 3) * price) / 100;
    //check level of protection
    price = this.calculateLevel(price, level);
    return price;
};
Insurance.prototype.getYearDifference = function (year) {
    return new Date().getFullYear() - year;
};
//add value based on level of protection

Insurance.prototype.calculateLevel = function (price, level) {
    /* 
    basic increase by 30%
    Complete increase by 50%
    */
    if (level == 'basic') {

        price = price * 1.30;

    }
    else { price = price * 1.50; }

    return price;
};

function HTMLUI(name) {

    this.name = name;
}
//Functions/Objects

HTMLUI.prototype.displayYears = function () {
    const max = new Date().getFullYear(),
        min = max - 20;
    // //generate the list with the bext 20years 
    const selectYears = document.getElementById('year');

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);

    }
    console.log(max);
}
HTMLUI.prototype.displayError = function (message) {
    const div = document.createElement('div');
    div.classList = 'error';
    div.innerHTML = `
    <p>${message}</p>
    `;
    form.insertBefore(div, document.querySelector('.form-group'));
}


HTMLUI.prototype.showResults = function (price, insurance) {

    const result = document.getElementById('result');
    let make = insurance.make;

    switch (make) {

        case '1':
            make = 'American';
            break;
        case '2':
            make = 'Asian';
            break;
        case '3':
            make = 'European';
            break;
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <p class="header">Summary<p>
    <p>Make:${make}</p>
    <p>Year:${insurance.year}
    <P>Level:${insurance.level}    
    <p class="Total">Total:$ ${price}</p>`
    result.appendChild(div);
}

