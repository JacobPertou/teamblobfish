const countryName = document.querySelector('#countryForm');
const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')





function getData() {
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
        const latestDate = latestData.Date.split("T")[0]  // get date value, split it at "T" (just year, month and day, without hours)
        console.log(latestDate)
        const tempArray = latestDate.split("-") // split again, this time at "_"
        console.log(tempArray)
        const newDate = `${tempArray[2]}.${tempArray[1]}.${tempArray[0]}` // reassemble in a different order using Template Literals
        console.log(newDate)
        const recovered = latestData.Recovered // get Total Recovered value from latest data
        console.log(recovered)
        totalRecovered.textContent = recovered // write value in html
        const confirmed = latestData.Confirmed // get Total Confrimed value from latest data
        console.log(confirmed)
        totalConfirmed.textContent = confirmed // write data in html
        const percentage1 = recovered / confirmed // calculate percentage 1
        console.log(percentage1)
        const percentage2 = Math.round(percentage1 * 100) // calculate percentage 2
        console.log(percentage2)
        percentageRecovered.textContent = `${percentage2} %` // write data in html
    })
    .catch(err => {
        // If something goes wrong and you don't receive a response from the server
      })
};

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