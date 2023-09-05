import Head from 'next/head'
import { Radio } from 'antd'
import OneRoomEstimation from './OneRoomEstimation'
import { useState } from 'react'



export default function Home() {

const [oneRoomEstimation, setOneRoomEstimation] = useState(true)
const [twoRoomEstimation, setTwoRoomEstimation] = useState(false)
const [upcoming, setUpcoming] = useState(false)

  return (
    <>
      <Head>
        <title>Construction Calculator App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className='homePage'>
      <h1 className='title'>Construction Material Calculator</h1>
<p>Select the Structure element you want to build</p>
      <Radio.Group buttonStyle="solid" defaultValue={'a'} >
      <Radio.Button  value={'a'} onChange={(e)=>{
        setOneRoomEstimation(true)
setTwoRoomEstimation(false)
setUpcoming(false)
      }}>One Room</Radio.Button>
      <Radio.Button value={'b'} onChange={(e)=>{
        setOneRoomEstimation(false)
setTwoRoomEstimation(true)
setUpcoming(false)
      }}>Two Rooms</Radio.Button>
      <Radio.Button value={'c'} onChange={(e)=>{
        setOneRoomEstimation(false)
setTwoRoomEstimation(false)
setUpcoming(true)
      }}>Upcoming</Radio.Button>

    </Radio.Group>
     {/* <MaterialDropdown/> */}
{
  oneRoomEstimation ? <OneRoomEstimation/>:<></>
}

{
  twoRoomEstimation ? <> <h2>Two Room Estimation</h2>
  <p>Coming Soon...!</p>
  </>:<></>
}

{
  upcoming ? <><h2>1BHK and 2BHK Estimation</h2>
  <p>Coming Soon...!</p>
  </>:<></>
}

</section>
      </main>
    </>
  )
}
