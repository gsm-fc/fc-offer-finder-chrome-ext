//get the loader
const loader = document.getElementById('loader');
//get the div to show single offer
const offer = document.getElementById('offer');
//get the div to show multiple offers
const multiOffer = document.getElementById('offers');

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const current = tabs[0];

    //dummy logic
    let apiURL = 'https://jsonkeeper.com/b/Z43A';
    if (current.url.includes('coolwinks')) {
      apiURL = 'https://jsonkeeper.com/b/LIIT';
    } else if (current.url.includes('myvi')) {
      apiURL = 'https://jsonkeeper.com/b/IPDL';
    }

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        let offerMarkup;
        if (Array.isArray(data)) {
          offerMarkup = data
            .map((offer) => {
              return ` <div class="card">
                <div class="img">
                  <img
                    src="${offer.image}"
                    alt="${offer.title}"
                  />
                </div>
                <div>
                  <h2>${offer.title}</h2>
                  <p>${offer.desc}</p>
                  <a href="${offer.url}" class="btn" target="_blank">View Details</a>
                </div>
              </div>`;
            })
            .join('');

          offers.innerHTML = offerMarkup;
          offers.classList.remove('d-none');
        } else {
          offerMarkup = `<div class="img">
            <img
              src="${data.image}"
              alt="${data.title}"
            />
          </div>
          <h2>${data.title}</h2>
          <p>
          ${data.desc}
          </p>
          <a href="${data.url}" class="btn" target="_blank">View Details</a>`;

          offer.innerHTML = offerMarkup;
          offer.classList.remove('d-none');
        }
        loader.classList.add('d-none');
      });
  });
});
