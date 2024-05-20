import { CONCERT_API } from "@/lib/constants"
import {Transaction} from "@/.types"


export default async function Page() {
    const response = await fetch(`${CONCERT_API}/transaction`, {next: {revalidate : 60* 1 }})
    const transactions = await response.json();

    return (
        <div >
            <div className="relative overflow-x-auto ">
                <table 
                    className="w-full text-sm text-left border-black border-collapse">
                    <thead className="md:text-base md:text-center lg:text-xl  border-black order-collapse">
                        <tr>
                            <th scope="col" className="border border-black mobile:px-3 md:px-3 lg:px-6 py-3 ">
                                Date time
                            </th>
                            <th scope="col" className="border border-black mobile:px-3 md:px-3 lg:px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="border border-black mobile:px-3 md:px-3 lg:px-6 py-3">
                                Concert name
                            </th>
                            <th scope="col" className="border border-black mobile:px-3 md:px-3 lg:px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction:Transaction) => (
                                <tr key={transaction.id} className="bg-white text-lg ">
                                    <td className="mobile:px-3 md:px-3 lg:px-6 py-4 font-medium border border-black ">
                                        {transaction.datetime}
                                    </td>
                                    <td className="mobile:px-3 md:px-3 lg:px-6 py-4 border border-black">
                                        {transaction.username}
                                    </td>
                                    <td className="mobile:px-3 md:px-3 lg:px-6 py-4 border border-black">
                                        {transaction.concertName}
                                    </td>
                                    <td className="mobile:px-3 md:px-3 lg:px-6 py-4 border border-black">
                                        {transaction.action}
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>

        </div>
    )
}