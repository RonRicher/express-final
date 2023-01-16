import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import File from '../components/file';
import Folder from '../components/folder';
import NavBar from './NavBar';


function InsideFolder() {
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname.split('/');
    url.shift();
    url.shift();
    const currentFolderName = url.join('/');
    console.log(currentFolderName)
    const [folderFiles, setFolderFiles] = useState([]);

    useEffect(() => {
        getfiles();

    }, [location]);

    async function getfiles() {
        const userName = localStorage.getItem('userName');

        try {
            const res = await fetch(`http://localhost:8000/drive/getFiles/${userName}/${currentFolderName}`);
            const data = await res.json();
            setFolderFiles(data);
            console.log(folderFiles);
        }
        catch (err) {
            console.log(err);
        }
    }

    function enterFolder(folderName) {
        navigate(`${currentFolderName}/${folderName}`);
        getfiles();
    }


    return (
        <>
            <NavBar />

            <div className="App">
                <h1>{currentFolderName}</h1>
                {<div className='allFiles'>{folderFiles?.map((file) => typeof file !== 'object' ?
                    <File key={Math.random() * 0.5} name={file} /> :
                    <button key={Math.random() * 0.5} className='folderBtn' onClick={() =>
                        enterFolder(file.folderName)}>
                        <Folder key={Math.random() * 0.5} name={file.folderName} /></button>)}</div>}
            </div>
        </>
    );
}

export default InsideFolder;
