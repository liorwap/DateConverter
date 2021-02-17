const dateSubmit = document.getElementById("dateSubmit");

dateSubmit.addEventListener("click", processDate);
document.getElementById("grDate").value = getCurDate();

function getCurDate() {
    return new Date().toISOString().slice(0, 10);
}

//calculation of number of days in February for leap year
function calcFebruaryDays(year){
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28;
}

function dateValidator(grDate){
    //grDate is array of length 3 containing [yyyy,mm,dd]; it assumes that year and month are valid string
    // that represents number in valid range, only day can be in an impossible range. like february cant be
    // value of 30 ever.
    let grYear = Number.parseInt(grDate[0]);
    let grMonth = Number.parseInt(grDate[1]);
    let grDay = Number.parseInt(grDate[2]);
    let numberOfDaysEachMonth = [ 31, calcFebruaryDays(grYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    return grDay <= numberOfDaysEachMonth[grMonth - 1];
}

function displayHebrewDate(heDate){
    //gets the json response and represents it in the page
    document.getElementById("hbDate").innerText = heDate.hebrew;
}

function getHebrewDate(grDate){
    // integrate to the hebcal service API
    let urlAPI = 'https://www.hebcal.com/converter?cfg=json' + grDate + "&g2h=1";
    fetch(urlAPI)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.error) alert(data.error);
            else{
                displayHebrewDate(data)
            }
        })
        .catch(error => console.log(error))
}

function processDate(){
    // e.g 22-02-1992
    const formattedDate = document.getElementById("grDate").value.split('-');
    if(dateValidator(formattedDate))
    {
        let grYear = formattedDate[0];
        let grMonth = formattedDate[1];
        let grDay = formattedDate[2];
        let dateFormat = '&gy=' + grYear + '&gm=' + grMonth + '&gd=' + grDay;
        getHebrewDate(dateFormat);
    } else {
        alert("Please select a valid date")
    }
}
