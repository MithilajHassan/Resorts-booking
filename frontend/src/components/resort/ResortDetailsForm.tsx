import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";


const formSchema = z.object({
  resortname: z.string().min(2, {
    message: "Name must be at least 3 characters.",
  }).max(25, { message: "Name must be at most 25 characters." }).trim(),
  address:z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }).max(50, { message: "Name must be at most 50 characters." }).trim()

})

const ResortDetails = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resortname: "",
      address:"",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }


  return (
    <section className="mt-16 flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField 
            control={form.control}
            name="resortname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resort Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Address" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the address"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  )
}

export default ResortDetails