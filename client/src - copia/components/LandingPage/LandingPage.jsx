import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {getPokemons} from '../../Redux/Actions/index.js';
import style from './LandingPage.module.css'


export default function LandingPage(){
    const dispatch = useDispatch()
    useEffect(() => dispatch(getPokemons()),[dispatch])
    // eslint-disable-next-line no-unused-vars
    const {pokemons, pokemonsDb, allPokemons} = useSelector(state => state)         //state objeto con 3 arrays(pokemons,opkemonsDb,allPokemons)
    return(
        <div className={style.landingPage}>
            <div className={style.backimg}>
            <h1 className={style.title}>Bienvenidos</h1>
            <Link to='/home'>
                <button className={style.landButton}>Ingresar</button>
            </Link>
            </div>
        </div>
    )
}
