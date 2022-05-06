import $ from "cheerio";
import axios from "axios";
import { faker } from "@faker-js/faker";

async function seed(re: number) {
  for(let i = 0; i < re; i++) { handleSeed(); }
}

async function handleSeed() {
  try {
    const res = await axios.get("https://randomlicenseplate.com/license-plate");
    const seedData = {};
    const headings = $.load(res.data)("th");
    const data = $.load(res.data)("td");

    for(let i = 0; i < data.length; i++) {
      const heading = $.load(headings[i]).text().trim().replace(" ", "").toLowerCase();

      if(fields_of_interest[heading]) {
        seedData[fields_of_interest[heading]] = $.load(data[i]).text().trim();
      }
    }

    seedData["registration"] = faker.vehicle.vrm();
    seedData["registrationExpiration"] = Date.parse(new Date().toISOString());
    seedData["nameOnRegistration"] = faker.name.findName();
    seedData["color"] = faker.vehicle.color();
    seedData["fuel"] = faker.vehicle.color();
    seedData["value"] = faker.finance.amount(9000, 120000);
    seedData["mileage"] = faker.finance.amount(113, 78000);

    await axios.post(`http://127.0.0.1:${TYPEORM_PORT}/example-entity`, seedData);
  } catch(e) {
    console.log(e);
  }
}

const fields_of_interest = {
  number: "licensePlate",
  state: "registrationState",
  vin: "vin",
  description: "description",
  registrationyear: "year"
};

const { TYPEORM_PORT } = process.env;

seed(5);