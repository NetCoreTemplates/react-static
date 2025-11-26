import { type FC } from "react"

type Props = {
  title: string,
  className?: string,
  bodyClass?: string,
  children: React.ReactNode,
}

const Page: FC<Props> = ({ title, className, bodyClass, children }) => {
  return (
    <>
      <div className="min-h-screen">
        <main>
          <div className={`max-w-7xl mx-auto px-5 ${className ?? ''}`}>
            <div className={bodyClass ?? 'max-w-5xl'}>
              <h1 className="text-center text-4xl font-bold my-8 text-gray-900 dark:text-gray-100">{title}</h1>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Page