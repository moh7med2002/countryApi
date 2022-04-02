import Head from 'next/head'
import Image from 'next/image'
import { useState , useEffect} from 'react'
import CountryBox from '../components/CountryBox'
import { useRouter } from 'next/router'

export default function Home({countrys}) {
  let [region,setRegion]=useState("")
  let[nameSearch,setSearchName]=useState('');
  let[ countries,setCountries]=useState(countrys)
  let[isLoad,setLoad]=useState(true)
  let router=useRouter();
  function changeRegion(value){
    setRegion(value);
    async function getData(){
      let respone=await fetch(`https://restcountries.com/v3.1/region/${value}`);
      let data= await respone.json();
      setCountries(data)
    }
    if(value!==""){
      getData()
    }
    else{
      async function get(){
        const res = await fetch('https://restcountries.com/v3.1/all')
      const data = await res.json()
      setCountries(data)
      setLoad(true)
      }
      get()
    }
  }



  function searchByName(value){
    setSearchName(value);
    async function getData(){
      let respone=await fetch(`https://restcountries.com/v3.1/name/${value}`);
      let data= await respone.json();
      setCountries(data)
      if(data.length>0){
        setLoad(true)

      }
      else setLoad(false)
    }
    if(value!==""){
      getData()
    }
    else{
      async function get(){
        const res = await fetch('https://restcountries.com/v3.1/all')
      const data = await res.json()
      setCountries(data)
      setLoad(true)
      }
      get()
    }
  }


  return (
    <div className='pt-[30px]'>
          <div className='container px-6'>
            <form className='flex justify-between items-center'>
              <input type={'text'} placeholder='Search for a country...' onChange={(e)=>searchByName(e.target.value)}
              className='w-[400px] outline-none shadow-md h-[50px] p-[10px]'/>
              <select className='w-[200px] outline-none shadow-md h-[50px] p-[10px]'defaultValue={''}
              onChange={(e)=>changeRegion(e.target.value)}>
                <option value={""}>Filter by region</option>
                <option value={'Africa'}>Africa</option>
                <option value={'Americas'}>America</option>
                <option value={'Asia'}>Asia</option>
                <option value={'Europe'}>Europe</option>
                <option value={'Oceania'}>Oceania</option>
              </select>
            </form>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[20px] gap-y-8 mt-[50px]'>
              {isLoad&& countries.map((co,index)=>{
                return <CountryBox country={co} key={index}/>
              })}
            </div>
          </div>
    </div>
  )
}

export async function getStaticProps(){
  const res = await fetch('https://restcountries.com/v3.1/all')
  const data = await res.json()
  console.log(data[0] );

  return{
    props:{
        countrys:data
    }
  }
}