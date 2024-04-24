'use server'

import { handleSignOut } from "@/app/Utilities/utils";
import Link from "next/link"
// import { auth } from "../auth";

const Header = async () => {
//   const user = await auth();
  
  return (
    <header className="bg-[#fff] shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <p className="font-bold text-xl text-black header2">Hunt</p>
          </Link>
        </div>
        <div className="">
          <form
            action={handleSignOut}
          >
            <button className="">
              {/* <MdLogout /> */}
              Logout
            </button>
          </form>
        </div>
      </nav>
    </header>
  )
}

export default Header