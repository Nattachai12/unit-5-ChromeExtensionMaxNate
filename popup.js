let restaurants;
//grab necessary element from HTML
let changeColor = document.getElementById("changeColor");
const border = document.querySelector('#border');
const title = document.querySelector('#title');
const body = document.querySelector('body');
const textBoxZip = document.getElementById('zipCode');
const sendButton = document.getElementById('search');
const textBoxPrice = document.getElementById('priceRange');

//second arg = appended the new tag with element with this ID
function tagGenerator (tagName, elementID) {
  const tag = document.createElement(tagName);
  document.getElementById(elementID).appendChild(tag);
  return tag;
}

function deleteAndCreate (id, appendedTo) {
  document.getElementById(id).remove();
  const tag = document.createElement('td');
  tag.setAttribute('id', id);
  document.getElementById(appendedTo).appendChild(tag);
}

function fetchData () {
  const dollarSignInput = textBoxPrice.value;
  deleteAndCreate('restName', 'appendSearch');
  deleteAndCreate('phoneNum', 'appendSearch');
  deleteAndCreate('zcResult', 'appendResult');
  deleteAndCreate('prResult', 'appendResult');

  fetch(`https://documenu.p.rapidapi.com/restaurants/zip_code/${textBoxZip.value}?fullmenu=true&page=1`, {
    "method": "GET",
    "headers": {
      "x-api-key": "b616b93bbfa7137e5006a2798384793b",
      "x-rapidapi-host": "documenu.p.rapidapi.com",
      "x-rapidapi-key": "ba076f7b93msh8e3347cd6aac09bp15401ajsn8b5099fd086b",
    },
  })
  .then(response => response.json())
  .then(data => {
    restaurants = data;
    const zipTag = tagGenerator('p', 'zcResult');
    zipTag.innerText = restaurants.data.length;
    priceRange(dollarSignInput);
    getName(dollarSignInput);
  })
  .catch(err => {
    console.error(err);
  });
  // priceRange(textBoxPrice.value);
  // zipCode(textBoxZip.value);
  // getName(textBoxPrice.value,textBoxZip.value);
}

//Give a total num of restaurant that fit in the criteria
function priceRange(searchStr){
  const priceTag = tagGenerator('p', 'prResult');
  if(searchStr === ''){
    priceTag.innerText = restaurants.data.length;
  } else {
    let output = 0;
    for(let i = 0; i < restaurants.data.length; i++){
      let cost = restaurants.data[i]["price_range"];
      if (cost === searchStr) output += 1;
    }
    priceTag.innerText = output;
  }
}

function getName (searchStr) {
  let i = 1;
  for (let j = 0; j < restaurants.data.length; j++) {
    const restaurant = restaurants.data[j];
    let cost = restaurant["price_range"];
    if(searchStr === '' || searchStr === cost){
      const tag = tagGenerator('p', 'restName');
      tag.innerText = `${i}. ${restaurant.restaurant_name}`;

      const phoneNum = tagGenerator('p', 'phoneNum');
      phoneNum.innerText = restaurant.restaurant_phone;
      i++;
    }
  }
}
sendButton.addEventListener('click', fetchData);

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