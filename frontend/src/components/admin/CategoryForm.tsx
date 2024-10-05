import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input"
import { useAddCategoryMutation } from "../../slices/adminApiSlice";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const formSchema = z.object({
  category: z.string().trim().regex(/^[a-z A-Z]+$/,{message:"Only letters are allowed."}).min(2, {
    message: "Category must be at least 2 letters.",
  }).max(25, { message: "Category must be at most 25 letters." })
})

const CategoryForm = () => {

  const [addCategory] = useAddCategoryMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const res = await addCategory({category:values.category}).unwrap()
        if(res.success){
            form.reset({category:""})
            toast('Success')
        }
    
    } catch (err:any) {
        if (err?.data) toast(err.data.message)
        console.log(err)
    }
  }


  return (
      <Form {...form}>
    <div className="shadow w-7/12 my-5 rounded-md">
        <ToastContainer/>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-6 mx-12">
        <h3 className="font-bold text-center text-xl">Add Category</h3>
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
            <Button className="bg-blue-700 hover:bg-blue-400 w-40" type="submit">ADD</Button>
        </div>
    </form>
    </div>
    </Form>
  )
}

export default CategoryForm