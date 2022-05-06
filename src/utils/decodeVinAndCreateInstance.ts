import axios from "axios";
import { ExampleEntity } from "../api/models/example-entity/example-entity";

export default async function decodeVinAndCreateInstance(
  licensePlate: string,
  registrationState: string,
  vin: string,
  description: string,
  year: string,
  registration: string,
  registrationExpiration: Date,
  nameOnRegistration: string,
  color: string,
  fuel: string,
  value: number,
  mileage: number) {

  const decoded = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}format=json`);

  if(!licensePlate &&
    !registrationState &&
    !vin &&
    !description &&
    !year &&
    !registration &&
    !registrationExpiration &&
    !nameOnRegistration &&
    !color &&
    !fuel &&
    !value &&
    !mileage) {return undefined;}

  return ExampleEntity.create({
    licensePlate,
    registrationState,
    vin,
    description,
    year,
    registration,
    registrationExpiration: Date.parse(new Date(registrationExpiration).toISOString()),
    nameOnRegistration,
    color,
    fuel,
    value,
    mileage,
    make: decoded.data.Results[0].Make,
    model: decoded.data.Results[0].Model,
    type: decoded.data.Results[0].VehicleType,
    doors: decoded.data.Results[0].Doors || 0,
    seats: decoded.data.Results[0].Seats || 0
  }).save();
}