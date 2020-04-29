let i;
const xlabels = []
const ypercentage = []
const globalXlabels = []
const globalYpercentage = []
const countryName = document.querySelector('#countryForm');
const countryValue = document.querySelector('.countryValue')
const dateValue = document.querySelector('.dateValue')
const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')
const globalButton = document.querySelector('.globalButton')
const heading = document.querySelector(".heading")
const img = document.querySelector(".img_shadow")
const recover = document.querySelector(".recover")
const confirmedH3 = document.querySelector(".confirmedH3")
const recoverH3 = document.querySelector(".recoverH3")


function getData() {
// if local storage available run getLocalData(), else run getGlobalData()
    if('countrySearch' in localStorage){
    getLocalData() // call function
    console.log ("run getLocalData")
    } else {
    getGlobalData(); // call function
    console.log ("run getGlobalData")
    }
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
        console.log("data length"+data.length)

        for (i = 0; i < data.length; i++) {
            chartDate1 = data[i].Date
            chartDate2 = chartDate1.split("T")[0]
            chartDate3 = chartDate2.split("-")
            chartDate4 = `${chartDate3[2]}.${chartDate3[1]}`
            xlabels.push(chartDate4)
    
            chartCorfirmed = data[i].Confirmed
            console.log(chartCorfirmed)
            chartRecovered = data[i].Recovered
            console.log(chartRecovered)
            chartPercentage1 = chartRecovered / chartCorfirmed // calculate chartPercentage1
            chartPercentage2 = Math.round(chartPercentage1 * 100) // calculate chartPercentage2
            console.log(chartPercentage2)
            ypercentage.push(chartPercentage2)
        }
        
        chartIt()

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
        const newConfirmed = data.Global.NewConfirmed
        const newRecovered = data.Global.NewRecovered
        globalXlabels.push(newConfirmed)
        globalXlabels.push(newRecovered)
        globalXlabels.push(confirmed)
        globalXlabels.push(recovered)
        writeAndCalculate(recovered, confirmed, latestDate)
        chartGlobalData()
    })
    .catch(err => {
        // If something goes wrong and you don't receive a response from the server
        error()
    })
};


function writeAndCalculate(recovered, confirmed, latestDate) {
        const latestDateNew = latestDate.split("T")[0]
        const tempArray = latestDateNew.split("-") // split again, this time at "_"
        console.log(tempArray)
        const newDate = `${tempArray[2]}.${tempArray[1]}.${tempArray[0]}` // reassemble in a different order using Template Literals
        console.log(newDate)
        dateValue.textContent = newDate
        totalConfirmed.textContent = `${confirmed}` // write data in html
        totalRecovered.textContent = `${recovered}`
        const percentage1 = recovered / confirmed // calculate percentage 1
        console.log(percentage1)
        let percentage2 = Math.round(percentage1 * 100) // calculate percentage 2
        console.log(percentage2)
        percentageRecovered.textContent = `${percentage2}%` // write data in html
        setColor(percentage2) // call function
        console.log ("run setColor")
}

// if else for pictures, colors and headings
function setColor(percentage2) {
    console.log("setColor is running")
    console.log(percentage2)
        if (percentage2 <= 20){
        heading.textContent = "Hopefully it will get better"
        recover.textContent = "percentage Recovered" 
        confirmedH3.textContent = "Confirmed" 
        recoverH3.textContent = "Recovered" 
        img.setAttribute('src', 'pictures/red.png')
        percentageRecovered.classList.add ("red")
        console.log("setColor is still running")
        
    }   else if (percentage2 <= 40){
        heading.textContent = "It is getting a little better"
        recover.textContent = "percentage Recovered" 
        confirmedH3.textContent = "Confirmed" 
        recoverH3.textContent = "Recovered" 
        img.setAttribute('src', 'pictures/orange.png')
        percentageRecovered.classList.add("orange")
        console.log("setColor is still running")
    }   else if (percentage2 <= 60){
        heading.textContent = "It is getting much better"
        recover.textContent = "percentage Recovered" 
        confirmedH3.textContent = "Confirmed" 
        recoverH3.textContent = "Recovered" 
        img.setAttribute('src', 'pictures/yellow.png')
        percentageRecovered.classList.add("yellow")
        console.log("setColor is still running")
    }   else if (percentage2 <= 80){
        heading.textContent = "It is going very good"
        recover.textContent = "percentage Recovered" 
        confirmedH3.textContent = "Confirmed" 
        recoverH3.textContent = "Recovered" 
        img.setAttribute('src', 'pictures/light_green.png')
        percentageRecovered.classList.add("light_green")
        console.log("setColor is still running")
    }   else if (percentage2 <= 100){
        heading.textContent = "It seems that everything is going great"
        recover.textContent = "percentage Recovered" 
        confirmedH3.textContent = "Confirmed" 
        recoverH3.textContent = "Recovered" 
        img.setAttribute('src', 'pictures/green.png')
        percentageRecovered.classList.add("green")
        console.log("setColor is still running")
    }
};

// runs if something goes wrong and you don't receive a response from the server
function error() {
        countryValue.textContent = ""
        dateValue.textContent = ""
        totalConfirmed.textContent = "No data available"
        percentageRecovered.textContent = ""
        percentageRecovered.classList.remove("red", "orange", "yellow", "light_green", "green", )
        heading.textContent = "error"
        img.setAttribute('src', 'pictures/error.png')
}

function chartGlobalData() {
    console.log("chartGlobalData is running")
    const ctx = document.querySelector('#myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['New Confirmed', 'New Recovered', 'Total Confirmed', 'Total Recovered'],
            datasets: [{
                label: '# of Votes',
                data: globalXlabels,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function chartIt() {
    console.log("chartIt is running")
    const ctx = document.querySelector('#myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'percentage recovered',
                data: ypercentage,
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + "%";
                        }
                    }
                }]
            }
        }
    });
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
    location.hash = "track";
    location.reload();
    // getLocalData() // call function
})

// Event listener on global button
globalButton.addEventListener('click', (event) => {
    event.preventDefault() // prevent the browsers dafault bahaviour, inserting the value in the URL
    localStorage.clear('countrySearch', countrySearch); // clear local storage
    getData() // call function
})
