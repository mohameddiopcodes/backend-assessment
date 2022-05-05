import axios from "axios";
import $ from "cheerio";

const fields_of_interest = {
  number: "licensePlate",
  state: "registrationState",
  vin: "vin",
  description: "description",
  registrationyear: "year"
};


async function seed(re: number) {
  for(let i = 0; i < re; i++) {
    const seedData = {};
    const res = await axios.get("https://randomlicenseplate.com/license-plate");
    const headings = $.load(res.data)("th");
    const data = $.load(res.data)("td");

    for(let i = 0; i < data.length; i++) {
      const heading = $.load(headings[i]).text().replaceAll(" ", "").toLowerCase();

      if(fields_of_interest[heading]) {
        seedData[fields_of_interest[heading]] = $.load(data[i]).text().trim();
      }
    }
    console.log(seedData);
  }
}

seed(5);