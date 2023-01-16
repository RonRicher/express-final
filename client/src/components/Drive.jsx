import React, { useState } from 'react';



function Drive() {

  const [info, setInfo] = useState("");


  async function readInfo() {
    const fileName = 'ggg.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/info/${fileName}`);
      const data = await res.json();
      setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function deleteFile() {
    const deleteFile = 'ggg.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/delete/${deleteFile}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
      // console.log(data)
      // setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function rename() {
    const fileName = 'ggg.txt';
    const name = prompt('enter file new name')
    try {
      const res = await fetch(`http://localhost:8000/drive/rename/?param1=${name}&param2=${fileName}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        });
      // console.log(data)
      // setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function copyFile() {
    const fileName = 'ggg.txt';
    const folderName = 'hello'
    try {
      const res = await fetch(`http://localhost:8000/drive/copyFile/?param1=
      ${fileName}&param2=${folderName}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
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
      <div className='fileContainer'>file 1.txt<br />
        <h1 style={{ backgroundColor: `salmon` }}>{info}</h1>
      </div>
      <div>
        <br />
        <h1 style={{ backgroundColor: `salmon` }}>{info}</h1>
        <button onClick={readInfo}>info</button>
        <button onClick={deleteFile}>delete file</button>
        <button onClick={rename}>rename file</button>
        <button onClick={copyFile}>copy file</button>
      </div>
    </div>
  );
}

export default Drive;
