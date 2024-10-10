import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input"
import { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../slices/adminApiSlice";
import { useListCategoriesQuery } from "../../slices/adminApiSlice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { MdDelete, MdEdit } from "react-icons/md"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from 'react'

const formSchema = z.object({
    category: z.string().trim().regex(/^[a-z A-Z]+$/, { message: "Only letters are allowed." }).min(2, {
        message: "Category must be at least 2 letters.",
    }).max(25, { message: "Category must be at most 25 letters." })
})


function CategoryManagement() {

    const { data } = useListCategoriesQuery(undefined)
    const [deleteCategory] = useDeleteCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [addCategory] = useAddCategoryMutation()
    const [editingCategory, setEditingCategory] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await Swal.fire({
                title: editingCategory ? "Confirm Edit" : "Confirm Addition",
                text: `Are you sure you want to ${editingCategory ? 'edit' : 'add'} the category "${values.category}"?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, ${editingCategory ? 'edit' : 'add'} it!`
            });

            if (result.isConfirmed) {
                if (editingCategory) {
                    const res = await updateCategory({ id: editingCategory, category: values.category }).unwrap()
                    if (res.success) {
                        setEditingCategory(null)
                        form.reset()
                        toast(<div className='text-green-500'>Category updated successfully!</div>)
                    }
                } else {
                    const res = await addCategory({ category: values.category }).unwrap()
                    if (res.success) {
                        form.reset({ category: "" })
                        toast(<div className='text-green-500'>Category added successfully!</div>)
                    }
                }
            }

        } catch (err: any) {
            if (err?.data) toast(<div className="text-red-600">{err.data.message}</div>)
            console.log(err)
        }
    }

    async function handleDelete(id: unknown) {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })

            if (result.isConfirmed) {
                const res = await deleteCategory({ id }).unwrap()
                if (res.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The category has been deleted.",
                        icon: "success"
                    })
                }
            }
        } catch (err: any) {
            if (err?.data) toast(<div className="text-red-600">Something went wrong</div>)
            console.log(err)
        }
    }
    function handleEdit(id: unknown, category: string) {
        setEditingCategory(id as string)
        form.setValue('category', category)
    }


    return (
        <div className="flex flex-col items-center mt-16 w-full">
            <Form {...form}>
                <div className="shadow w-7/12 my-5 rounded-md">
                    <ToastContainer />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-6 mx-12">
                        <h3 className="font-bold text-center text-xl">{editingCategory ? "Edit Category" : "Add Category"}</h3>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input className="bg-indigo-50" placeholder="Enter a category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center items-center">
                            <Button className="bg-blue-700 hover:bg-blue-400 w-40" type="submit">{editingCategory ? "EDIT" : "ADD"}</Button>
                        </div>
                    </form>
                </div>
            </Form>


            <div className="w-7/12 border border-2 rounded-md mx-auto my-5">
                <Table className="w-full">
                    <TableHeader className="bg-blue-100 text-black h-12">
                        <TableRow>
                            <TableHead className="text-black font-bold">Name</TableHead>
                            <TableHead className="text-black font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow className="h-10" key={item._id as string}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right flex justify-end items-center gap-5">
                                    <MdEdit onClick={() => handleEdit(item._id, item.name)} style={{ fontSize: '1.3rem' }} className="text-blue-700 hover:text-blue-400" />
                                    <MdDelete onClick={() => handleDelete(item._id)} style={{ fontSize: '1.3rem' }} className="text-red-600 hover:text-red-400" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CategoryManagement