const weatherForm = document.querySelector("form");
const search = document.querySelector('input[name="address"]');
const outputText1 = document.querySelector("#output1");
const outputText2 = document.querySelector("#output2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  outputText1.textContent = "Loading...";
  outputText2.textContent = "";

  const location = search.value;

  const base_url = "http://localhost:3000/weather";
  fetch(`${base_url}?address=${encodeURIComponent(location)}`).then(
    (response) => {
      response
        .json()
        .then((data) => {
          if (data.error) {
            outputText1.textContent = data.error;
          } else {
            outputText1.textContent = data.location;
            outputText2.textContent = data.forecast;
          }
        })
        .catch((error) => {
          outputText1.textContent = data.error;
        });
    }
  );
});
