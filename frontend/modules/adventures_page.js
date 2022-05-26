
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let ind=search.indexOf("=");
  return search.slice(ind+1);

}
// let btn=document.getElementById("newAdventure");
// btn.addEventListener('click',()=>{
//   const post =fetch("adventures/new",{
//     method: "POST",
//     body:JSON.stringify({
//       city: "London"
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8"
// }
// });
// });
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint+"/adventures?city="+city;
  try{
  let response = await fetch(url);
  let data=await response.json();
  return data;
  }catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(adventure => {
    const {id, name, costPerHead, currency, image, duration, category} = adventure;
    let wrapper = document.createElement("div");
    wrapper.className = "col-12 col-sm-6 col-lg-3 mb-4";
    let cardLink = document.createElement("a");
    cardLink.id=`${id}`;
    cardLink.href= `detail/?adventure=${id}`;
    let cardBody = document.createElement("div");
    cardBody.className = "activity-card";
    let cardImg = document.createElement("img");
    cardImg.src = image;
    cardBody.append(cardImg);
    let categoryDiv = document.createElement("div");
    categoryDiv.className = "category-banner";
    categoryDiv.innerHTML = `<p>${category}</p>`;
    cardBody.append(categoryDiv);
    let infoDiv=document.createElement("div");
    infoDiv.setAttribute("class","w-100 mt-3");
    let div1=document.createElement("div");
    div1.setAttribute("class","text-center d-md-flex justify-content-between p-md-3");
    div1.innerHTML=`<h5>${name}</h5>`+`<p>₹${costPerHead}</p>`
    let div2=document.createElement("div");
    div2.setAttribute("class","text-center d-md-flex justify-content-between p-md-3");
    div2.innerHTML=`<h5>Duration</h5>`+ `<p>${duration} Hours</p>`;
    infoDiv.append(div1);
    infoDiv.append(div2);
    cardBody.append(infoDiv);
    cardLink.append(cardBody);
    wrapper.append(cardLink);
    document.getElementById("data").append(wrapper);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
