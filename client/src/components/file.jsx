import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Image from './icon.png';



function File(props) {
    const [info, setInfo] = useState("");
    const [data, setData] = useState("");
    const location = useLocation();
    const url = location.pathname.split('/');
    url.shift();
    url.shift();
    const currentPath = url.join('/');

    async function readInfo() {
        const fileName = `${currentPath}/${props.name}`;
        try {
            const res = await fetch(`http://localhost:8000/drive/info/${fileName}`);
            const data = await res.json();
            console.log(data);
            const object = {
                'blocks: ': data.blocks,
                'Created: ': data.birthtime,
                'Size: ': data.size
            };

            setInfo(JSON.stringify(object));
        }
        catch (error) {
            console.log(error);
        }
    }

    async function showData() {
        const fileName = `${currentPath}/${props.name}`;
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
        const fileName = props.name;
        const destination = `hello`;
        try {
            const res = await fetch(`http://localhost:8000/drive/moveFile/?source=${fileName}&destination=${destination}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        catch (error) {
            console.log('clientError: ', error);
        }
    }

    async function deleteFile() {
        const deleteFile = props.name;
        try {
            const res = await fetch(`http://localhost:8000/drive/${deleteFile}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    async function rename() {
        const name = props.name;
        const newName = prompt('Enter new name');
        try {
            const res = await fetch(`http://localhost:8000/drive/rename/?name=${name}&newName=${newName}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    async function copyFile() {
        const fileName = props.name;
        const folderName = prompt('Please enter the name of the folder');
        try {
            const res = await fetch(`http://localhost:8000/drive/copyFile/?name=${fileName}&newName=${folderName}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        catch (error) {
            console.log(error);
        }
    }




    return (
        <>

            <div className='fileContainer'>{props.name}<br />
                <h6 style={{ backgroundColor: `salmon` }}>{info ? info : null}</h6>
                <img src={Image} alt="" width='180px' height='130px' />
                <div>
                    <br />
                    <h2 style={{ backgroundColor: `green` }}>{data ? data : null}</h2>
                    <div className="buttons">
                        <button onClick={readInfo}>info</button>
                        <button onClick={showData}>show data</button>
                        <button onClick={deleteFile}>delete file</button>
                        <button onClick={moveFile}>move file</button>
                        <button onClick={rename}>rename file</button>
                        <button onClick={copyFile}>copy file</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default File;





