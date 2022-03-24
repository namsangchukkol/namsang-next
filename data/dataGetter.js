import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import useSWR from "swr"
import fetcher from "../helper/fetcher"
import { commonData } from "../recoil/atoms"


export const DataGetter = () => {
    const router = useRouter()
    const lang = router.locale
    const { data, error } = useSWR(`/api/common/${lang}`, fetcher)
    const [_data, setData] = useRecoilState(commonData)
    useEffect(() => {
        if (data === undefined) return setData([])
        setData(data)
    }, [data, lang])
    return null
}

