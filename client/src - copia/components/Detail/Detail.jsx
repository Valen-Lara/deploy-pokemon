import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../../Redux/Actions";
import Loading from "../imagenes/loading";
import style from "./Detail.module.css"


export default function Detail(props){
    const dispatch = useDispatch()                   //sirve para usar redux con react
    const history = useHistory()
    /* const id = props.match.match.params.id */
    const {id} = useParams()

    useEffect(() => {                    //renderiza el componente, esta atento a los componentes que cambian
        dispatch(getDetail(id))
        return ()=>{
            dispatch(clearDetail())
        }
    },[dispatch,id])

    const myPokemon = useSelector((state) => state.detail)

    
    return (
        <div>
            <div className={style.backImg}>
        <div className={style.Detail}>

            </div>
        <div>
            {
                myPokemon.name ?
            <div className={style.allConteiner}>
                <h2 className={style.name}>{myPokemon.name}</h2>
                <img className={style.imagen} src={myPokemon.img} alt={`${myPokemon.name} not found`}/>

                <div className={style.conteiner} >
                <h3 className={style.ataque}>Ataque: {myPokemon.attack}</h3>
                <h3 className={style.defensa}>Defensa: {myPokemon.defense}</h3>
                <h3 className={style.vida}>Vida: {myPokemon.hp}</h3>
                <h3 className={style.velocidad}>Velocidad: {myPokemon.speed}</h3>
                <h3 className={style.altura}>Altura: {myPokemon.height}</h3>
                <h3 className={style.peso}>Peso: {myPokemon.weight}</h3>
                </div>
            </div> : 
                <div>
                    <Loading/>
                <p className={style.cargando}>Cargando...</p>
                </div>
            }
            <div className={style.backBtn} onClick={() => history.goBack()}>Volver</div>
        </div>
        </div>
        </div>
    )
}

    // eslint-disable-next-line no-lone-blocks
    {/* <h1>Soy {myPokemons[0].name}</h1>
    <img src={myPokemons[0].img? myPokemons[0].img : myPokemons[0].image} alt="" width="500px" height="700px"/>
    <h4>Vida: {myPokemons[0].hp}</h4>
    <h4>Ataque: {myPokemons[0].attack}</h4>
    <h4>Defensa: {myPokemons[0].defense}</h4>
    <h4>Velocidad: {myPokemons[0].speed}</h4>
    <h4>Altura: {myPokemons[0].height}</h4>
    <h4>Peso: {myPokemons[0].weight}</h4>
    <h2>Tipos: {myPokemons[0].types}</h2>
    <h3> ataque: {myPokemons.attack}</h3> */}