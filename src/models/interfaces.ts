export interface WorldEvent {
    id: number,
    name: string,
    date: Date,
    peopleCount: number,
    dishes: Dish[]
  }

export interface Dish {
  name: string,
  bringer: string,
  type: DishType
}

export enum DishType {
  main,
  side,
  dessert
}