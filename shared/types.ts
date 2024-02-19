export type LeaseModel = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  room_id: string;
  move_in: string;
  signed: boolean;
}


export type RoomModel = {
  id: number;
  propertyId: string;
  address: {
    fullAddress: string;
    roomNumber: string;
    streetAddress: string;
    city: string;
    stateCode: string;
    postalCode: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    belongedCity: string;
  };
  neighborhood: string;
  currencyCode: string;
  marketingName: string;
  propertyName: string;
  floorplanName: string;
  description: string;
  neighborhoodDescription: string;
  propertyDescription: string;
  occupancyType: string;
  bedrooms: number;
  listingSqft: number;
  unitSqft: number;
  images: {
    url: string;
    tag: string;
  }[];
  availableDate: string;
  pricing: {
    minimumStay: number;
    minimumPrice: number;
    maximumPrice: number;
    monthlyPricing: {
      name: string;
      months: number;
      amount: number;
      concessionsApplied: string[];
    }[];
  };
  fees: {
    name: string;
    description: string;
    amount: number;
    isMandatory: boolean;
    isRefundable: boolean;
  }[];
  amenities: string[];
};