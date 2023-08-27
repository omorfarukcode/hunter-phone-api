const phoneLoad = async (searchText) => {
  const respons = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  // console.log(respons);
  const data = await respons.json();
  // console.log(data.data);
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones);
};


const displayPhone = (phones) => {
  // console.log(phone);

  const phonesContainer = document.getElementById("pdones-container");

  phonesContainer.textContent = "";
  
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
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `;
        // 4 Append Child
        phonesContainer.appendChild(phoneCard);
  });
};

// Search Hendeler 
function searchHendeler(){
    // console.log("searchHendeler");
    const searchField = document.getElementById('search-field');
    const fieldText = searchField.value ;
    // console.log(fieldText);
    phoneLoad(fieldText);

}