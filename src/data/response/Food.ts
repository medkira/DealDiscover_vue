export interface Food {
  id: string
  place_id: string
  name: string
  price: number
  //price_category: priceCategory;
  food_type: foodTypes
  menu_id: string
}

export enum foodTypes {
  Appetizer = 'Appetizer',
  MainCourse = 'Main Course',
  Dessert = 'Dessert',
  Beverage = 'Beverage'
  // Add more food types as needed
}
// we can add more attribute here like drink , sweets etc..
// this could help when the user talk to the chat bot

export enum priceCategory {
  Affordable = 'Affordabale',
  Moderate = 'Moderate',
  Expensive = 'Expensive'
}
