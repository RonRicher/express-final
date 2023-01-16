import React, { useState } from "react";
import Image from './images.jpeg';



function Folder(props){
    return(
        <>
            <div className='fileContainer'>{props.name}<br />
                {/* <h6 style={{ backgroundColor: `salmon` }}>{info ? info : null}</h6> */}
                <img src={Image} alt=""  width='180px' height='130px'/>
            </div>
        </>
    )
}



export default Folder;
