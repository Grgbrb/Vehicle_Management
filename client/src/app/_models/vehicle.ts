import { Photo } from "./photo";

export interface Vehicle{
    id : number;
    photoUrl: string;

    photos: Photo[];

}
