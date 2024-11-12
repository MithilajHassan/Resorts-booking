
// import { useListReviewsQuery } from "../../slices/userApiSlice"

interface Props {
    id:string
}

export default function ListReviews({id}:Props) {

    // const { data } = useListReviewsQuery(id)

  return (
    <div className="w-full mb-5 p-4 mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Guests Reviews</h2>
        <div className="grid grid-cols-4 gap-4">
            
        </div>
    </div>
  )
}
