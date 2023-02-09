import React from "react";
import { useSelector } from "react-redux";
import styles from "../Paginado/Paginado.module.css"

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = [];

    const currentPage = useSelector((state) => state.currentPage);
    
    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {      //math.ceil(redondea)
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={styles.paginado}>
                { pageNumbers && pageNumbers.map(number =>(
                    <li className={`${styles.listaPaginado}`} key={number}>
                      <div className={`${styles.btnPaginado} ${number === currentPage ? styles.current:""}`} onClick={() => paginado(number)}>{number}</div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
