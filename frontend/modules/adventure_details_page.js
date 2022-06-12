import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const url = new URLSearchParams(search);
  const id = url.get("adventure");
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const adventureDetails = await fetch(config.backendEndpoint +
      `/adventures/detail?adventure=${adventureId}`);
    const data = await adventureDetails.json();
    return data;
  } catch (error) {
    console.log("Cannot Fetch the Adventure Detail" + error);
    
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const header = document.getElementById("adventure-name");
  header.textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  const gallery = document.getElementById("photo-gallery");
  adventure.images.forEach(element => {
    const image = document.createElement("img");
    image.src = element;
    image.className ="activity-card-image";
    gallery.append(image);
  });
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
//   <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  const gallery = document.getElementById("photo-gallery");
  gallery.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  const carouselInnerEle = document.getElementById("inner");
  images.map((image,ind)=>{
    const imageEle = document.createElement("div");
    imageEle.className=`carousel-item ${ind===0?"active":""}`;
    imageEle.innerHTML =`
      <img src=${image} class="activity-card-image">
    `
    // imageEle.className =`"carousel-item" ${ind===0?"active":""}`;
    carouselInnerEle.appendChild(imageEle);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const {available,costPerHead} = adventure;
  if(available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = `${costPerHead}`;
  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let {costPerHead} = adventure;
  let cost=costPerHead*persons;
  document.getElementById("reservation-cost").innerHTML = `${cost}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

 let form=document.getElementById("myForm");
 form.addEventListener("submit",async (event)=>{
   let url=config.backendEndpoint + "/reservations/new";
   event.preventDefault();
   let formElements = form.elements;
   let payLoad={
    name: formElements["name"].value.trim(),
    date: formElements["date"].value,
    person: formElements["person"].value,
    adventure: adventure.id,
   }
   try{
     const res= await fetch(url,{
       method: "POST",
       body:JSON.stringify(payLoad),
       headers:{
         "Content-type": "application/json"
       }
     });
     if(res.ok)
      alert("Success!");
    else
     alert("Failed!");
   }catch(error){
     alert("Failed!");
   }
 })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
