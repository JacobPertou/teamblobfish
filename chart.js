let i;


function getChartData() {
    countrySearch = localStorage.getItem('countrySearch'); // get local storage
    const url = `https://api.covid19api.com/total/country/denmark` // url that takes input value from form to get data from specific country using Template Literals
    console.log('Fetching data from: ' + url);

    fetch(url)  // send a request to the server

    .then(response => { // if a positive response is received
        console.log('Data received: ' + response.status + " " + response.statusText);
        return response.json(); // take the response and read it as JSON
    })
    .then(data => { // finally, here you get your data and you can start working with it
        console.log(data);
        console.log(data[1])
        console.log(data[1].Date)

        // Insert your code here. Your data is available in the data variable
        
        for (i = 0; i < data.length; i++) {
        chartDate1 = data[i].Date
        chartDate2 = latestDate.split("T")[0]
        chartDate3 = latestDateNew.split("-")
        chartDate4 = `${chartDate3[2]}.${chartDate3[1]}.${chartDate3[0]}`
        console.log(chartDate4)
}
    })
    .catch(err => {
        
    })
};







// chart
const ctx = document.getElementById('myChart').getContext('2d');
const xlabels = [];
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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


// Event listener on window
window.addEventListener('load', getChartData, false); // call function when page load