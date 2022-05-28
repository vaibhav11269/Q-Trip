import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities().catch(err=>console.log("Fetch Unsuccesful"));
  // console.log("From init()");
  // console.log(config.backendEndpoint);
  // console.log(cities);
  // //Updates the DOM with the cities
  cities.forEach((key) => {
    if(key.id==="singapore"){
      key.image="https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    }
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url = config.backendEndpoint+"/cities"
  try{
    let data = await fetch(url);
    let response = await data.json();
    return response;
  }catch(err){
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let wrapper = document.createElement("div");
  wrapper.className = "col-12 col-sm-6 col-lg-3 mb-4";
  let cardLink = document.createElement("a");
  cardLink.id=`${id}`;
  cardLink.href= `pages/adventures/?city=${id}`;
  let cardBody = document.createElement("div");
  cardBody.className = "tile";
  let cardImg = document.createElement("img");
  cardImg.src = image;
  cardBody.append(cardImg);
  let infoDiv =document.createElement("div");
  infoDiv.className="tile-text";
  infoDiv.innerHTML = `<h5>${city}</h5>`+`<p>${description}</p>`;
  cardBody.append(infoDiv);
  cardLink.append(cardBody);
  wrapper.append(cardLink);


  document.getElementById("data").append(wrapper);

}

export { init, fetchCities, addCityToDOM };
