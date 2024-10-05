import { useListCategoriesQuery } from "../../slices/adminApiSlice"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


function listCategories() {
    const  { data }  = useListCategoriesQuery(undefined)
    console.log(data)
    

    return (
        <Table className="border w-9/12 my-5 mx-auto ">
            <TableCaption>All categories.</TableCaption>
            <TableHeader className="text-black">
                <TableRow>
                    <TableHead className="text-black">Name</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item)=>(
                    <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.isDelete?"Inactive":"Active"}</TableCell>
                        <TableCell className="text-right">
                            Delete, Edit
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default listCategories