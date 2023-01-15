import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [info , setInfo] = useState('')

  async function readInfo(){
    let fileName  = 'names.txt'
    const res = await fetch(`http://localhost:8000/drive/${fileName}`)
    const data = await res.json()
    setInfo(data)
    console.log(data) 
  }



  return (
    <>
      <button onClick={readInfo}>readfile</button>
      <h1>{info}</h1>
    </>
  );
}

export default App;
