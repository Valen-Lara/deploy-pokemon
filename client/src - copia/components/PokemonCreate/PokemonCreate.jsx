import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemons, getTypes } from "../../Redux/Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./PokemonCreate.module.css";

/*function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  }  else if(!input.hp){
        errors.hp = 'Debe ser un numero entre 1 y 100' 
    } else if((input.attack) >= 1 && (input.attack) <= 50){
        errors.attack = 'Debe ser un numero entre 1 y 200'
    } else if(!input.defense){
        errors.defense = 'Debe ser un numero entre 1 y 200'
    } else if(!input.speed){
        errors.speed = 'Debe ser un numero entre 1 y 200'
    } else if(!input.height){
        errors.height = 'Debe ser un numero entre 1 y 200'
    } else if(!input.weight){
        errors.weight = 'Debe ser un numero entre 1 y 200' 
    }  else if (!input.types.length > 3) {
    errors.types = "Solo puedes seleccionar 3 tipos";
  }
  return errors;
}*/

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
    img: "",
  });

  function handleChange(e) {
    //maneja cada vez que se cambia mi input
    setInput({
      ...input,
      [e.target.name]: e.target.value, //e.target.name es dinamico depende el target.
    });
    /* setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );*/
  }



  /* function handleCheck(e) {
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    } */

  function handleSelect(e) {
    if(input.types.length === 3) return 
    if(input.types.includes(e.target.value)) return 
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemons(input));
    alert("Pokemon creado!!!");
    setInput({
      name: "",
      hp: null,
      attack: null,
      defense: null,
      speed: null,
      height: null,
      weight: null,
      types: [],
      img: "",
    })
    return setTimeout(() =>{
      history.push("/home")
    },1000)
  }
  

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={style.backImg}>
      <div className={style.allConteiner}>
        <Link className={style.noLine} to="/home">
          <button className={style.btnInicio}>Inicio</button>
        </Link>

        <div className={style.pruebaIzq}>
          <h1 className={style.createPokemon}>Creá tu pokemon!</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={style.nombre}>
              <label>Nombre: </label>
              <input
                type="text"
                placeholder="Ingrese un Nombre"
                value={input.name}
                name="name"
                minLength="1"
                maxLength="10"
                onChange={(e) => handleChange(e)}
                required
              />

            </div>

            <div className={style.divRange}>
              <label className={style.vida}>Vida:</label>
              <input
                value={input.hp}
                type="number"
                min="1"
                max="200"
                name="hp"
                onChange={(e) => handleChange(e)}
                required
              />
              {/* {errors.hp && <p className="error">{errors.hp}</p>} */}
            </div>

            <div className={style.divRange}>
              <label className={style.ataque}>Ataque: </label>
              <input
                value={input.attack}
                type="number"
                min="1"
                max="200"
                name="attack"
                onChange={(e) => handleChange(e)}
                required
              />

              {errors.attack && <p className="error">{errors.attack}</p>}
            </div>

            <div className={style.divRange}>
              <label className={style.defensa}>Defensa: </label>
              <input
                type="number"
                min="1"
                max="100"
                value={input.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className={style.divRange}>
              <label className={style.velocidad}>Velocidad: </label>
              <input
                type="number"
                min="1"
                max="100"
                value={input.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className={style.divRange}>
              <label className={style.altura}>Altura: </label>
              <input
                type="number"
                min="1"
                max="100"
                value={input.height}
                name="height"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className={style.divRange}>
              <label className={style.peso}>Peso: </label>
              <input
                type="number"
                min="1"
                max="100"
                value={input.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className={style.divRange}>
              <label className={style.imagen}>Imagen: </label>
              <input
                type="url"
                value={input.img}
                name="img"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <select onChange={(e) => handleSelect(e)} required>
              {types?.map((el) => (
                <option name={el.name} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <button className={style.submitButton} type="submit">
              Crear Pokemon
            </button>

            {errors.types && <p className="error">{errors.types}</p>}
            {/* <p>{input.types.join(", ")}</p> */}
          </form>

          <div>
            {input.types.map((el) => (
              <div className={style.types}>
                {<p className={style.tipos}>{el}</p>}
                <button className={style.btnX} onClick={() => handleDelete(el)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
