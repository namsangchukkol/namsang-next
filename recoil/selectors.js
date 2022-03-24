import { selector } from "recoil";
import useSWR from "swr";
import fetcher from "../helper/fetcher";


export const commonDataSelector = selector({
    key: 'selectorCommonData',
    get: () => {
        const { data, error } = useSWR('/api/common', fetcher)
        return data && data.json()
    }
})