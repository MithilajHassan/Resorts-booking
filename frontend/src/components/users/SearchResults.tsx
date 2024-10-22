import { useSelector } from "react-redux";


const SearchResults = () => {
    // const { searchParams, sortBy } = useSelector((state) => state.search)
    // const { data: resorts, isLoading } = useGetResortsQuery(searchParams)
  
    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }
  
    return (
      <div className="w-full sm:w-3/4 p-4">
        {/* {resorts?.map((resort) => (
          <div key={resort.id} className="p-4 border-b">
            <h2 className="text-xl font-bold">{resort.name}</h2>
            <p>{resort.description}</p>
            <p className="text-sm text-gray-500">Rating: {resort.rating}</p>
            <p className="text-sm text-gray-500">Price: ${resort.price}</p>
          </div>
        ))} */}
        
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-bold">resort.name</h2>
            <p>resort.description</p>
            <p className="text-sm text-gray-500">Rating: resort.rating</p>
            <p className="text-sm text-gray-500">Price: resort.price</p>
          </div>
     
      </div>
    );
  };

export default SearchResults