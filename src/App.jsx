import { useRef, useState ,useEffect } from "react";
import "./App.css";

function App() {
  const arr = ['', '', '', ''];
  const code="1234";

  const [input, setInputs] = useState(arr);
  const [missing, setMissing] = useState(arr);
  
  const refs=[useRef(),useRef(),useRef(),useRef()];

  useEffect(() => {
      refs[0].current.focus();
  }, []); 

  const handleInputChange =(e,index)=>{
       const val=e.target.value;

       if(!Number(val))return ;
       if(index<input.length-1){
        refs[index+1].current.focus(); 
       }
       const copyInputs=[...input];
       copyInputs[index]=val;
       setInputs(copyInputs)
  }

  const handleOnKeyDown =(e,index)=>{
      if(e.keyCode===8){
        const copyInputs=[...input];
       copyInputs[index]='';
       setInputs(copyInputs);
       if(index>0)refs[index-1].current.focus();
      }
  }

  const handleInputPaste =(e)=>{
      const data=e.clipboardData.getData('text');
      if(!Number(data) || data.length<4 || data.length>4 )return;

      const pasteData=data.split('');
      setInputs(pasteData);
      refs[input.length-1].current.focus();
  }
  
  const handleSubmit =()=>{
         const missed=input.map((item,i)=>{
           if(item===''){
            return i;
           }
         }).filter((item)=>(item || item===0))
         setMissing(missed)
         const userInput=input.join('');
         const isMatch=userInput==code;

         const msg=isMatch?"code is valid":"code is invalid";
         if(!isMatch)setInputs(arr)
         alert(msg)
  }

  return (
    <div className=' flex flex-col items-center mt-20'>
      <h1 className=" text-lg font-bold text-teal-600 m-8">Two Factor Code Input</h1>
      <div className="flex gap-2">
        {arr.map((item, index) => {
          return <input 
          maxLength={1}
          value={input[index]}
          ref={refs[index]}
          className={missing.includes(index)?"w-10 p-1 border border-red-500 text-center" :"w-10 p-1 border border-slate-800 text-center"}
          key={index}
          onChange={(e)=>handleInputChange(e,index)}
          onKeyDown={(e)=>handleOnKeyDown(e,index)}
          onPaste={handleInputPaste}
          >
          
          </input>
        })}
      </div>
      <button 
      className=" bg-emerald-700 p-1 text-white font-bold m-8 rounded-md hover:scale-90"
      onClick={handleSubmit}
      >Submit</button>
    </div>
  );
}

export default App;
