import Navbar from "@/app/Layout/header"


const Layout = ({children}) => {
  return (
    <div className={''}>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout