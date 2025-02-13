import React, {useState} from "react";

const Calculator = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState(null)
    const [extraComponents, setExtraComponents] = useState([])

    const handleButtonClick = (value) => {
      if(value==='='){
        try {
          const resultInput=input.replace(/[^0-9+\-*/().%]/g,'')
          const calculatedResult=new Function('return '+ resultInput)()
          setResult(calculatedResult)
        } catch (error) {
          setResult('Error')
        }
      }
      else if(value==='C'){
        setInput('')
        setResult(null)
      }
      else{
        setInput((prev)=>prev+value)
      }
    }

    const handleDragStart=(e,component)=>{
      e.dataTransfer.setData('component',component)
    }

    const handleDrop=(e)=>{
      const component=e.dataTransfer.getData('component')
      setExtraComponents((prev)=>[...prev , component])
      e.preventDefault()

    }
    return (
    <>
    {/*The main content*/}
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 p-4">
      
      {/*The Left content-extracomponents*/}

      <div className="w-full md:w-1/4 bg-white p-4 rounder-lg shadow-lg mb-4 md:mb-0">
        <h2 className="text-md font-normal mb-3">Extra Components</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {['%','MC'].map((item)=>(
            <div key={item}
            className="bg-gray-300 p-4 rounded-md text-center text-xl font-medium cursor-pointer"
            draggable
            onDragStart={(e)=>handleDragStart(e,item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/*The Right content-calculator*/}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
      onDragOver={(e)=>e.preventDefault()}
      onDrop={handleDrop}
      >
        {/*Display area*/}
        <div className="w-full text-right p-3 mb-2 bg-gray-200 rounded-md text-xl font-semibold h-12 flex items-center justify-end">
          {input||'0'}
        </div>

        {/*Result area*/}
        {result!==null && (
          <div className="w-full text-right p-3 mb-3 bg-gray-400 rounded-md text-xl font-semibold h-12 flex items-center justify-end">
            {result}
          </div>
        )}

        {/*Number and operation*/}
        <div className="grid grid-cols-4 gap-2 w-full">
          {['7','8','9','/'].map((item)=>(
            <button key={item}
            className="bg-gray-300 p-4 rounded-md text-xl font-medium hover:bg-gray-400"
            onClick={()=>handleButtonClick(item)}>
              {item}
            </button>
          ))}
          {['4','5','6','*'].map((item)=>(
            <button key={item}
            className="bg-gray-300 p-4 rounded-md text-xl font-medium hover:bg-gray-400"
            onClick={()=>handleButtonClick(item)}>
              {item}
            </button>
          ))}
          {['1','2','3','-'].map((item)=>(
            <button key={item}
            className="bg-gray-300 p-4 rounded-md text-xl font-medium hover:bg-gray-400"
            onClick={()=>handleButtonClick(item)}>
              {item}
            </button>
          ))}
          {['0','C','=','+'].map((item)=>(
            <button key={item}
            className={`p-4 rounded-md text-xl font-medium ${item==='='?'bg-blue-400 text-white hover:bg-blue-500':'bg-gray-300 hover:bg-gray-400'} `}
            onClick={()=>handleButtonClick(item)}>
              {item}
            </button>
          ))}

        </div>
        {/*Extra component drop area*/}
        <div className="mt-4 w-full grid grid-cols-4 gap-2">
          {extraComponents.map((comp,index)=>(
            <button
            key={index}
            className="bg-gray-400 p-4 rounded-md text-xl font-medium text-white"
            onClick={()=>handleButtonClick(comp)}>
              {comp}
            </button>
          ))}
        </div>
      </div>
      {/*End*/}
    </div>
    </>
  )
};

export default Calculator;