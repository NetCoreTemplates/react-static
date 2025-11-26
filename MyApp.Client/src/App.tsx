import './App.css'
import { DarkModeToggle, SecondaryButton } from '@servicestack/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HelloApi from './components/HelloApi'
import AutoUis from './components/AutoUis'
import ShellCommand from './components/ShellCommand'
import { appAuth } from './lib/auth'
import { Link } from 'react-router-dom'

function App() {
    const { user, signOut } = appAuth()
    return (
        <div className="mt-40 max-w-screen-xl mx-auto p-8 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <div className="flex gap-8 mb-8 items-end">
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                        src={reactLogo}
                        className="h-32 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] logo-react"
                        alt="React logo"
                    />
                </a>
                <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                    <svg className="h-36 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                        <path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0" />
                    </svg>
                </a>
                <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
                    <svg className="mb-2 h-28 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" /><path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 0 1 7.82 4.5a20.6 20.6 0 0 1 3 4c0 .16-5.4 3.81-8.69 5.85c-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 0 0-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.6 4.6 0 0 0 .54 2.34c.83 1.73 2.38 2.76 7.24 4.86c8.95 3.85 12.78 6.39 15.16 10c2.66 4 3.25 10.46 1.45 15.24c-2 5.2-6.9 8.73-13.83 9.9a38.3 38.3 0 0 1-9.52-.1a23 23 0 0 1-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9 9 0 0 1 1.15-.73L82 101l3.59-2.08l.75 1.11a16.8 16.8 0 0 0 4.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 0 0 .69-6.92c-1-1.39-3-2.56-8.59-5c-6.45-2.78-9.23-4.5-11.77-7.24a16.5 16.5 0 0 1-3.43-6.25a25 25 0 0 1-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.7 31.7 0 0 1 9.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49 49 0 0 1 .12-5.17C29.08 59 39 59 51 59h21.83z" />
                    </svg>
                </a>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img
                        src={viteLogo}
                        className="h-36 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
                        alt="Vite logo"
                    />
                </a>
            </div>
            <h1 className="text-7xl font-bold mt-4 mb-8">React .ts / Tailwind</h1>

            <ShellCommand className="my-4">npx create-net react-static MyProject</ShellCommand>

            <HelloApi value="React" className="text-center" />

            <div className="mb-8 flex items-center space-x-4">
            {user
                ? (<>
                    <Link to="/profile" className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50 dark:lg:hover:bg-gray-900 dark:ring-offset-black"
                          id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <img className="h-8 w-8 rounded-full" src={user.profileUrl} alt="User Profile"/>
                        <span className="hidden ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium lg:block">
                            {user.userName}
                        </span>
                    </Link>
                    <div>
                        <SecondaryButton onClick={() => signOut()}>
                            Sign Out
                        </SecondaryButton>
                    </div>
                </>)
                : (<SecondaryButton href="/profile" className="m-2">
                     Sign In
                   </SecondaryButton>)
            }
            </div>

            <DarkModeToggle />

            <AutoUis className="mt-40 w-full" />

        </div>
    )
}

export default App
