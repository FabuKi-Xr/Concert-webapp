import NumberCard from "@/app/admin/components/numberCard";
import { AdminCardDefault} from "./constants/admin.constants";
import Navbar from '@/app/admin/components/navbar'
import ConcertCard from '@/app/admin/components/concertCard'
import Modal from "@/components/modal";
import { Suspense } from "react";

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

export default async function Page(props : Props) {
    const { searchParams } = props;
    const showModal = searchParams?.modal === "true";
    const concertId = searchParams?.concertId;
    // const [isModalHide,setIsModalHide] = useState(true);
    // const [modalTitle, setModalTitle] = useState("");
    // const ToggleModal = (modalTitle:string) => {
    //     setIsModalHide(!isModalHide);
    //     setModalTitle(modalTitle);
    // }

    // useEffect(() => {
    //     console.log(isModalHide);
    //     console.log(modalTitle);
    // }, [isModalHide,modalTitle])

    return (
        <div className="my-16 mx-10 admin-page">
            <div className="w-full flex flex-row justify-between">
                {
                    Object.entries(AdminCardDefault).map(([key, value]) => {
                        return <NumberCard key={key} seats={1} title={value.title} color={value.color} icon={value.icon} type={key} />
                    })
                }
            </div>
            <div>
                <Navbar/>
                <ConcertCard />
                <ConcertCard />
                {showModal && 
                    (<Suspense key={concertId} >
                        <Modal 
                        title={`Are you sure to delete? “Concert Name 2”`}
                        firstButton="Cancel"
                        secondButton="Yes, Delete"
                        id = {concertId}
                        />
                    </Suspense>
                    )}
            </div>
            
        </div>
    );
}