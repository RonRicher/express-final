import React, { useState } from 'react';
import './App.css';


function App() {

  const [info, setInfo] = useState("");
  

   async function readInfo(){
    const fileName = 'file.txt'
    try{
      const res = await fetch(`http://localhost:8000/drive/${fileName}`)
      const data = await res.json();
      setInfo(data)
    }
    catch (error){
      console.log(error);
    }
  }
  



  return (
    <div className="App">
     <h1>welcome to google drive</h1> 
     <div>file 1.txt<br/>
     <h1 style={{backgroundColor: `salmon`}}>{info}</h1>
     <button onClick={readInfo}>info</button></div>
    </div>
  );
}

export default App;
