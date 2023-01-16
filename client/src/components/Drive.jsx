import React, { useState } from 'react';



function Drive() {

  const [info, setInfo] = useState("");
  const [data, setData] = useState("");



  async function readInfo() {
    const fileName = 'ggg.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/info/${fileName}`);
      const data = await res.json();
      console.log(data)
      const object = {
        'blocks: ': data.blocks,
        'Created: ': data.birthtime,
        'Size: ': data.size
      }
      
      setInfo(JSON.stringify(object));
      // setInfo(data);
    }
    catch (error) {
      console.log(error);
    }
  }



  async function showData() {
    const fileName = 'ggg.txt';
    try {
      const res = await fetch(`http://localhost:8000/drive/show/${fileName}`);
      const data = await res.json();
      setData(data);
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
    const deleteFile = 'ggg.txt';
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
      <div className='fileContainer'>file 1.txt<br />
      <h6 style={{ backgroundColor: `salmon` }}>{info}</h6>
      </div>
      <div>
        <br />

        <h2 style={{ backgroundColor: `green` }}>{data}</h2>
        <button onClick={readInfo}>info</button>
        <button onClick={showData}>show data</button>
        <button onClick={deleteFile}>delete file</button>
        <button onClick={moveFile}>move file</button>
        <button onClick={rename}>rename file</button>
        <button onClick={copyFile}>copy file</button>
      </div>
    </div>
  );
}

export default Drive;
