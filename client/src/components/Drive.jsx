import React, { useState } from 'react';



function Drive() {

  const [info, setInfo] = useState("");


  async function readInfo() {
    const fileName = 'file.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/info/${fileName}`);
      const data = await res.json();
      setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }


  async function moveFile() {
    const fileName = 'file.txt';
    const destination = `hello`;
    try {
      const res = await fetch(`http://localhost:8000/drive/moveFile/?param1=${fileName}&param2=${destination}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
    }
    catch (error) {
      console.log('clientError: ', error);
    }
  }

  async function deleteFile() {
    const deleteFile = 'file.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/${deleteFile}`,
      {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  async function rename(){
    const name = 'file.txt';
    const newName = prompt('please enter the new name');
    try {
      const res = fetch(`http://localhost:8000/drive/rename/?name=${name}&newName=${newName}`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function copyFile(){
    const name = 'file.txt';
    const folder = prompt('choose folder in directory')
    try {
      const res = fetch(`http://localhost:8000/drive/copyFile/?name=${name}&newName=${folder}`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
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
        <button onClick={deleteFile}>delete file</button>
        <button onClick={moveFile}>move file</button>
        <button onClick={rename}>rename</button>
        <button onClick={copyFile}>copy file</button></div>
    </div>
  );
}

export default Drive;
