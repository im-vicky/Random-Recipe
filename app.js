const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");
const { url } = require("inspector");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  let url = "https://www.themealdb.com/api/json/v1/1/random.php";
  axios
    .get(url)
    .then((response) => {
      let meal = response.data.meals[0].strMeal;
      let category = response.data.meals[0].strCategory;
      let area = response.data.meals[0].strArea;
      let instructions = response.data.meals[0].strInstructions;
      let thumbnaillink = response.data.meals[0].strMealThumb;
      let link = response.data.meals[0].strYoutube;
      let youtubelink = link.slice(30);
      instructionsArray = instructions.split(",");

      res.render("index", {
        meal: meal,
        category: category,
        area: area,
        instructions: instructionsArray,
        thumbnaillink: thumbnaillink,
        youtubelink: youtubelink,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
