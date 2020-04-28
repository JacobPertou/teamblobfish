let i;
const countryName1 = document.querySelector('#countryForm');
const countryValue1 = document.querySelector('.countryValue')
const globalButton1 = document.querySelector('.globalButton')


function getChartData() {
    countrySearch1 = localStorage.getItem('countrySearch'); // get local storage
    const url = `https://api.covid19api.com/total/country/${countrySearch1}` // url that takes input value from form to get data from specific country using Template Literals
    console.log('Fetching data from: ' + url);

    fetch(url)  // send a request to the server

    .then(response => { // if a positive response is received
        console.log('Data received: ' + response.status + " " + response.statusText);
        return response.json(); // take the response and read it as JSON
    })
    .then(data => { // finally, here you get your data and you can start working with it
        console.log(data);
        
        // Insert your code here. Your data is available in the data variable
        
        for (i = 0; i < data.length; i++) {
        chartDate1 = data[i].Date
        chartDate2 = chartDate1.split("T")[0]
        chartDate3 = chartDate2.split("-")
        chartDate4 = `${chartDate3[2]}.${chartDate3[1]}.${chartDate3[0]}`
        xlabels.push(chartDate4)

        chartCorfirmed = data[i].Confirmed
        console.log(chartCorfirmed)
        chartRecovered = data[i].Recovered
        console.log(chartRecovered)
        chartPercentage1 = chartRecovered / chartCorfirmed // calculate chartPercentage1
        chartPercentage2 = Math.round(chartPercentage1 * 100) // calculate chartPercentage2
        console.log(chartPercentage2)
        ypercentage.push(chartPercentage2)

        chartIt()
}
    })
    .catch(err => {
        
    })
};


// chart

const xlabels = []
const ypercentage = []


function chartIt() {
const ctx = document.querySelector('#myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        datasets: [{
            label: '# of Votes',
            data: ypercentage,
            backgroundColor: ['#577158'],
            borderColor: ['#577158'],
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

// Event listener on window
window.addEventListener('load', getChartData, false); // call function when page load

// Event listener for search form, take input value, save in local storage and call function
countryName1.addEventListener('submit', (event) => {
    event.preventDefault() // prevent the browsers dafault bahaviour, inserting the value in the URL
    getChartData() // call function
})

// Event listener on global button
globalButton1.addEventListener('click', (event) => {
    event.preventDefault() // prevent the browsers dafault bahaviour, inserting the value in the URL
    getChartData() // call function
})