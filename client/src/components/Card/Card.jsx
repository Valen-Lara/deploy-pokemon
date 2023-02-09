import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Card/Card.module.css'


export default function Card({name, img, types, attack, defense, speed, height, weight, id}){
    return (
        <div className={style.pokemonCard}>
            <Link className={style.linkCard} to={`/pokemons/${id}`}>
            <h3 className={style.pokemonNameCard}>{name}</h3>
            <img className={style.imgCard} src={img} alt={img}/>
           <h6 className={style.tiposCard}>Tipo: {types + " "}</h6>   {/*  {types?.map(e => `${e.name} `) */}
            {/* {console.log(img)} */}
        </Link>
        </div>
    );
}
