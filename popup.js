let restaurants;

let changeColor = document.getElementById("changeColor");
const border = document.querySelector('#border');
const title = document.querySelector('#title');
const body = document.querySelector('body');
const textBoxZip = document.getElementById('zipCode');
const sendButton = document.getElementById('search');
const resetButton = document.getElementById('reset');

function reset(){ 
  
  document.getElementById('restName').remove();
  document.getElementById('phoneNum').remove();
  const newPhoneNum = document.createElement('td');
  const restResult = document.createElement('td');
  restResult.setAttribute('id','restName');
  newPhoneNum.setAttribute('id','phoneNum');
  document.getElementById('appendSearch').appendChild(restResult);
  document.getElementById('appendSearch').appendChild(newPhoneNum);

  document.getElementById('prResult').remove(); 
  document.getElementById('zcResult').remove();
  const newZcResult = document.createElement('td');
  const newPrResult = document.createElement('td');
  newZcResult.setAttribute('id', 'zcResult');
  newPrResult.setAttribute('id', 'prResult');
  document.getElementById('appendResult').appendChild(newZcResult);
  document.getElementById('appendResult').appendChild(newPrResult);
}
resetButton.addEventListener('click', reset);

const textBoxPrice = document.getElementById('priceRange');
sendButton.addEventListener('click', () => {
  const userInput = textBoxZip.value;
  fetch(`https://documenu.p.rapidapi.com/restaurants/zip_code/${userInput}?fullmenu=true&page=1`, {
    "method": "GET",
    "headers": {
      "x-api-key": "979e10c3615fc8cceecc3e172ff0606f",
      "x-rapidapi-host": "documenu.p.rapidapi.com",
      "x-rapidapi-key": "ba076f7b93msh8e3347cd6aac09bp15401ajsn8b5099fd086b",
    },
  })
  .then(response => response.json())
  .then(data => {
    restaurants = data;
    priceRange(textBoxPrice.value);
    zipCode(textBoxZip.value);
    getName(textBoxPrice.value,textBoxZip.value);
  })
  .catch(err => {
    console.error(err);
  });
  // priceRange(textBoxPrice.value);
  // zipCode(textBoxZip.value);
  // getName(textBoxPrice.value,textBoxZip.value);
} );

//Give a total num of restaurant that fit in the criteria
function priceRange(searchStr){
  let output = 0;
  for(let i = 0; i < restaurants.data.length; i++){
    let cost = restaurants.data[i]["price_range"];
    if (cost === searchStr) output += 1;
  }
  const priceTag = document.createElement('p');
  if(searchStr === ''){priceTag.innerText = restaurants.data.length}
  else {priceTag.innerText = output}
  document.getElementById('prResult').appendChild(priceTag);
}

function zipCode(searchStr) {
  let output = 0;
  for(let i = 0; i < restaurants.data.length; i++){
    let zip = restaurants.data[i].address.postal_code;
    if(zip === searchStr) output += 1;
  }
  const zipTag = document.createElement('p');
  zipTag.innerText = output;
  document.getElementById('zcResult').appendChild(zipTag);
}

function getName (searchStr,zip) {
  let i = 1;
  for (let j = 0; j < restaurants.data.length; j++) {
    const restaurant = restaurants.data[j];
    let cost = restaurant["price_range"];
    if((searchStr === '' || searchStr === cost) && restaurant.address.postal_code === zip){
      //     textBoxPrice.setAttribute("value", searchStr)}
      const tag = document.createElement('p');
      tag.innerText = `${i}. ${restaurant.restaurant_name}`;
      document.getElementById('restName').appendChild(tag);

      const phoneNum = document.createElement('p');
      phoneNum.innerText = restaurant.restaurant_phone;
      document.getElementById('phoneNum').appendChild(phoneNum);
      i++;
    }
  }
}


// const restaurants = {"data":[ 
//   {
//     "restaurant_name":"Foo Chow Restaurant",
//     "restaurant_phone":"(213) 485-1294",
//     "restaurant_website":"",
//     "hours":"Tue-Sun: 11am-10:30pm ",
//     "price_range":"$$",
//     "price_range_num":2,
//     "cuisines":[""],
//     "address":{
//       "city":"Chinatown",
//       "state":"CA",
//       "postal_code":"90012",
//       "street":"949 N Hill St",
//       "formatted":"949 N Hill St Chinatown, CA 90012"
//     }
//   },
//   {
//   "restaurant_name":"Johnny Rockets",
//   "restaurant_phone":"(213) 687-8206",
//   "restaurant_website":"",
//   "hours":"Mon-Thu: 11am-11pm Fri-Sat: 11am-12am Sun: 11am-10pm",
//   "price_range":"$$",
//   "price_range_num":2,
//   "cuisines":["Burgers", "Diner", "Hot Dogs"],
//   "address":{
//   "city":"Los Angeles",
//   "state":"CA",
//   "postal_code":"90012",
//   "street":"131 S Central Ave",
//   "formatted":"131 S Central Ave Los Angeles, CA 90012",
//   }
//   },
//   {
//   "restaurant_name":"Crepes De Paris",
//   "restaurant_phone":"(213) 972-9099",
//   "restaurant_website":"http:///ca/los-angeles/761441-crepes-de-paris/",
//   "hours":"",
//   "price_range":"$",
//   "price_range_num":0,
//   "restaurant_id":34057438118252868,
//   "cuisines":[""],
//   "address":{
//   "city":"Los Angeles",
//   "state":"CA",
//   "postal_code":"90011",
//   "street":"123 South Figueroa Street",
//   "formatted":"123 South Figueroa Street Los Angeles, CA 90012"
//   }}]}