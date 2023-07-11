import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

  return (
    <div className="h-screen md:flex">
      <div
        className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">AMD Stock Dashboard</h1>
          <p className="text-white mt-1">Reat Time Stock Price Data Simulator</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">By @will</p>

          <button onClick={(e) => {
            e.preventDefault()
            if (session) {
              router.push('/dashboard');
              return
            } else {
              signIn(undefined, { callbackUrl: '/dashboard'})
            }
          }} className="block w-full bg-indigo-600 mt-4 py-2 px-8 rounded-2xl text-white font-semibold mb-2">Login with Github</button>

        </form>
      </div>
    </div>
  )
}
