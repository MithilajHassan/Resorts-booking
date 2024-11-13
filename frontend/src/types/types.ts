import { Location } from "@/components/common/LocationSelecting";

export type CategoryDetails = {
    _id:string;
    name:string;
    isDelete:boolean;
}

export type FacilityDetails = {
    _id: string;
    facilityName: string;
    isDelete:boolean;
}

export interface IResort {
    _id?:string;
    resortName:string;
    email:string;
    password?:string;
    address:string;
    city:string;
    phone:string;
    description:string;
    categories:string[] | CategoryDetails[];
    facilities:string[] | FacilityDetails[];
    images:string[];
    isVerify?:boolean;
    isBlock?:boolean;
    location:Location
}

export interface IUser{
    _id:string
    name:string,
    email:string,
    phone?:number,
    password:string,
    walletBalance:number,
    avatar?:string,
    role:string,
    isBlock:boolean
}


export interface ApiError {
    status: number;
    data: {
        message: string;
        success?: boolean;
    };
}

export interface IRoom {
    _id?:string;
    resortId: string; 
    name: string;
    numberOfGuests: number;
    totalRooms: number;
    normalPrice: number;
    offerPercentage: number;
    offerPrice?: number;
    isDeleted?: boolean;
}


export interface IBooking {
    _id?: string;
    userId: string;
    resortId: IResort | string;
    roomId: IRoom | string;
    guestName: string;
    guestPhone: number;
    guestEmail: string;
    guestCount: number;
    checkInDate: Date;
    checkOutDate: Date;
    checkInTime: string;
    checkOutTime: string;
    totalPrice: number;
    paymentMethod?: string;
    paymentStatus?: boolean;
    status?: string;
    transactionId?: string;
}

export interface IReview {
    _id?: string;
    bookingId: string;
    userId: string|{_id:string,name:string,avatar:string};
    resortId: string;
    reviewText: string;
    rating: number; 
    reviewDate?: Date;
}

export interface IWishlist {
    _id?:string,
    userId: string;
    resortId: IResort | string;
    createdAt?: Date;
  }