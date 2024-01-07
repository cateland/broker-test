import { v4 as uuidv4 } from "uuid";

type BaseBroker = {
  legalName: string;
  address: string;
  city: string;
  country: string;
};

export type Broker = {
  __type: "broker";
  id: string;
} & BaseBroker;

export function toString(broker: Broker): string {
  return `${broker.legalName} - ${completeAdress(broker)} - ${broker.country}`;
}

export function completeAdress(broker: Broker): string {
  return `${broker.address}, ${broker.city}`;
}

export function createBroker(broker: BaseBroker): Broker {
  return { __type: "broker", id: uuidv4(), ...broker };
}
