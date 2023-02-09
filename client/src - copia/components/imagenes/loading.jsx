import React from "react";
import img from "./pikachu.gif"


export default function Loading(){
    return(
        <div >
            <img src={img} alt="spinnerImg" />
        </div>
    )
}