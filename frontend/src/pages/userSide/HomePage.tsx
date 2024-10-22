import SearchSection from '../../components/users/home/SearchSection'
import UserHeader from '../../components/users/UserHeader'
import TrendResorts from '../../components/users/home/TrendResorts'
const HomePage = ()=>{

    return (
        <>
            <UserHeader/>
            <div className="mt-16">
                <SearchSection />
                <TrendResorts />

            </div>
            
        </>
    )
}

export default HomePage