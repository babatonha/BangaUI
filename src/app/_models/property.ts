export interface Property{
    propertyId : number;
    ownerId : number;
    ownerName : string;
    assignedLawyerId : number;
    statusID : number;
    statusName : string;
    assignedLawyerName : string;
    propertyTypeId : number;
    propertyTypeName : string;
    squreMeters: number;
    cityId : number;
    cityName : string;
    provinceId : number;
    provinceName : string;
    address : string;
    price : number;
    description :string;
    numberOfRooms : number;
    numberOfBathrooms : number;
    parkingSpots : number;
    thumbnailUrl: string;
    youtubeUrl : string;
    hasLawyer : boolean;
    numberOfLikes : number;
    isActive: boolean;
    isSold: boolean;
}