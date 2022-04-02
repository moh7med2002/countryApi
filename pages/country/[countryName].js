import CountryBox from "../../components/CountryBox"
import { useRouter } from "next/router"
import Image from "next/image"


export default function CountryName({country}){
    let router=useRouter();
    let arrLan=[]
    for (const key in country.languages) {
        if (Object.hasOwnProperty.call(country.languages, key)) {
            const element = country.languages[key];
            arrLan.push(country.languages[key])
        }
    }
    let strLan=arrLan.join(',')
    let arrCurrencies=''
    for (const key in country.currencies) {
        if (Object.hasOwnProperty.call(country.currencies, key)) {
            arrCurrencies=country.currencies[key].name
        }
    }

    let nativeName=''
    for (const key in country.name.nativeName) {
        if (Object.hasOwnProperty.call(country.name.nativeName, key)) {
            nativeName=country.name.nativeName[key].common
        }
    }
    return(
        <div>
            <div className="mt-[40px] container px-6">
                <button onClick={()=>router.push('/')} className="w-[120px] h-[40px] bg-[#ffffff] shadow-md mb-[20px]">
                    back</button>
                <div className="mt-[60px] grid lg:grid-cols-2 gap-[30px] items-center">
                <div>
                    <Image src={country.flags.png} width={'800px'} height={'500px'} unoptimized/>
                </div>
                <div className="p-[20px]">
                    <h4 className="font-bold text-[24px]">{country.name.common}</h4>
                    <div className="flex mt-[20px] mb-[30px] justify-between">
                        <div>
                            <p className=" font-medium mb-[10px]">
                                Native Name: <span className="opacity-[0.65]">{nativeName}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Population: <span className="opacity-[0.65]">{country.population}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Region: <span className="opacity-[0.65]">{country.region}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Sub Region: <span className="opacity-[0.65]">{country.subregion}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Capital: <span className="opacity-[0.65]">{country.capital}</span></p>
                        </div>
                        <div>
                            <p className=" font-medium mb-[10px]">
                                Top Level Domain: <span className="opacity-[0.65]">{country.tld[0]}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Currencies: <span className="opacity-[0.65]">{arrCurrencies}</span></p>
                            <p className=" font-medium mb-[10px]">
                                Languages: <span className="opacity-[0.65]">{strLan}</span></p>
                        </div>
                    </div>
                    {
                        country.borders&&<p>Border Countries: 
                        {
                            country.borders.map((b,index)=>{
                                return <span className="shadow mx-[10px] p-[5px]" key={index+888}>{b}</span>
                            })
                        }</p>
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let {countryName} =context.query
    let str=countryName.toLowerCase()
    const res = await fetch(`https://restcountries.com/v3.1/name/${str}`)
    const data = await res.json()
    console.log(data);
    return {
      props:{
          country:data[0]
      } 
    }
}