const countryName = document.querySelector('#countryForm');
const countryValue = document.querySelector('.countryValue')
const dateValue = document.querySelector('.dateValue')
const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')
const globalButton = document.querySelector('.globalButton')
const heading = document.querySelector(".heading")
const img = document.querySelector(".img_shadow")


function getData() {
// if local storage available run getLocalData(), else run getGlobalData()
if('countrySearch' in localStorage){
    getLocalData() // call function
    console.log ("run getLocalData")
} else {
    getGlobalData(); // call function
    console.log ("run getGlobalData")
}

function getLocalData() {
    countrySearch = localStorage.getItem('countrySearch'); // get local storage
    const url = `https://api.covid19api.com/total/country/${countrySearch}` // url that takes input value from form to get data from specific country using Template Literals
    console.log('Fetching data from: ' + url);

    fetch(url)  // send a request to the server

    .then(response => { // if a positive response is received
        console.log('Data received: ' + response.status + " " + response.statusText);
        return response.json(); // take the response and read it as JSON
    })
    .then(data => { // finally, here you get your data and you can start working with it
        console.log(data);

        // Insert your code here. Your data is available in the data variable
        const latestData = data[data.length - 1]; // get last item in array that represents latest data
        console.log(latestData)
        const country = latestData.Country // get country value
        console.log(country)
        countryValue.textContent = country
        const latestDate = latestData.Date  // get date value, split it at "T" (just year, month and day, without hours)
        const recovered = latestData.Recovered // get Total Recovered value from latest data
        console.log(recovered)
        const confirmed = latestData.Confirmed // get Total Confrimed value from latest data
        console.log(confirmed)
        writeAndCalculate(recovered, confirmed, latestDate)
    })
    .catch(err => {
        // If something goes wrong and you don't receive a response from the server 
        error()
    })
};


function getGlobalData() {
    countrySearch = localStorage.getItem('countrySearch'); // get local storage
    const url = `https://api.covid19api.com/summary` // url that takes input value from form to get data from specific country using Template Literals
    console.log('Fetching data from: ' + url);

    fetch(url)  // send a request to the server

    .then(response => { // if a positive response is received
        console.log('Data received: ' + response.status + " " + response.statusText);
        return response.json(); // take the response and read it as JSON
    })
    .then(data => { // finally, here you get your data and you can start working with it
        console.log(data);

        // Insert your code here. Your data is available in the data variable
        countryValue.textContent = "Worldwide"
        const latestDate = data.Date  // get date value, split it at "T" (just year, month and day, without hours)
        console.log(latestDate)
        const recovered = data.Global.TotalRecovered // get Total Recovered value from latest data
        console.log(recovered)
        const confirmed = data.Global.TotalConfirmed // get Total Confrimed value from latest data
        console.log(confirmed)
        writeAndCalculate(recovered, confirmed, latestDate)
    })
    .catch(err => {
        // If something goes wrong and you don't receive a response from the server
        error()
    })
};
}

function writeAndCalculate(recovered, confirmed, latestDate) {
        const latestDateNew = latestDate.split("T")[0]
        const tempArray = latestDateNew.split("-") // split again, this time at "_"
        console.log(tempArray)
        const newDate = `${tempArray[2]}.${tempArray[1]}.${tempArray[0]}` // reassemble in a different order using Template Literals
        console.log(newDate)
        dateValue.textContent = newDate
        totalConfirmed.textContent = `${confirmed} Confirmed` // write data in html
        const percentage1 = recovered / confirmed // calculate percentage 1
        console.log(percentage1)
        let percentage2 = Math.round(percentage1 * 100) // calculate percentage 2
        console.log(percentage2)
        percentageRecovered.textContent = `${recovered} (${percentage2}%) Recovered` // write data in html
        setColor(percentage2) // call function
        console.log ("run setColor")
}

// if else for pictures, colors and headings
function setColor(percentage2) {
    console.log("setColor is running")
    console.log(percentage2)
        if (percentage2 <= 20){
        heading.textContent = "Hopefully it will get better"
        img.setAttribute('src', 'pictures/red.png')
        percentageRecovered.setAttribute("style", "color: #993434")
        console.log("setColor is still running")
    }   else if (percentage2 <= 40){
        heading.textContent = "It is getting a little better" 
        img.setAttribute('src', 'pictures/orange.png')
        percentageRecovered.classList.add("orange")
        console.log("setColor is still running")
    }   else if (percentage2 <= 60){
        heading.textContent = "It is getting much better"
        img.setAttribute('src', 'pictures/yellow.png')
        percentageRecovered.classList.add("yellow")
        console.log("setColor is still running")
    }   else if (percentage2 <= 80){
        heading.textContent = "It is going very good"
        img.setAttribute('src', 'pictures/light_green.png')
        percentageRecovered.classList.add("light_green")
        console.log("setColor is still running")
    }   else if (percentage2 <= 100){
        heading.textContent = "It seems that everything is going great"
        img.setAttribute('src', 'pictures/green.png')
        percentageRecovered.classList.add("green")
        console.log("setColor is still running")
    }
};

// runs if something goes wrong and you don't receive a response from the server
function error() {
        countryValue.textContent = ""
        dateValue.textContent = ""
        totalConfirmed.textContent = ""
        percentageRecovered.textContent = "No data available"
        percentageRecovered.classList.remove("red", "orange", "yellow", "light_green", "green", )
        heading.textContent = "error"
        img.setAttribute('src', 'pictures/error.png')
}


// Event listener on window
window.addEventListener('load', getData, false); // call function when page load

// Event listener for search form, take input value, save in local storage and call function
countryName.addEventListener('submit', (event) => {
    event.preventDefault() // prevent the browsers dafault bahaviour, inserting the value in the URL
    const countrySearch = event.target.elements.Country.value.trim() // countrySearch = input value
    localStorage.setItem('countrySearch', countrySearch) // save in local storage
    console.log(countrySearch)
    event.target.elements.Country.value = ''  // clear the input field
    getData() // call function
})

// Event listener on global button
globalButton.addEventListener('click', (event) => {
    event.preventDefault() // prevent the browsers dafault bahaviour, inserting the value in the URL
    localStorage.clear('countrySearch', countrySearch); // clear local storage
    getData() // call function
})
