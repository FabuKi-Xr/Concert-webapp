export type ConcertAction = 
|'Reserver' 
|'Cancel'

export interface Transaction {
    id: string
    datetime: string
    username: string
    concertName: string
    action: ConcertAction
}