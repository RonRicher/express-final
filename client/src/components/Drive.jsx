import React, { useState } from 'react';



function Drive() {

  const [info, setInfo] = useState("");


  async function readInfo() {
    const fileName = 'file.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/${fileName}`);
      const data = await res.json();
      setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function deleteFile() {
    const deleteFile = 'file.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/${deleteFile}`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      });
      // console.log(data)
      // setInfo(data);
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
        <button onClick={readInfo}>info</button></div>
        <div>file 1.txt<br />
        <h1 style={{ backgroundColor: `salmon` }}>{info}</h1>
        <button onClick={readInfo}>info</button>
        <button onClick={deleteFile}>delete file</button></div>
    </div>
  );
}

export default Drive;
