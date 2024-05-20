export interface Concert {
    id: string;
    name: string;
    description: string;
    seats: number;
}

export type ConcertAction = 
| "Delete"
| "Cancel"
| "Reserve";

export interface ReserveConcertResponseData {
    id: string;
    concertName: string;
    userId: string;
    username: string;
    action: ConcertAction
    datetime: string;
}

export interface ReserveConcertCardData extends Concert{
    action: ConcertAction;
}
