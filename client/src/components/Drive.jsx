import React, { useState , useEffect } from 'react';
import File from '../components/file'
import Folder from '../components/folder';




function Drive() {

  // const [info, setInfo] = useState("");
  // const [data, setData] = useState("");
  const [driveFiles, setDriveFiles] = useState([]);
  // console.log(driveFiles)

  useEffect(() => {
    getfiles()

}, [])

  async function getfiles() {
    try {
      const res = await fetch("http://localhost:8000/drive/getFiles")
      const data = await res.json();
      setDriveFiles(data);
      console.log(driveFiles)
    }
    catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="App">
      <h1>welcome to google drive</h1>
      {<div>{driveFiles?.map((file) => file.includes('.') ? <File key={Math.random() * 0.5} name={file}/> : <Folder key={Math.random() * 0.5} name={file}/>)}</div>}
      {/* <div className='fileContainer'>file 1.txt<br />
        <h6 style={{ backgroundColor: `salmon` }}>{info}</h6>
      </div>
      <div>
        <br />


<File key={Math.random() * 0.5} name={file}/>


        <h2 style={{ backgroundColor: `green` }}>{data}</h2>
        <button onClick={readInfo}>info</button>
        <button onClick={showData}>show data</button>
        <button onClick={deleteFile}>delete file</button>
        <button onClick={moveFile}>move file</button>
        <button onClick={rename}>rename file</button>
        <button onClick={copyFile}>copy file</button>
      </div> */}


    </div>
  );
}

export default Drive;
