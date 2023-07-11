import { signOut } from "next-auth/react"


// <div>Login with {session?.user.name}</div>
export default function Navbar() {
    return <nav className="relative bg-white shadow dark:bg-gray-800">
    <div className="container px-6 py-4 mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between">
            <a href="/dashboard">
                <img className="w-auto h-6" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg" alt=""/>
            </a>
        </div>

        <div className="z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 mt-0 p-0 top-0 relative bg-transparent w-auto opacity-100 translate-x-0 flex justify-end">
            <div className="flex flex-col">
                <a onClick={() => signOut()} className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 mx-4 my-0" href="#">Logout</a>
            </div>
        </div>
    </div>
</nav>
}