import React, { useEffect, useState } from 'react'
import { Input,List,Card,Button } from 'antd'

const TwoRoomEstimation = () => {

  
const [allInputValues, setallInputValues] = useState(null)
const [totalLength, setTotalLength] = useState(null)
const [allOutputValues, setallOutputValues] = useState(null)



const data = [
  {
    title: 'Excavation',
    content:allOutputValues?.excavation
    
  },
  {
    title: 'Cement Concrete',
    content:allOutputValues?.cc
  },
  {
    title: 'Footing 1',
    content:allOutputValues?.f1
  },
  {
    title: 'Footing 2',
    content:allOutputValues?.f2
  },
  {
    title: "Plinth",
    content: allOutputValues?.plinth
  },
  {
    title:"Super Structure",
    content:allOutputValues?.ss
  }
];

useEffect(()=>{
  handleOutput()
  },[totalLength,allOutputValues])

const handleOutput= ()=>{
  if(totalLength){
    const excavation = (totalLength)*(parseFloat(allInputValues.ccDim[1]) + parseFloat(allInputValues.f1Dim[1]) + parseFloat(allInputValues.f2Dim[1]))*(parseFloat(allInputValues.ccDim[0]))
    const cc =totalLength*(parseFloat(allInputValues.ccDim[1]))*(parseFloat(allInputValues.ccDim[0]))
   const f1 = totalLength*(parseFloat(allInputValues.f1Dim[1]))*(parseFloat(allInputValues.f1Dim[0]))
   const f2=totalLength*(parseFloat(allInputValues.f2Dim[0]))*(parseFloat(allInputValues.f2Dim[0]))
   const plinth=totalLength*(parseFloat(allInputValues.plinthDim[1]))*(parseFloat(allInputValues.plinthDim[0]))
   const ss=totalLength*(allInputValues.ssHeight)*(allInputValues.roomThickness)

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
  if(!Array.isArray(allInputValues.roomDim)){
    allInputValues.roomDim = allInputValues.roomDim.split(",")
  }
   if(!Array.isArray(allInputValues.f1Dim)){
    allInputValues.f1Dim = allInputValues.f1Dim.split(",")
   }
    
   if(!Array.isArray(allInputValues.f2Dim)){
    allInputValues.f2Dim = allInputValues.f2Dim.split(",")
   }
  
   if(!Array.isArray(allInputValues.ccDim)){
    allInputValues.ccDim = allInputValues.ccDim.split(",")
   }
   
  if(!Array.isArray(allInputValues.plinthDim)){
    allInputValues.plinthDim = allInputValues.plinthDim.split(",")
  }  
  allInputValues.roomThickness = parseFloat(allInputValues.roomThickness)
  allInputValues.ssHeight = parseFloat(allInputValues.ssHeight)

  }
  
      const lL = 2*(parseFloat((allInputValues.roomDim[1]) )+ (allInputValues.roomThickness))
      const sL=  2*(parseFloat((allInputValues.roomDim[0])) + allInputValues.roomThickness)
  
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
<div className="inputs">
<label> Width and Length of the room: (in Meters):</label>
<Input size='small' type='text' placeholder='width,length' onChange={(e)=> setallInputValues({...allInputValues,"roomDim":(e.target.value)})}/>    
</div>

<div className="inputs">
<label>Thickness of the Wall: (in Meters):</label>
<Input size='small' type='text' placeholder='thickness' onChange={(e)=> setallInputValues({...allInputValues,"roomThickness":(e.target.value)})}/>
</div>

<div className="inputs">
<label>Enter Height of the Super Structure: (in Meters):</label>
<Input size='small' type='text' placeholder='height' onChange={(e)=> setallInputValues({...allInputValues,"ssHeight":(e.target.value)})}/>
</div>

<div className="inputs">
<label>Enter Width and Height of the Plinth (in Meters):</label>
<Input size='small' placeholder='width,height' onChange={(e)=> setallInputValues({...allInputValues,"plinthDim":(e.target.value)})} />
</div>

<div className="inputs">
<label>Enter the Width and Height of the Footing 1 (in Meters): </label>
<Input size='small' placeholder="width,height" onChange={(e)=> setallInputValues({...allInputValues,"f1Dim":(e.target.value)})}/>
</div>

<div className="inputs">
<label>Enter the Width and Height of the Footing 2 (in Meters):</label>
<Input size='small' placeholder="width,height" onChange={(e)=> setallInputValues({...allInputValues,"f2Dim":(e.target.value)})}/>
</div>


<div className="inputs">
<label>Enter the Width and Height Cement Concrete base Width (in Meters):</label>
<Input size='small' placeholder="width,height" onChange={(e)=> setallInputValues({...allInputValues,"ccDim":(e.target.value)})}/>
</div>



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
export default TwoRoomEstimation