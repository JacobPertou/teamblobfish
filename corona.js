const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       const response = JSON.parse(xhttp.responseText);
       console.log(response)
       const value1 = response.Countries[59];
       console.log(value1)
       const recovered = response.Countries[59].TotalRecovered;
       console.log(recovered)
       totalRecovered.textContent = recovered;
       const confirmed = response.Countries[59].TotalConfirmed;
       console.log(confirmed)
       totalConfirmed.textContent = confirmed;
    }
};
xhttp.open("GET", "https://api.covid19api.com/summary", true);
xhttp.send();