import axios from "axios";


export function getPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/pokemons');
      dispatch({
        type: "GET_POKEMONS",
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id){
  return async function(dispatch){
    try{
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: 'GET_DETAILS',
        payload: json.data
      })
    }catch(error){
      console.log(error);
    }
  }
}

export function getNamePokemons(name){
  return async function(dispatch){
    try{
      var results = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: results.data
      })
    } catch(error){
      console.log(error)
    }
  }
}

export function getTypes(){
  return async function (dispatch) {
    var info = await axios.get('http://localhost:3001/types',{
    });
    return dispatch({
      type: "GET_TYPES", 
      payload: info.data})
  };
}


export function postPokemons(payload){
  return async function () {
    const response = await axios.post('http://localhost:3001/pokemons',payload);
    return response
  }
}

export function updatePage(page){
  return (dispatch) =>{
    dispatch({
      type: 'UPDATE_PAGE',
      payload: page
    })
  }
  
}




export function filterPokemonsByType(payload){
  return{
    type: "FILTER_BY_TYPE",
    payload
  }
}


export function filterCreated(payload){
  return {
    type: "FILTER_CREATED",
    payload
  }
}


export function orderByName(payload){
  return{
    type: "ORDER_BY_NAME",
    payload
  }
}


export function sortFilter(array) {
  return ( dispatch ) => {
      dispatch({
              type: "SORT_FILTER",
              payload: array
       })
  }
}

export function clearDetail(){
  return (dispatch) =>{
    dispatch({
      type: "CLEAR_DETAIL",
    })
  }
}


export function filterType(type){
  return (dispatch) =>{
    dispatch({
      type: "FILTER_TYPE",
      payload: type
    })
  }
}

export function filterFrom(from){
  return (dispatch) =>{
    dispatch({
      type: "FILTER_FROM",
      payload: from
    })
  }
}

export function applyFilter(){
  return (dispatch) =>{
    dispatch({
    type: 'APPLY_FILTER'
  })
}
}

export function applySort(){
  return (dispatch) =>{
    dispatch({
    type: 'APPLY_SORT'
  })
}
}

export function sortBy(payload){
  return (dispatch) =>{
    dispatch({
      type: 'SORT_BY',
      payload
    })
  }
}



/* export function filterPokemonsByType(payload){
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/types');
            dispatch({type: 'FILTER_BY_TYPE', payload: response.data});
        }catch (error){
            console.log(error);
        }
    };
} */

// export function getPokemonByName(payload){
//     return {
//         type: 'GET_POKEMONS_BY_NAME',
//         payload: payload,
//     };
// }

// export function getPokemonById(id){
//     return async function (dispatch) {
//         try{
//             const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
//             dispatch({type: 'GET_POKEMONS_BY_ID', payload: response.data});
//         }catch(error){
//             console.log(error)
//             dispatch({type: 'GET_POKEMONS_BY_ID', payload: null});
//         }
//     };
// }
