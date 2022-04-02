import Image from "next/image"
import { useRouter } from "next/router"
export default function CountryBox({country}){
    let router =useRouter();
    return(
        <div className="pb-[20px] shadow cursor-pointer" onClick={()=>router.push(`/country/${country.name.common}`)}>
            <Image src={country.flags.png} width={'400px'} height={'280px'} unoptimized className="mb-[20px]"/>
            <h3 className="pl-[20px] font-bold text-[24px]">{country.name.common}</h3>
            <p className="pl-[20px]">Population: {country.population}</p>
            <p className="pl-[20px]">Region: {country.region}</p>
            <p className="pl-[20px]">Capital: {country.capital}</p>
        </div>
    )
}