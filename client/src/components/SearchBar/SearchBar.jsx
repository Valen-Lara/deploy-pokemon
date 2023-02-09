import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons} from "../../Redux/Actions";
import style from './SearchBar.module.css';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemons(name/* .toLowerCase() */))
        setName("")
    }

    return(
        <div className={style.barraB}>
            <input
            className={style.barra}
            value={name}
            type="text"
            placeholder = "Buscar Pokemon..." 
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={style.btnBuscar}  type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}