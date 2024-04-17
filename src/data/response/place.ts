export interface Place {
    id: string
    name: string;
    type: placeTypes | null;
    place_image: string;
    location: string;
    description: string;
    url: string;
}

export interface LatestPlaceResponse{
    data: Place[]
    total: number
}


export enum placeTypes {
    restaurant = "restaurant",
    cafeRestaurant = "cafeRestaurant",
    cafe = "cafe",
    hotel = "hotel",
    adventure = "adventure",
  }

