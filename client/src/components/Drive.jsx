import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import File from '../components/file';
import Folder from '../components/folder';
import NavBar from './NavBar';




function Drive() {
  const navigate = useNavigate();
  
  const [driveFiles, setDriveFiles] = useState([]);
  console.log(driveFiles);

  useEffect(() => {
    getfiles();

  }, []);

  async function getfiles() {
    const userName = localStorage.getItem('userName');
    console.log(userName);
    try {
      console.log('client');
      const res = await fetch(`http://localhost:8000/drive/getFiles/${userName}`);
      const data = await res.json();
      setDriveFiles(data);
      console.log(driveFiles);
    }
    catch (err) {
      console.log(err);
    }
  }

  function enterFolder(folderName) {
    navigate(`/drive/${folderName}`);
  }


  return (
    <>
      <NavBar />
    
      <div className="App">
        <h1>welcome to google drive</h1>
        <h1>{window.location.pathname}</h1>
        {<div className='allFiles'>{driveFiles?.map((file) => typeof file !== 'object' ?
          <File key={Math.random() * 0.5} name={file} /> :
          <button key={Math.random() * 0.5} className='folderBtn' onClick={() =>
           enterFolder(file.folderName)}>
            <Folder key={Math.random() * 0.5} name={file.folderName} /></button>)}</div>}
      </div>
    </>
  );
}

export default Drive;
