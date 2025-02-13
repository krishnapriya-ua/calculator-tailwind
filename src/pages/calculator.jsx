import React, {useState} from "react";
import useStore from "../zustand/store";
const Calculator = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState(null)
    const [darkMode, setDarkMode] = useState(false)
    const {
      extraComponents,
      buttonOrder,
      addExtraComponent,
      removeExtraComponent,
      setButtonOrder,
    } = useStore();
  
    const availableExtraComponent=['%','MC','sqrt','1/x']

    const handleButtonClick = (value) => {
      if(value==='='){
        try {
          const resultInput=input.replace(/[^0-9+\-*/().%√]/g, "")
          const correctedInput = resultInput.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

          const calculatedResult=new Function('return '+ correctedInput)()
          setResult(calculatedResult)
        } catch (error) {
          setResult('Error')
        }
      }
      else if(value==='C'){
        setInput('')
        setResult(null)
      }
      else if(value==='sqrt'){
        setInput((prev) => prev + "√");
      }
      else{
        setInput((prev) => (prev === "0" ? value : prev + value));
      }
    }

    const handleDragStart=(e,component,rowIndex,colIndex)=>{
      e.dataTransfer.setData('component',JSON.stringify({component,rowIndex,colIndex}))
    }

    const handleDrop=(e,targetRowIndex,targetColIndex)=>{
      const data=JSON.parse(e.dataTransfer.getData('component'))
      const {component,rowIndex,colIndex}=data;

      if(rowIndex!==undefined && colIndex!==undefined){
        if(rowIndex===targetRowIndex && colIndex===targetColIndex){
          return
        }
        const updateOrder=[...buttonOrder]
        const temp=updateOrder[rowIndex][colIndex]
        updateOrder[rowIndex][colIndex]=updateOrder[targetRowIndex][targetColIndex]
        updateOrder[targetRowIndex][targetColIndex]=temp

        setButtonOrder(updateOrder)
        e.preventDefault()
      }

      else if(!extraComponents.includes(component)){
        addExtraComponent(component)
        e.preventDefault()
      }

    }

    const handleRemoveComponent=(componenttoremove)=>{
      removeExtraComponent(componenttoremove)
    }

    const handleDragOver=(e)=>{
      e.preventDefault()
    }
    return (
    <>
     <div className={`min-h-screen p-4 ${darkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>

      {/* Theme Toggle Button */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2  mb-4 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h6 className="text-xxl text-center p-4 font-bold dark:bg-black dark:text-white">CALCULATOR-BUILDER</h6>

    {/*The main content*/}
    <div className={`flex flex-col md:flex-row items-start mb-4 justify-center ${darkMode ? "bg-black" : "bg-gray-100"} p-4`}>

     
      {/*The Left content-extracomponents*/}

      <div  className={`w-full md:w-1/4 p-4 rounded-lg shadow-lg ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <h2 className="text-md font-normal mb-3">Extra Components</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
          {availableExtraComponent.map((item)=>(
            <div key={item}
            className={`p-4 rounded-md text-center text-xxl font-normal cursor-pointer border border-white ${darkMode ? "bg-black text-white" : "bg-gray-300 text-black"}`}
            draggable
            onDragStart={(e)=>handleDragStart(e,item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/*The Right content-calculator*/}
      <div className={`w-full md:w-1/3 p-6 rounded-lg shadow-xl flex flex-col items-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
      onDragOver={handleDragOver}
      
      >
        {/*Display area*/}
        <div className={`w-full text-right p-3 mb-2 rounded-md text-xl font-semibold h-12 flex items-center justify-end border border-white ${darkMode ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
          {input||'0'}
        </div>

        {/*Result area*/}
        {result!==null && (
          <div className={`w-full text-right p-3 mb-3 rounded-md text-xl font-semibold h-12 flex items-center justify-end border border-white ${darkMode ? "bg-black text-white" : "bg-gray-400 text-black"}`}>
            {result}
          </div>
        )}

        {/*Number and operation*/}
        <div className="w-full">
          {buttonOrder.map((row,rowIndex)=>(
            <div key={rowIndex} className="grid grid-cols-4 gap-2 w-full mb-2">
              {row.map((item,colIndex)=>(
                <button
                key={colIndex}
                className={`p-4 rounded-md text-xl font-medium border border-white 
                  ${darkMode ? "bg-black text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}                           
                draggable
                onDragStart={(e)=>handleDragStart(e,item,rowIndex,colIndex)}
                onDrop={(e)=>handleDrop(e,rowIndex,colIndex)}
                onDragOver={handleDragOver}
                onClick={()=>handleButtonClick(item)}>
                  {item}
                </button>
              ))}
            </div>
          ))}

        </div>
        {/*Extra component drop area*/}
        <div className="mt-4 w-full grid grid-cols-4 gap-2">
          {extraComponents.map((comp,index)=>(
            <div key={index} className="relative">
            <button
            
            className={`p-4 rounded-md text-xxl font-medium border border-white ${darkMode ? "bg-black text-white" : "bg-gray-400 text-black"}`}
            onClick={()=>handleButtonClick(comp)}>
              {comp}
            </button>
            <span
            className="absolute top-0 left-11 w-5 h-5 text-xxl bg-black text-white text-center rounded-full flex items-center justify-center cursor-pointer z-10"
            onClick={() => handleRemoveComponent(comp)}
            >
             x
            </span>
            </div>
          ))}
        </div>
      </div>
      {/*End*/}
    </div>
    </div>
    </>
  )
};

export default Calculator;