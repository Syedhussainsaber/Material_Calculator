import React, { useEffect, useState } from 'react'
import { Input,List,Card,Button } from 'antd'

const OneRoomEstimation = () => {

const [allInputValues, setallInputValues] = useState(null)
const [totalLength, setTotalLength] = useState(null)
const [allOutputValues, setallOutputValues] = useState(null)
const inputFields = ["roomDim","ssHeight","wallThickness", "doorDim", "windowDim", "f1Dim", "f2Dim", "plinthDim", "ccDim"]

const data = [
  {
    title: 'Excavation of foundation',
    content:allOutputValues?.excavation
    
  },
  {
    title: 'Cement concrete in foundation',
    content:allOutputValues?.cc
  },
  {
    title: 'Brick work in footing 1',
    content:allOutputValues?.f1
  },
  {
    title: 'Brick work in footing 2',
    content:allOutputValues?.f2
  },
  {
    title: "Brick work in plinth",
    content: allOutputValues?.plinth
  },
  {
    title:"Super Structure",
    content:allOutputValues?.ss
  }
];

useEffect(()=>{
  handleOutput()
},[totalLength])

 
const handleOutput= ()=>{
  if(totalLength){
    const excavation = (totalLength)*(parseFloat(allInputValues.ccDim[1]) + parseFloat(allInputValues.f1Dim[1]) + parseFloat(allInputValues.f2Dim[1]))*(parseFloat(allInputValues.ccDim[0]))

    const cc =totalLength*(parseFloat(allInputValues.ccDim[1]))*(parseFloat(allInputValues.ccDim[0]))
   const f1 = totalLength*(parseFloat(allInputValues.f1Dim[1]))*(parseFloat(allInputValues.f1Dim[0]))
   const f2=totalLength*(parseFloat(allInputValues.f2Dim[1]))*(parseFloat(allInputValues.f2Dim[0]))
   const plinth=totalLength*(parseFloat(allInputValues.plinthDim[1]))*(parseFloat(allInputValues.plinthDim[0]))
   const ss=totalLength*(allInputValues.ssHeight)*(allInputValues.wallThickness)

    const outputData = {
      excavation: excavation,
      cc : cc,
      f1:f1,
      f2:f2,
      plinth:plinth,
      ss:ss
    }
    setallOutputValues(outputData)
  }  
}



const handleSubmit= async()=>{
  if(allInputValues){
inputFields.forEach((input)=>(allInputValues[input]=allInputValues[input].split(", ")))
  // if(!Array.isArray(allInputValues.roomDim)){
  //   allInputValues.roomDim = allInputValues.roomDim.split(",")
  // }
  //  if(!Array.isArray(allInputValues.f1Dim)){
  //   allInputValues.f1Dim = allInputValues.f1Dim.split(",")
  //  }
    
  //  if(!Array.isArray(allInputValues.f2Dim)){
  //   allInputValues.f2Dim = allInputValues.f2Dim.split(",")
  //  }
  
  //  if(!Array.isArray(allInputValues.ccDim)){
  //   allInputValues.ccDim = allInputValues.ccDim.split(",")
  //  }
   
  // if(!Array.isArray(allInputValues.plinthDim)){
  //   allInputValues.plinthDim = allInputValues.plinthDim.split(",")
  // }  
  allInputValues.wallThickness = parseFloat(allInputValues.wallThickness)
  allInputValues.ssHeight = parseFloat(allInputValues.ssHeight)

  }
  
      const lL = 2*(parseFloat((allInputValues.roomDim[1]) )+ (allInputValues.wallThickness))
      const sL=  2*(parseFloat((allInputValues.roomDim[0])) + allInputValues.wallThickness)
  
  setTotalLength(lL+sL)
  
  // setallOutputValues({...allOutputValues,cc :totalLength*(allInputValues.ccHeight)*(allInputValues.ccWidth)})
  // setallOutputValues({...allOutputValues,f1:totalLength*(allInputValues.f1Height)*(allInputValues.f1Width)})
  // setallOutputValues({...allOutputValues,f2:totalLength*(allInputValues.f2Height)*(allInputValues.f2Width)})
  // setallOutputValues({...allOutputValues,plinth:totalLength*(allInputValues.plinthHeight)*(allInputValues.plinthWidth)})
  // setallOutputValues({...allOutputValues,ss:totalLength*(allInputValues.ssHeight)*(allInputValues.roomThickness)})
  // setNetQuantity(Object.values(allOutputValues))
  }


// setallInputValues({
//   roomDim:"",
//   roomThickness:"",
//   ssHeight:"",
//   plinthDim:"",
//   f1Dim:"",
//   f2Dim:"",
//   ccDim:""
// })


  return (
<section id='one-room-estimation'>
  {
    inputFields?.map((input, id)=> (<div key={id} className="inputs">
    <label>{input.includes("ssHeight") ? "Height of the super structure" : input.includes("wallThickness") ? "Thickness of wall":`Width, Length of the ${input.replaceAll("Dim", "")}`}  (in Meters):</label>
    <Input size='small' type='text' placeholder={input.includes("ssHeight") ? "Height" : input.includes("wallThickness") ? "Thickness":'Width, Length'} onChange={(e)=> setallInputValues({...allInputValues, [input]:(e.target.value)})}/>    
    </div>))
  }

{console.log(allOutputValues)}
{console.log(allInputValues)}

<Button onClick={()=>handleSubmit()}>Submit</Button>

{
  totalLength ?
  <>
<p>Total Length : {totalLength}m</p>
<List
    grid={{
      gutter: 16,
      column: 4,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>{item.content} m^3</Card>
      </List.Item>
    )}
  />
  </>
:<></>
}
</section>
  )
}
export default OneRoomEstimation