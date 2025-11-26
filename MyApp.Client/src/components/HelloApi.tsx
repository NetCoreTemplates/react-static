import { useState, useEffect } from "react"
import { TextInput, useClient } from "@servicestack/react"
import { ApiResult } from "@servicestack/client"
import { Hello, HelloResponse } from "@/lib/dtos"
import { cn } from "@/lib/utils"

type Props = { value: string, className?: string }
export default ({ value, className }:Props) => {
    const [name, setName] = useState(value)
    const client = useClient()
    const [api, setApi] = useState<ApiResult<HelloResponse>>(new ApiResult())
    
    useEffect(() => {
        (async () => {
            setApi(new ApiResult())
            setApi(await client.api(new Hello({ name })))
        })()
    }, [name])

    return (<div className={cn("my-8 max-w-fit mx-auto", className)}>
        <TextInput id="name" label="API Example" value={name} onChange={setName} />
        {api.error
            ? <div className="ml-2 text-red-500 dark:text-red-400">{api.error.message}</div>
            : <div className="ml-3 mt-2 text-gray-900 dark:text-gray-100">{api.response?.result ?? 'loading...'}</div>}
    </div>)
}
