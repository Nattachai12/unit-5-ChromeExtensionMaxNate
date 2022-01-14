let restaurantData;
fetch("https://documenu.p.rapidapi.com/restaurants/zip_code/90210?size=15&top_cuisines=true", {
  "method": "GET",
  "headers": {
    "x-api-key": "3c27fa52f750a7b5b4ccb874fd3a58b5",
    "x-rapidapi-host": "documenu.p.rapidapi.com",
    "x-rapidapi-key": "ba076f7b93msh8e3347cd6aac09bp15401ajsn8b5099fd086b",
  },
})
.then(response => response.json())
.then(data => restaurantData = data)
.catch(err => {
  console.error(err);
});
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


