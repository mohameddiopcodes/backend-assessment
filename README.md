# Backend Assessment

Here, I've built a set of REST API's to support the functionality expressed within this [UI sketch](https://xd.adobe.com/view/fed5ede8-2626-46ec-a3f9-ec0cba0df6f4-ab86/).

## Technologies used :
- `MySQL`
- `TypeORM`
- `TypeScript`
- `Node.js`
- `Express`
- `routing-controllers`

## Work done :
- Created a Car entity storing all the data present in the [UI sketch](https://xd.adobe.com/view/fed5ede8-2626-46ec-a3f9-ec0cba0df6f4-ab86/) `src/api/models/Car` `(TypeORM/MySQL)`.
- Implemented CRUD for the Car resource `src/api/controllers/Cars` `(routing-controllers/Express)`.
- Wrote a handy seed function to populate the database with relevant data `src/utils/seed`.
-  Used the [NHTSA API](https://vpic.nhtsa.dot.gov/api/) to decode VINs and store the decoded vehicle details `src/utils/decodeVinAndCreateInstance`.

## How to spin up the server :
- `docker-compose up` in the root directory to start MySQL.
- `npm start` in the root directory to start the Express server.
- `node src/utils/seed` in the root directory to populate the database with 5 new entries.

### Assumptions made :
- `doors, seats, fuel, make and model` were assumed to be relevant information to store.
- the server is built into the `./dist` folder, assumed to be ran in production mode.
- `licensePlate, registrationState, vin` and `year` were scrapped from [randomlicenseplate.com](https://randomlicenseplate.com/license-plate).
- `registration`, `nameOnRegistration`, `color`, `fuel`, `value` and `mileage` were generated using [faker](https://fakerjs.dev/guide/#overview).