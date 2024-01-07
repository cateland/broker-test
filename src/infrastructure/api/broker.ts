import { simulateApiCall } from "../utils/simulateCall";
import { PREFERED_LIST, COMPLETE_LIST } from "./mock/broker";

export function getPrefered() {
  return simulateApiCall(PREFERED_LIST, 1, 100);
}

export function filter(searchTerm: string) {
  // mock here what a filter backend service would do
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return simulateApiCall(
    COMPLETE_LIST.filter(
      (broker) =>
        broker.legalName.toLowerCase().includes(lowerCaseSearchTerm) ||
        broker.address.toLowerCase().includes(lowerCaseSearchTerm) ||
        broker.city.toLowerCase().includes(lowerCaseSearchTerm),
    ).slice(0, 5),
    1,
    1000,
  );
}
