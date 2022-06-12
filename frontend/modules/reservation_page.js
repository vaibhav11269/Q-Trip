import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  let url = config.backendEndpoint+ "/reservations/";
  const reservationDetails = await fetch(url);
  const data = await reservationDetails.json();
  return data;
  }catch(eror){
    console.log("Unable to fetch reservations data");
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length===0){
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
  }
  const reservationTable = document.getElementById("reservation-table");
  reservations.map((reservation,idx) => {
    let date=new Date(reservation.date);
    let time=new Date(reservation.time);
    const options = {year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric'};
    // console.log(time.toLocaleString());
    let row=document.createElement("tr");
    row.innerHTML = `
     <th>${reservation.id}</th>
     <td>${reservation.name}</td>
     <td>${reservation.adventureName}</td>
     <td>${reservation.person}</td>
     <td>${date.toLocaleDateString("en-IN")}</td>
     <td>${reservation.price}</td>
     <td>${time.toLocaleString("en-IN",options)}</td>
     <td>
      <div class="reservation-visit-button" id=${reservation.id}>
        <a href=${config.backendEndpoint}+"/detail/?adventure=${reservation.adventure}">View Adventure</a>
      </div>
     </td>
    `
    reservationTable.appendChild(row);
  });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  
}

export { fetchReservations, addReservationToTable };
