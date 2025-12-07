import './App.css'
import { DarkModeToggle, SecondaryButton } from '@servicestack/react'
import { AutoUis, ShellCommand, ReactLogo, TailwindLogo, TypeScriptLogo, ViteLogo } from 'react-net-templates'

import HelloApi from './components/HelloApi'
import { appAuth } from './lib/auth'
import { Link } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
    const { user, signOut } = appAuth()
    return (<>
        <div className="mt-40 max-w-screen-xl mx-auto p-8 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <div className="flex gap-8 mb-8 items-end">
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <ReactLogo className="h-32 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] logo-react" />
                </a>
                <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                    <TailwindLogo className="h-36 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" />
                </a>
                <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
                    <TypeScriptLogo className="mb-2 h-28 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" />
                </a>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <ViteLogo className="h-36 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" />
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
                            <img className="h-8 w-8 rounded-full" src={user.profileUrl} alt="User Profile" />
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
                    : (<SecondaryButton href="/profile" className="items-center">
                        🙍🏻‍♂️ My Profile
                    </SecondaryButton>)
                }
            </div>

            <DarkModeToggle />

            <AutoUis className="mt-40 w-full" />

        </div>
        <Footer />
    </>)
}

export default App
