//calculation of number of days in February for leap year
function calcFebruaryDays(year){
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28;
}

function dateValidator(grDate){
    //grDate is array of length 3 containing [yyyy,mm,dd]; it assumes that year and month are valid string
    // that represents number in valid range, only day can be in an impossible range. like february cant be
    // value of 30 ever.
    let gy = Number.parseInt(grDate[0]);
    let gm = Number.parseInt(grDate[1]);
    let gd = Number.parseInt(grDate[2]);
    let numberOfDaysEachMonth = [ 31, calcFebruaryDays(gy), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    return gd <= numberOfDaysEachMonth[gm - 1];
}

test('simple', () => {
    expect(dateValidator(['1992', '04', '20'])).toBe(true);
});

test('leapYear1', () => {
    expect(dateValidator(['2024', '02', '29'])).toBe(true);
});

test('noLeapYear', () => {
    expect(dateValidator(['2021', '02', '29'])).toBe(false);
});

test('edgeCase', () => {
    expect(dateValidator(['9999', '12', '31'])).toBe(true);
});

