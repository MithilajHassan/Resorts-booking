import FilterSidebar from '../../components/users/ResortFilter'
import SearchBar from '../../components/users/SearchBar'
import UserHeader from '../../components/users/UserHeader'
import SearchResults from '../../components/users/SearchResults'
import SortResorts from './../../components/users/ResortSort';

const SearchResultsPage = () => {


    return (
        <>
            <UserHeader />
            <div className='mt-16'>
                <SearchBar />
                <div className='flex justify-center w-full'>
                    <FilterSidebar />
                    <div className='w-full'>
                        <SortResorts/>
                        <SearchResults />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResultsPage