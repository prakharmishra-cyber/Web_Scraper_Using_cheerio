const request = require("request");
const express = require("express");
const cheerio = require("cheerio");
const fs = require("fs");

const app = express();
app.use(express.json());

var title, release, rating;

var json = {
  title: "",
  release: "",
  rating: "",
};

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/scrape", (req, res) => {
  const url = "https://www.imdb.com/title/tt2379713/?ref_=tt_sims_tt_i_1";
  request(url, (error, response, html) => {
    const $ = cheerio.load(html);
    const dat = $("div > h1").html();
    const dat2 = $(".iTLWoV").html();
    const dat3 = $(".jedhex").html();

    json.title = dat;
    json.release = dat3;
    json.rating = dat2;

    fs.appendFile(
      "output.json",
      JSON.stringify(json, null, 4),
      function (err) {
        console.log("file created successfully");
      }
    );
    res.send("File was created check your directory");
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
