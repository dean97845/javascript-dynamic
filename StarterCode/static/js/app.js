// from data.js
var tableData = data;

// YOUR CODE HERE!
function displayTable(data){
    var tbody = d3.select("tbody");

    data.forEach(function(sightings){
        trow = tbody.append("tr")
        for (const key in sightings) {

            trow.append("td").text(sightings[key]);
        }
    });
}

// define filter functions
function filterDate(dateObj){
    // Select the input element and get the input value
    var filterDate = new Date(d3.select("#datetime").property("value"));
    var tableDate = new Date(dateObj.datetime);
    
    return tableDate >= filterDate;
}

function filterCity(dataObj){
    // Select the input element and get the input value
    cityOption = d3.select("#filter-city").node();
    if (cityOption.selectedIndex >= 0){
        var filterCity = cityOption.options[cityOption.selectedIndex].text;
        return dataObj.city == filterCity;
    } else {
        return false;
    }

}

function filterState(dataObj){
    // Select the input element and get the input value
    stateOption = d3.select("#filter-state").node();
    if (stateOption.selectedIndex >= 0){
        var filterState = stateOption.options[stateOption.selectedIndex].text;
        return dataObj.state == filterState;
    } else {
        return false;
    }

}

function filterShape(dataObj){
    // Select the input element and get the input value
    shapeOption = d3.select("#filter-shape").node();
    if (shapeOption.selectedIndex >= 0){
        var filterShape = shapeOption.options[shapeOption.selectedIndex].text;
        return dataObj.shape == filterShape;
    } else {
        return false;
    }

}
// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  //clear the table
  d3.select("tbody").selectAll("tr").remove();

  // filter the data based on the form entries
  filteredData = data.filter(filterDate);
  if (d3.select("#filter-state").node().selectedIndex >= 0) {filteredData = filteredData.filter(filterState)};
  if (d3.select("#filter-city").node().selectedIndex >= 0) {filteredData = filteredData.filter(filterCity)};
  if (d3.select("#filter-shape").node().selectedIndex >= 0) {filteredData = filteredData.filter(filterShape)};
  displayTable(filteredData);
});

stateList = d3.select("#filter-state")
stateList.on("click", function(){
    filteredData = data.filter(filterState);
    populateList ("filter-city", filteredData.map(d=>d.city));
});

cityList = d3.select("#filter-city")
cityList.on("click", function(){
    filteredData = data.filter(filterCity);
    populateList ("filter-shape", filteredData.map(d=>d.shape));
});

function populateLists(data){
    //get  city values and populate list
    cities = data.map(d=>d.city);
    populateList("filter-city", cities);

    //get  state values and populate list
    states = data.map(d=>d.state);
    populateList("filter-state", states);

    //get  shape values and populate list
    shapes = data.map(d=>d.shape);
    populateList("filter-shape", shapes);
}

function populateList(list, data){
    var uniqueData = data.filter((val, key, shapes)=> data.indexOf(val) == key);

    d3.select("#" + list).selectAll("option").remove();
    uniqueData.forEach(function(item){
        d3.select("#" + list).append("option").attr("value", item).text(item);
    });
}

//load the table
displayTable(data);
populateLists(data)