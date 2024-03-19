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
    content:allOutputValues?.excavation,
    img:"/excavation.jpeg"

  },
  {
    title: 'Cement concrete in foundation',
    content:allOutputValues?.cc,
    img:"/cementConcrete.jpeg"
  },
  {
    title: 'Brick work in footing 1',
    content:allOutputValues?.f1,
    img:"/brickWork.jpeg"
  },
  {
    title: 'Brick work in footing 2',
    content:allOutputValues?.f2,
    img:"/brickWork.jpeg"
  },
  {
    title: "Brick work in plinth",
    content: allOutputValues?.plinth,
    img:"/brickWorkPlinth.jpeg"
  },
  {
    title:"Super Structure",
    content:allOutputValues?.ss,
    img:"/superStructure.jpeg"
  }
];

useEffect(()=>{
  handleOutput()
},[totalLength])

 
const handleOutput= ()=>{
  if(totalLength){
    const excavation = (totalLength)*(parseFloat(allInputValues?.ccDim[1]) + parseFloat(allInputValues?.f1Dim[1]) + parseFloat(allInputValues?.f2Dim[1]))*(parseFloat(allInputValues?.ccDim[0]))

    const cc =totalLength*(parseFloat(allInputValues?.ccDim[1]))*(parseFloat(allInputValues?.ccDim[0]))
   const f1 = totalLength*(parseFloat(allInputValues?.f1Dim[1]))*(parseFloat(allInputValues?.f1Dim[0]))
   const f2=totalLength*(parseFloat(allInputValues?.f2Dim[1]))*(parseFloat(allInputValues?.f2Dim[0]))
   const plinth=totalLength*(parseFloat(allInputValues?.plinthDim[1]))*(parseFloat(allInputValues?.plinthDim[0]))
   const ss=totalLength*(allInputValues?.ssHeight)*(allInputValues?.wallThickness)

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
 
  if(allInputValues?.ccDim && allInputValues?.roomDim?.length && allInputValues){
inputFields.forEach((input)=>(allInputValues[input]=allInputValues[input].split(", ")))
  // if(!Array.isArray(allInputValues?.roomDim)){
  //   allInputValues?.roomDim = allInputValues?.roomDim.split(",")
  // }
  const lL = 2*(parseFloat((allInputValues?.roomDim[1]) )+ (allInputValues?.wallThickness))
  const sL=  2*(parseFloat((allInputValues?.roomDim[0])) + allInputValues?.wallThickness)

setTotalLength(lL+sL)
  //  if(!Array.isArray(allInputValues?.f1Dim)){
  //   allInputValues?.f1Dim = allInputValues?.f1Dim.split(",")
  //  }
    
  //  if(!Array.isArray(allInputValues?.f2Dim)){
  //   allInputValues?.f2Dim = allInputValues?.f2Dim.split(",")
  //  }
  
  //  if(!Array.isArray(allInputValues?.ccDim)){
  //   allInputValues?.ccDim = allInputValues?.ccDim.split(",")
  //  }
   
  // if(!Array.isArray(allInputValues?.plinthDim)){
  //   allInputValues?.plinthDim = allInputValues?.plinthDim.split(",")
  // }  
  allInputValues.wallThickness = parseFloat(allInputValues?.wallThickness)
  allInputValues.ssHeight = parseFloat(allInputValues?.ssHeight)

  }
  else {
    alert("Please provide the values!")
  }
  // setallOutputValues({...allOutputValues,cc :totalLength*(allInputValues?.ccHeight)*(allInputValues?.ccWidth)})
  // setallOutputValues({...allOutputValues,f1:totalLength*(allInputValues?.f1Height)*(allInputValues?.f1Width)})
  // setallOutputValues({...allOutputValues,f2:totalLength*(allInputValues?.f2Height)*(allInputValues?.f2Width)})
  // setallOutputValues({...allOutputValues,plinth:totalLength*(allInputValues?.plinthHeight)*(allInputValues?.plinthWidth)})
  // setallOutputValues({...allOutputValues,ss:totalLength*(allInputValues?.ssHeight)*(allInputValues?.roomThickness)})
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

<Button type="primary" size="middle" onClick={()=>handleSubmit()}>Submit</Button>

{
  totalLength ?
  <>
    <p>Total Length : <strong>{totalLength}m</strong></p>
  <div className='outputContainer'>
<List
    grid={{
      gutter: 16,
      // column: 4,
      // xs:{
        column:{
          xs:2, md: 4}
      // }
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card style={{cursor:"pointer"}} title={item?.title} cover={<img height={"250px"} width={"250px"}  src ={item.img} />}> <strong>{Math.round(item.content*100)/100} m^3</strong> (Volume) </Card>
      </List.Item>
    )}
  />
  </div>
  </>
:<></>
}
</section>
  )
}
export default OneRoomEstimation