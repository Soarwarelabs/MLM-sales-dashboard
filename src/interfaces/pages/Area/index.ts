export interface AreaData {
    uuid: string,
    name: string,
    city: CityData | null  
}
export interface CityData {
  
    id:string
    name: string
}
export interface AreaFormData {
    name: string,
    city: any
}