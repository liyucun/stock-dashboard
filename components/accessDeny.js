import { useRouter } from 'next/router';

export default function AccessDeny() {
    const router = useRouter();
  
    return <section className="bg-white dark:bg-gray-900 ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">403 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white text-3xl">Access Denied</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Please Login to visit the dashboard.</p>
  
          <div className="flex items-center mt-6 gap-x-3">
            <button onClick={() => router.push('/')} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  }