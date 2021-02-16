const dateSubmit = document.getElementById("dateSubmit");

dateSubmit.addEventListener("click", processDate);
document.getElementById("grDate").value = getCurDate();

function getCurDate()
{
    let today = new Date();
    return String(today.getFullYear()) + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
}
//calculation of number of days in February for leap year
function calcFebruaryDays(year){
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28;
}

function dateValidator(grDate){
    let gy = Number.parseInt(grDate[0]);
    let gm = Number.parseInt(grDate[1]);
    let gd = Number.parseInt(grDate[2]);
    let numberOfDaysEachMonth = [ 31, calcFebruaryDays(gy), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    return gd <= numberOfDaysEachMonth[gm];
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
            if(!response.ok){
                throw Error(response.statusText)
            }
            return response.json();
        })
        .then(heDate => displayHebrewDate(heDate))
        .catch(error => alert("Connection to service failed"))
}

function processDate(){
    // e.g 22-02-1992
    const formattedDate = document.getElementById("grDate").value.split('-');
    if(dateValidator(formattedDate))
    {
        let gy = formattedDate[0];
        let gm = formattedDate[1];
        let gd = formattedDate[2];
        let dateFormat = '&gy=' + gy + '&gm=' + gm + '&gd=' + gd;
        getHebrewDate(dateFormat);
    } else {
        alert("Please select a valid date")
    }
}
