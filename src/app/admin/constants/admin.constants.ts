export type AdminCard = {
    seats: number;
    title: string;
    color: string;
    icon: string;
    type: string;
};

export const AdminCardDefault = {
    seat : {
        title: "Total of seats",
        icon : "/person.svg",
        color: "#0070A4",
    },
    reserve : {
        title: "Reserve",
        icon : "/award.svg",
        color: "#00A58B",
    },
    cancel:{
        title: "Cancel",
        icon : "/cancel.svg",
        color: "#F96464",
    }
}