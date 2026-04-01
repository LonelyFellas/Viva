import IpApi from "@/api/public/ip"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useRef } from "react"
export default function Home() {
    const ipApi = useRef(new IpApi())
    const { data } = useQuery({
        queryKey: ["home"],
        queryFn: async () => await ipApi.current.getIpInfo()
    })

    const countryCodeToFlag = useMemo(() => data?.country_code?.trim()
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2)
        .replace(/./g, (char) =>
            String.fromCodePoint(127397 + char.charCodeAt(0))
        ), [data?.country_code])

    return (
        <div>
            <h1>本地的地理位置信息</h1>
            <div>国家: {countryCodeToFlag} - {data?.country}</div>
            <div>城市: {data?.city}</div>
            <div>地区: {data?.region}</div>
            <div>时区: {data?.timezone}</div>
            <div>经度: {data?.longitude}</div>
            <div>纬度: {data?.latitude}</div>
            <div>偏移: {data?.offset}</div>
            <div>组织: {data?.organization}</div>
            <div>邮编: {data?.postal_code}</div>
            <div>isp: {data?.isp}</div>
            <div>ip: {data?.ip}</div>
        </div>
    )
}