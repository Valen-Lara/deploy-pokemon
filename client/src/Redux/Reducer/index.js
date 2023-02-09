const initialState = {      //estados globales redux
  pokemons: [],
  pokemonsCopy: [],
  types: [],
  detail: {},
  filterFrom: "todos",
  filterType: "todos",
  sort: "todos",
  unsorted: [],
  currentPage: 1 
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: [...action.payload],
        unsorted: [...action.payload]
      };

      case "GET_NAME_POKEMONS":
        return {
          ...state,
          pokemons: action.payload
        };

        
        case "FILTER_CREATED":
          /* const createdFilter = action.payload === 'creados' ? allPokemons.filter(el => el.createInDb) : allPokemons.filter(el => !el.createInDb); */
          const createdFilter = action.payload === 'creados' ? state.pokemonsCopy.filter(el => el.createInDb) : state.pokemonsCopy.filter(el => !el.createInDb)
          
          return{
            ...state,
            pokemons: action.payload === 'todos' ? state.pokemonsCopy : createdFilter
          };

          case "SORT_FILTER":
            return{
            ...state,
            pokemons: [...action.payload]
          };

          case 'GET_DETAILS':
            return{
              ...state,
              detail: action.payload,
            };

            case 'UPDATE_PAGE':
            return{
              ...state,
              currentPage: action.payload
            }

            case 'FILTER_TYPE':
              return {
                ...state,
                filterType: action.payload
              };

              case 'FILTER_FROM':
              return {
                ...state,
                filterFrom: action.payload
              };

              case 'APPLY_FILTER':
                const filterFrom = state.filterFrom === 'creados' ? state.pokemonsCopy.filter(el => el.createInDb) : state.filterFrom === 'api' ?  state.pokemonsCopy.filter(el => !el.createInDb) : state.pokemonsCopy
                const filterType = state.filterType === 'todos' ? filterFrom : filterFrom.filter(el => el.types.includes(state.filterType)) 
                
                return {
                  ...state,
                  pokemons: [...filterType],
                  unsorted: [...filterType]
                }
            
          
          case "FILTER_BY_TYPE": 
            const allPokemons = state.pokemonsCopy;
            const typesFiltered = action.payload === 'todos' ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload)) //(el => el.types.includes(action.payload)) o (el => el.Types === action.payload)

            return {
              ...state,
              pokemons: typesFiltered
            };
            
        case "GET_TYPES":
          return{
            ...state,
            types: action.payload
          }


        case "POST_POKEMONS":
          return {
            ...state,
          };


          case "ORDER_BY_NAME":
            let sortedArr = action.payload === 'asc' ? 
            state.pokemons.sort(function (a, b){
              if(a.name > b.name){
                return 1;
              }
                if(b.name > a.name){
                  return -1;
                }
                return 0;
            }) : 
            state.pokemons.sort(function (a, b){
              if(a.name > b.name){
                return -1;
            }
              if(b.name > a.name){
                return 1;
              }
            return 0;
            });
            return{
              ...state,
              pokemons: sortedArr
            };

            case "CLEAR_DETAIL":
              return{
                ...state,
                detail: {}
              };
              case "APPLY_SORT":

                const sorted =  state.sort === 'asc' ? 
                state.pokemons.sort(function (a, b){
                  if(a.name > b.name){
                    return 1;
                  }
                    if(b.name > a.name){
                      return -1;
                    }
                    return 0;
                }) : state.sort === "desc" ? 
                state.pokemons.sort(function (a, b){
                  if(a.name > b.name){
                    return -1;
                }
                  if(b.name > a.name){
                    return 1;
                  }
                return 0;
                }) : state.sort === "poderosos" ? 
                state.pokemons.sort((a, b) => {
                  if(a.attack > b.attack) return -1;
                  if(a.attack < b.attack) return 1;
                  return 0;
                }) : state.sort === "debiles" ? 
                state.pokemons.sort((a, b) => {
                  if(a.attack > b.attack) return 1;
                  if(a.attack < b.attack) return -1;
                  return 0;
                }) : state.unsorted
                return{
                  ...state,
                  pokemons:[...sorted]
                }

                case 'SORT_BY':
                  return{
                    ...state,
                    sort: action.payload
                  }

            case "FILTER_STRENGTH":
              const filterStrength = action.payload === "poderosos" ? state.pokemonsCopy.sort((a, b) => {
                if(a.attack > b.attack) return -1;
                if(a.attack < b.attack) return 1;
                return 0;
              }) : state.pokemonsCopy.sort((a, b) => {
                if(a.attack > b.attack) return 1;
                if(a.attack < b.attack) return -1;
                return 0;
              })
              return{
                ...state,
                pokemons: filterStrength
              };

              

        default:
          return state;
  }
}

export default rootReducer;

