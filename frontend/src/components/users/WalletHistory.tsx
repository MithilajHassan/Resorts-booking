import { format } from "date-fns"
import { IWalletHistory } from "../../types/types"

type Props = {
    histories?: IWalletHistory[]
}

export default function WalletHistory({ histories }: Props) {
    return (
        <div className="w-full">
            <h2 className="text-lg font-bold mb-4">Wallet history</h2>
            {
                histories && histories.length ? histories.map((history) => (
                    <div className="flex justify-between items-center w-full shadow-sm border rounded-md h-10">
                        <p className="font-bold">{history.type}</p>
                        <p className="font-bold">{history.amount}</p>
                        <p className="font-bold">{format(history.createdAt!,'MM-dd-yyyy')}</p>
                    </div>
                )) : (
                    <div className="flex justify-center items-center w-full shadow-sm border rounded-md h-10">
                        <p className="font-bold">There is no history</p>
                    </div>
                )
            }

        </div>
    )
}