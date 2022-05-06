import axios from "axios";
import { Car } from "../api/models/Car/Car";

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

  const decoded = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);

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

  return Car.create({
    licensePlate,
    registrationState,
    vin,
    description,
    year,
    registration,
    registrationExpiration: new Date(registrationExpiration).toISOString(),
    nameOnRegistration,
    color,
    fuel,
    value,
    mileage,
    make: decoded.data.Results[0].Make,
    model: decoded.data.Results[0].Model || null,
    type: decoded.data.Results[0].VehicleType || null,
    doors: decoded.data.Results[0].Doors || null,
    seats: decoded.data.Results[0].Seats || null
  }).save();
}