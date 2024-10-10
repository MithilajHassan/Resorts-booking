
export type CategoryDetails = {
    _id:string;
    name:string;
    isDelete:boolean;
}

export interface FacilityDetails {
    _id: string;
    facilityName: string;
    isDelete:boolean;
}

export interface IResort {
    _id?:string;
    resortName:string;
    email:string;
    password:string;
    address:string;
    city:string;
    phone:string;
    description:string;
    categories:string[];
    facilities:string[] | FacilityDetails[];
    images:string[];
    isVerify?:boolean;
    isBlock?:boolean;
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