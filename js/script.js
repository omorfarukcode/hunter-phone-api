const phoneLoad = async (searchText="iphone" , isShowAll) => {
  const respons = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  // console.log(respons);
  const data = await respons.json();
  // console.log(data.data);
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // console.log(phone);

  const phonesContainer = document.getElementById("pdones-container");

  //   Clear Phone Container Card Befor Adding New Card
  phonesContainer.textContent = "";

  //   Display Show All Button If There Are More Then 9 Phones
  const showAllButtonContainer = document.getElementById("show-all-container");
  if (phones.length > 9 && !isShowAll) {
    showAllButtonContainer.classList.remove("hidden");
  }else{
    showAllButtonContainer.classList.add('hidden');
  };

  // console.log("isShowAll", isShowAll);
  //   Display Only Fast 9 Phones || if not show all
  if(!isShowAll){
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    // console.log(phone);

    // 2 Create Element
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl  mt-5";
    // 3 Set inner HTML
    phoneCard.innerHTML = `
        <figure class="px-10 pt-5">
              <img src="${phone.image}" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;
    // 4 Append Child
    phonesContainer.appendChild(phoneCard);
  });
  // Hide Loading Spinner 
  toggleLoadingSpenner(false);

};

const showDetailsHandler = async (id) => {
  // console.log("showDetailsHandler",id)
  // Load singgle Phone Data
  const respons = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await respons.json();
  const phone = data.data;
  // console.log(phone);
  showPhoneData(phone);

}

const showPhoneData = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const releaseDate = document.getElementById("show-detail-release-date");
  releaseDate.innerText = phone.releaseDate;
  show_details_modal.showModal();
}

// Search Hendeler
function searchHendeler(isShowAll) {
  // console.log("searchHendeler");

  // Show Loading Spinner
  toggleLoadingSpenner(true);

  const searchField = document.getElementById("search-field");
  const fieldText = searchField.value;
  // console.log(fieldText);
  phoneLoad(fieldText , isShowAll);
}

const toggleLoadingSpenner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove("hidden");
  }else{
    loadingSpinner.classList.add('hidden');
  } 
}

// Show All Handler Btn 
const showAllHandler= () => {
  searchHendeler(true);
}


phoneLoad()