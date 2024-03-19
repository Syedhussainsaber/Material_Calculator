import React, { useEffect, useState } from 'react'
import { Input,List,Card,Button } from 'antd'

const TwoBhkEstimation = () => {
  
const [allInputValues, setallInputValues] = useState(null)
const [totalLength, setTotalLength] = useState(null)
const [allOutputValues, setallOutputValues] = useState(null)

const inputFields = ["room1Dim", "room2Dim","ssHeight","wallThickness","noOfDoors","doorDim","noOfWindows" ,"windowDim", "f1Dim", "f2Dim", "plinthDim", "ccDim"]


const data = [
  {
    title: 'Excavation of foundation',
    content:allOutputValues?.excavation,
    img: "/excavation.jpeg"
    
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
    title:"Brick work in super structure",
    content:allOutputValues?.ss,
    img:"/superStructure.jpeg"
  }
];

useEffect(()=>{
  handleOutput()
  },[totalLength])

const handleOutput= ()=>{
  if(totalLength){
const excavation = ((totalLength)-((parseFloat(allInputValues?.ccDim[0])/2)*(2)))*(parseFloat(allInputValues?.ccDim[0])) * (parseFloat(allInputValues?.ccDim[1]) +  parseFloat(allInputValues?.f1Dim[1])+ parseFloat(allInputValues?.f2Dim[1])) // here * 2 is No. of T Junctions 
const cc = ((totalLength)-((parseFloat(allInputValues?.ccDim[0])/2)*(2)))*(parseFloat(allInputValues?.ccDim[0])) * (parseFloat(allInputValues?.ccDim[1]))

const f1 = ((totalLength)-((parseFloat(allInputValues?.f1Dim[0])/2)*(2)))*(parseFloat(allInputValues?.f1Dim[0])) * (parseFloat(allInputValues?.f1Dim[1]))

const f2 = ((totalLength)-((parseFloat(allInputValues?.f2Dim[0])/2)*(2)))*(parseFloat(allInputValues?.f2Dim[0])) * (parseFloat(allInputValues?.f2Dim[1]))

const plinth = ((totalLength)-((parseFloat(allInputValues?.plinthDim[0])/2)*(2)))*(parseFloat(allInputValues?.plinthDim[0])) * (parseFloat(allInputValues?.plinthDim[1]))

const ss = (((totalLength)-(((allInputValues?.wallThickness)/2)*(2)))*((allInputValues?.wallThickness)) * ((allInputValues?.ssHeight))) - (parseFloat(allInputValues?.noOfDoors) * (parseFloat(allInputValues?.doorDim[0])*parseFloat(allInputValues?.doorDim[1]) * (allInputValues?.wallThickness) )) - (parseFloat(allInputValues?.noOfWindows) * (parseFloat(allInputValues?.windowDim[0])*parseFloat(allInputValues?.windowDim[1]) * (allInputValues?.wallThickness) ))

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
    console.log(allInputValues, "allInputValues")
    if(!Array.isArray(Object.values(allInputValues)[0])){
      inputFields?.forEach((input)=>{
        allInputValues[input] = allInputValues[input]?.split(", ")
       })
    }
   
  // if(!Array.isArray(allInputValues?.room1Dim)){
  //   allInputValues?.roomDim = allInputValues?.room1Dim.split(", ")
  // }

  // if(!Array.isArray(allInputValues?.room2Dim)){
  //   allInputValues?.roomDim = allInputValues?.room1Dim.split(", ")
  // }

  // if(!Array.isArray(allInputValues?.f1Dim)){
  //   allInputValues?.f1Dim = allInputValues?.f1Dim.split(", ")
  //  }
    
  //  if(!Array.isArray(allInputValues?.f2Dim)){
  //   allInputValues?.f2Dim = allInputValues?.f2Dim.split(", ")
  //  }
  
  //  if(!Array.isArray(allInputValues?.ccDim)){
  //   allInputValues?.ccDim = allInputValues?.ccDim.split(", ")
  //  }
   
  // if(!Array.isArray(allInputValues?.plinthDim)){
  //   allInputValues?.plinthDim = allInputValues?.plinthDim.split(",")
  // }  
  allInputValues.wallThickness = parseFloat(allInputValues?.wallThickness)
  allInputValues.ssHeight = parseFloat(allInputValues?.ssHeight)
  allInputValues.noOfDoors =  parseFloat(allInputValues?.noOfDoors)
  allInputValues.noOfWindows =  parseFloat(allInputValues?.noOfWindows)
  const lL = Math.round(2*(parseFloat((allInputValues?.room1Dim[0])) + parseFloat((allInputValues?.room2Dim[0])) + 2*(allInputValues?.wallThickness))*100)/100

const sL = Math.round(3*(parseFloat((allInputValues?.room1Dim[1])) + 2*(allInputValues?.wallThickness))*100)/100

  
setTotalLength(sL + lL)
  }
  else{
    alert("Please provide the values!")
  }
  

  // setallOutputValues({...allOutputValues,cc :totalLength*(allInputValues?.ccHeight)*(allInputValues?.ccWidth)})
  // setallOutputValues({...allOutputValues,f1:totalLength*(allInputValues?.f1Height)*(allInputValues?.f1Width)})
  // setallOutputValues({...allOutputValues,f2:totalLength*(allInputValues?.f2Height)*(allInputValues?.f2Width)})
  // setallOutputValues({...allOutputValues,plinth:totalLength*(allInputValues?.plinthHeight)*(allInputValues?.plinthWidth)})
  // setallOutputValues({...allOutputValues,ss:totalLength*(allInputValues?.ssHeight)*(allInputValues?.wallThickness)})
  // setNetQuantity(Object.values(allOutputValues))
  }

// setallInputValues({
//   roomDim:"",
//   wallThickness:"",
//   ssHeight:"",
//   plinthDim:"",
//   f1Dim:"",
//   f2Dim:"",
//   ccDim:""
// })
return (
<section id='one-room-estimation'>
{
inputFields?.map((input,id)=>(<div key={id} className="inputs">
<label>{input.includes("ssHeight") ? "Height of the super structure (in Meters):" : input.includes("wallThickness") ? "Thickness of wall (in Meters):": input.includes("noOf") ? input : `Width, Length of the ${input.replaceAll("Dim", "")} (in Meters):`}</label>
<Input size='small' type='text' placeholder={input.includes("ssHeight") ? "Height" :  input.includes("noOf") ? input : input.includes("wallThickness") ? "Thickness":'Width, Length'} onChange={(e)=> setallInputValues({...allInputValues, [input]:(e.target.value)})}/>    
</div>))
}

{/* <div className="inputs">
<label>Thickness of the Wall: (in Meters):</label>
<Input size='small' type='text' placeholder='thickness' onChange={(e)=> setallInputValues({...allInputValues,"wallThickness":(e.target.value)})}/>
</div> */}

{/* <div className="inputs">
<label>Enter Height of the Super Structure: (in Meters):</label>
<Input size='small' type='text' placeholder='height' onChange={(e)=> setallInputValues({...allInputValues,"ssHeight":(e.target.value)})}/>
</div>

<div className="inputs">
<label>Enter Width and Height of the Plinth (in Meters):</label>
<Input size='small' placeholder='width,height' onChange={(e)=> setallInputValues({...allInputValues,"plinthDim":(e.target.value)})} />
</div> */}

{/* <div className="inputs">
<label>Enter the Width and Height Cement Concrete base Width (in Meters):</label>
<Input size='small' placeholder="width,height" onChange={(e)=> setallInputValues({...allInputValues,"ccDim":(e.target.value)})}/>
</div> */}
{console.log(allOutputValues)}

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
          xs:2, md: 4
        }
      // }
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card style={{cursor:"pointer"}} title={item?.title} cover={<img height={"250px"} width={"250px"} src ={item.img} />}> <strong>{Math.round(item.content*100)/100} m^3</strong> (Volume) </Card>
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
export default TwoBhkEstimation