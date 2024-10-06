import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../ui/input"
import { useAddFacilityMutation, useDeleteFacilityMutation, useUpdateFacilityMutation, useListFacilitiesQuery } from "../../slices/adminApiSlice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { MdDelete, MdEdit } from "react-icons/md"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from 'react'


const formSchema = z.object({
    facilityName: z.string().trim().min(2, {
        message: "Facility name must be at least 2 characters."
    }).max(25, { message: "Facility name must be at most 25 characters." })
})

function FacilityManagement() {

    const { data } = useListFacilitiesQuery(undefined)
    const [deleteFacility] = useDeleteFacilityMutation()
    const [updateFacility] = useUpdateFacilityMutation()
    const [addFacility] = useAddFacilityMutation()
    const [editingFacility, setEditingFacility] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            facilityName: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            const result = await Swal.fire({
                title: editingFacility ? "Confirm Edit" : "Confirm Addition",
                text: `Are you sure you want to ${editingFacility ? 'edit' : 'add'} the facility "${values.facilityName}"?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, ${editingFacility ? 'edit' : 'add'} it!`
            })

            if (result.isConfirmed) {
                if (editingFacility) {
                    const res = await updateFacility({ id: editingFacility, facilityName: values.facilityName }).unwrap();
                    if (res.success) {
                        setEditingFacility(null)
                        form.reset()
                        toast(<div className='text-green-500'>Facility updated successfully!</div>)
                    }
                } else {
                    const res = await addFacility({ facilityName: values.facilityName }).unwrap()
                    if (res.success) {
                        form.reset()
                        toast(<div className='text-green-500'>Facility added successfully!</div>)
                    }
                }
            }

        } catch (err: any) {
            if (err?.data) toast(<div className="text-red-600">{err.data.message}</div>)
            console.log(err)
        }
    }

    async function handleDelete(id: string) {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const res = await deleteFacility( id ).unwrap()
                if (res.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The facility has been deleted.",
                        icon: "success"
                    });
                }
            }
        } catch (err: any) {
            if (err?.data) toast(<div className="text-red-600">Something went wrong</div>)
            console.log(err);
        }
    }

    function handleEdit(id: string, facilityName: string) {
        setEditingFacility(id)
        form.setValue('facilityName', facilityName)
    }

    return (
        <div className="flex flex-col items-center mt-16 w-full">
            <Form {...form}>
                <div className="shadow w-7/12 my-5 rounded-md">
                    <ToastContainer />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-6 mx-12">
                        <h3 className="font-bold text-center text-xl">{editingFacility ? "Edit Facility" : "Add Facility"}</h3>
                        <FormField
                            control={form.control}
                            name="facilityName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facility Name</FormLabel>
                                    <FormControl>
                                        <Input className="bg-indigo-50" placeholder="Enter a facility name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center items-center">
                            <Button className="bg-blue-700 hover:bg-blue-400 w-40" type="submit">{editingFacility ? "EDIT" : "ADD"}</Button>
                        </div>
                    </form>
                </div>
            </Form>

            <Table className="border w-7/12 my-5 mx-auto rounded-md">
                <TableHeader className="bg-indigo-100 text-black h-12">
                    <TableRow>
                        <TableHead className="text-black font-bold">Name</TableHead>
                        <TableHead className="text-black font-bold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow className="h-10" key={item._id}>
                            <TableCell className="font-medium">{item.facilityName}</TableCell>
                            <TableCell className="text-right flex justify-end items-center gap-5">
                                <MdEdit onClick={() => handleEdit(item._id, item.facilityName)} style={{ fontSize: '1.3rem' }} className="text-blue-700 hover:text-blue-400" />
                                <MdDelete onClick={() => handleDelete(item._id)} style={{ fontSize: '1.3rem' }} className="text-red-500 hover:text-red-300" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default FacilityManagement