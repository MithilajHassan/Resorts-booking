import { useEffect } from 'react'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { setAdminAuth } from '../../slices/authSlice'
import { useVerifyAdminQuery } from '../../slices/resortAdminApiSlice'

export default function PrivateRoute() {
  const { data } = useVerifyAdminQuery(null)
  const { adminInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (data?._id) {
      dispatch(setAdminAuth({
        _id: data?._id!,
        name: data?.name!,
        email: data?.email!,
        avatar: data?.avatar!
      }))
    }
  }, [data])

  return adminInfo ? <Outlet /> : <Navigate  to="/admin/signin" />
}