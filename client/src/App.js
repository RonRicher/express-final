import './App.css';
import React, { useState } from 'react'



function App() {

  const [info, setInfo] = useState("");
  const [filename, setFileName] = useState("");


  async function readInfo() {
    const fileName = 'file.txt'
    try {
      const res = await fetch(`http://localhost:8000/drive/${fileName}`)
      const data = await res.json();
      setInfo(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  async function rename() {
    const fileName = 'file.txt'
    const name = prompt("Please enter the new name")
    try {
      const res = await fetch(`http://localhost:8000/drive/?param1=${name}&param2=${fileName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const data = await res.json();
      setFileName(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  async function copyFile() {
    try {
      const res = await fetch(`http://localhost:8000/drive/${fileName}`)
      const data = await res.json();
      setInfo(data)
    }
    catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="App">
      <h1>welcome to google drive</h1>
      <div>file 1.txt<br />
        <h1 style={{ backgroundColor: `salmon` }}>{info}</h1>
        <button onClick={readInfo}>info</button>
        <button onClick={rename}>rename</button>
        <button onClick={copyFile}>copy file</button>
      </div>


    </div>
  );
}

export default App;
