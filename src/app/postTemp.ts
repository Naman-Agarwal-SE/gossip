export interface postTemp{
    _id:number;
    totalLikes:number;
    likedBy:string[];
    userId:string[]
    url:string|null;
    description:string;
    userDoc:[{username:string}]
}