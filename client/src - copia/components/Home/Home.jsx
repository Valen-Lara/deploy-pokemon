import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterFrom, filterType, applyFilter, sortBy, applySort, updatePage } from "../../Redux/Actions/index.js";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loading from "../imagenes/loading.jsx";
/* import PokemonCreate from "../CreatePokemon/CreatePokemon.jsx"; */
import style from "./Home.module.css";


export default function Home() {    
  const dispatch = useDispatch();      //me habilita usar las acciones de redux 

  const allPokemons = useSelector((state) => state.pokemons);
  const filterFromState = useSelector((state) => state.filterFrom);
  const filterTypeState = useSelector((state) => state.filterType);

  /* const allTypes = useSelector((state) => state.types); */

  const [filters, setfilters] = useState({from: filterFromState, type: filterTypeState});  //creo un estado local react,(me permite tener los 2 filtors en 1)
  const currentPage = useSelector((state) => state.currentPage);
  const sort = useSelector((state) => state.sort);
      
  const [, setOrden] = useState('');                 
  /* const [currentPage, setCurrentPage] = useState(1);*/                        //(decalro un estado)pagina actual que va a empezar en 1 
  const [pokemonsPerPage, /* setPokemonsPerPage */] = useState(12);       //(declaro otro estado local)pokemons por pagina que empiezan en 12
  const indexOfLastPokemon = currentPage * pokemonsPerPage //12           //personajes por pagina por mis pokemons en mi pagina
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);       //¡const importnant!   que pokemons hay que renderizar dependiendo la pagina
  
  
  const paginado = (pageNumbers) => {           
    dispatch(updatePage(pageNumbers));
  }

  useEffect(() => {
    if(allPokemons.length <= 0) dispatch(getPokemons());
    dispatch(applyFilter())                                          //cuando ejecuto los dispatch se vuelve a ejecutar los componentes
    dispatch(applySort())
    setfilters({from:filterFromState, type: filterTypeState})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  
  /* useEffect(() =>{ 
  }, [allPokemons, sort, filterFromState, filterTypeState, filters, currentPage] ) */
 


  /* useEffect(()=>{
    dispatch(applyFilter());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filterTypeState, filterFromState]) */

  //volver a cargar todos los pokemons
  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(filterFrom("todos"))
    dispatch(filterType("todos"))
    dispatch(sortBy("todos"))
    dispatch(getPokemons());
    dispatch(updatePage(1));
    setfilters({from:"todos", type:"todos"})
  }

  function handleSort (e){
    e.preventDefault();                          //hace que no se recargue la pagina cuando se ejecuta un evento
    dispatch(sortBy(e.target.value))
    dispatch(updatePage(1));
    setOrden(`Ordenado ${e.target.value}`)
    dispatch(applySort())
  }

  function handleFilterTypes(e){                  //cuando se ejecutan cambia el estado de redux
     dispatch(filterType(e.target.value))         // cambia el estado de filterType en redux y la siguiente linea aplica el filtro con este estado
     dispatch(applyFilter())
     dispatch(updatePage(1));
     setfilters({...filters, type: e.target.value})
    }
    
    function handleFilterCreated(e){
      dispatch(filterFrom(e.target.value))
      dispatch(applyFilter())
      dispatch(updatePage(1));
      setfilters({...filters, from: e.target.value})
  }

  /* function handleChangeStrength(e){
    dispatch(filterStrength(e.target.value));
    setCurrentPage(1)
    setOrden(`OrdenStr${e.target.value}`)
  } */

  /* function handleCleanFilters(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1)
} */

  /* function hanldeFilter */


  return (
    <div className={style.backImg}>

      <div className={style.divLinkBtn}>
      <Link className={style.noLine}to="/pokemons">
        <div className={style.botonCrear}>Creá tu pokemon</div>
      </Link>
      </div>

      <img className={style.imgTitle} src="https://www.freepnglogos.com/uploads/sample-pokemon-logo-10.png" alt="" ></img>
       {/* <button
        onClick={(e) => {handleCleanFilters(e);}}>
        Limpiar los filtros
      </button> */} 
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons= {allPokemons.length}
        paginado= {paginado}
        />
      <button className={style.btnAllPokemons}
        onClick={(e) => {handleResetFilter(e);}}>
        Volver a cargar todos los pokemons
      </button>
      <div>
        <select className={style.filtroCreados} value={filters.from} onChange={e => handleFilterCreated(e)}>   {/*El valor del select va a ser el (e.target.value) que llega a la accion por payload  */}
          <option value="todos">Todos</option>
          <option value="api">Api</option>
          <option value="creados">Creados</option>
        </select>
        <select className={style.filtroOrden} value={sort} onChange={e => handleSort(e)}>
          <option value="todos">Seleccionar orden</option>
          <option value='asc'>Ascendente(A-Z)</option>
          <option value="desc">Descendente(Z-A)</option>
          <option value="poderosos">Poderosos(Mayor-Menor)</option>
          <option value="debiles">Debiles(Menor-Mayor)</option>
        </select>

        <select className={style.filtroTipos} value={filters.type} onChange={e => handleFilterTypes(e)}>
          <option value="todos">Todos</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>

        {/* <select onChange={(e)=> handleFilterTypes(e)} className={style.filtroTipos}>
          <option value="todos">Todos</option>
          {
            allTypes?.map(e => (<option key={e.name} value={e.name}>{e.name.toUpperCase()}</option>))
          }
        </select> */}


        <SearchBar/>

        <div className={style.Cards}>
        {
          currentPokemons.length ?
          currentPokemons && currentPokemons.map((el, i) => <Card key={i} {...el}/>) :
          <div>
          <h3>Cargando Pokemons</h3>
          <Loading/>
          </div>
        }
        </div>
        <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons= {allPokemons.length}
        paginado= {paginado}
        />
        
      </div>
    </div>
  );
}
