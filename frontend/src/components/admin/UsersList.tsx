import Swal from "sweetalert2"
import { useListUsersQuery, useManageBlockUnblockUserMutation } from "../../slices/adminApiSlice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { toast } from 'react-toastify';

function UsersList() {
    const { data: users = [] } = useListUsersQuery(undefined)
    const [manageUserBlock] = useManageBlockUnblockUserMutation()

    const handleBlockUnblock = async (userId: string, status: boolean) => {
        const action = status ? 'Block' : 'Unblock'
        const result = await Swal.fire({
            title: `Are you sure you want to ${action} this user?`,
            text: `This user will be ${action.toLowerCase()}ed.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: status ? '#d33' : '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: `Yes, ${action} them!`
        });

        if (result.isConfirmed) {
            try {

                const response = await manageUserBlock({ id: userId, status }).unwrap()
                if(response.success){
                    toast(`The user has been ${action.toLowerCase()}ed successfully.`)
                }

            } catch (err) {
                console.error(`Error :`, err)
                toast(`There was a problem ${action.toLowerCase()}ing the user.`)
            }
        }
    }

    return (
        <div className="w-7/12 border border-2 mt-20 rounded-md mx-auto my-5 h-fit">
            <Table className="w-full">
                <TableHeader className="bg-blue-100 text-black h-12">
                    <TableRow>
                        <TableHead className="text-black font-bold">Name</TableHead>
                        <TableHead className="text-black font-bold">Email</TableHead>
                        {/* <TableHead className="text-black font-bold">Phone</TableHead> */}
                        <TableHead className="text-black font-bold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow className="h-10" key={user._id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            {/* <TableCell>{user.phone}</TableCell> */}
                            <TableCell className="text-right">
                                <button
                                    onClick={() => handleBlockUnblock(user._id, !user.isBlock)}
                                    className={`px-3 py-1 text-sm rounded ${user.isBlock
                                        ? 'bg-red-600 text-white hover:bg-red-400'
                                        : 'bg-green-600 text-white hover:bg-green-400'
                                        }`}
                                >
                                    {user.isBlock ? 'Unblock' : 'Block'}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UsersList