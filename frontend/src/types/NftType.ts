export interface IAddNft{
    name: string;
    description:string;
    price:number;
    auctionEndTime: Date | null ;
    image?: string;
    collection?:string
}