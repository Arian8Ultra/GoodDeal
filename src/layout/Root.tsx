import { Outlet, useNavigate } from "react-router-dom"
import { usePersistStore } from "../stores/PersistStore"
import { useEffect } from "react"

function Root() {
  const token = usePersistStore((state) => state.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate("/home")
    } else {
      navigate("/login")
    }
  }, [token, navigate])
  
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Root