const { Router, request } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Pokemon, Type } = require("../db.js");

const router = Router();


const getApiPokemon = async () => {
  try {
    const totalPokemons = 40;
    const apiPokemons = [];
    const pokemonRequest = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`);
    const urlPokemonSubrequest = pokemonRequest.data.results.map(
      (pokemon) => pokemon.url
      );

    await axios
      .all(urlPokemonSubrequest.map((u) => axios.get(u)))
      .then((foundPokemons) => {
        foundPokemons.map((pok) =>
          apiPokemons.push({
            id: pok.data.id,
            name: pok.data.name,
            img: pok.data.sprites.other.dream_world.front_default,
            hp: pok.data.stats[0].base_stat,
            attack: pok.data.stats[1].base_stat,
            defense: pok.data.stats[2].base_stat,
            speed: pok.data.stats[5].base_stat,
            height: pok.data.height,
            weight: pok.data.weight,
            createdInDb: false,
            types: pok.data.types.map((t) => t.type.name),
          })
          );
      });
    return apiPokemons;
  } catch (err) {
    console.log("LLAMADO A LA API: " + err);
  }
};



const getDbPokemon = async () => {
  try {
    return await Pokemon.findAll({        //me traigo los pokemones de la bd y le agrego el nombre de la tabla de types.
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};

const getAllPokemons = async () => {
  try {
    const infoPokemon = await getApiPokemon();
    const infoDb = await getDbPokemon();
    const infoFinal = infoPokemon.concat(infoDb);
    return infoFinal;
  } catch (error) {
    console.log("Error: " + error);
  }
};

router.delete('/pokemons/:id' , async (req, res) => {

   const {id} = req.params  
    try{
      await Pokemon.destroy({
        where:{id:id}
      }) 
      res.send('Pokemon eliminado correctamente')
    }catch (error) {
      console.log(error);
    }
})



//router.use('/pokemons', pokemonsRoutes)  //  /Pokemons
//router.use('/types', typesRoutes)   // /Tipos

/* router.get('/pokemons', (req, res) => {
  const {name} = req.query
    getAllPokemons()
    .then((allPokemons) =>{
      if (name) {                                       // Si pasan por query algun name, busca del total el pokemon con ese name y lo devuelve.
      
        const pokemonName = allPokemons.filter((p) =>
          p.name.toLowerCase().includes(name.toLowerCase())     //compara el nombre del pokemon y el que nos pasan por query LOS 2 EN MINUSCULA(lowercase). (busqueda global)
        );
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).json("Pokemon no encontrado");
      } else {                                              //Si no pasan nada por query, trae todos los pokemons.
        res.send(allPokemons)
      }
    })
    .catch((error) => {
      res.send("/POKEMONS: " + error);
    })
    }) */
  



router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;

    const allPokemons = await getAllPokemons();
    if (name) {                                       // Si pasan por query algun name, busca del total el pokemon con ese name y lo devuelve.
      
      const pokemonName = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())     //compara el nombre del pokemon y el que nos pasan por query LOS 2 EN MINUSCULA(lowercase). (busqueda global)
      );
      pokemonName.length ?
      res.status(200).send(pokemonName) :
      res.status(404).json("Pokemon no encontrado");
    } else {                                              //Si no pasan nada por query, trae todos los pokemons.
      res.send(allPokemons)
    }
  } catch (error) {
    res.send("/POKEMONS: " + error);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const allPokemons = await getAllPokemons();
    /* const bdpokemon = await Pokemon.findOne({
      where:{id: idPokemon}
    }) */
    if (idPokemon) {
      const pokemonId = allPokemons.find((p) => p.id == idPokemon);           // retorna un solo objeto(pokemon) 
      if(pokemonId){
        res.send(pokemonId)
      }else{
        res.status(404).send("El pokemon no existe")
      }
      
      /* pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(200).send(); */
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/pokemons", async (req, res, next) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, types, img } = req.body;
    if(!name) return res.status(400).send('No se puede crear un pokemon sin nombre.')
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      /* types */
    });

    
    await types.forEach(async el => {             //relacion entre tipos y pokemones
      console.log(el);
      const nuevotype = await Type.findOne({
        where:{
          name: el
        }
      })
      console.log( + Pokemon);
      if(nuevotype){
        await newPokemon.addTypes(nuevotype)
      }
    })

    

    res.status(200).send(`Pokemon ${name} creado correctamente`);

  } catch (error) {
    console.log(error)
    res.status(404).send(error);
    /* next(error) */
  } 
});
    


router.get("/types", async (req, res) => {
  try {
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type') 
    const allApiTypes = apiTypes.data.results.map(el => el.name)
    // console.log(allApiTypes)   
    await allApiTypes.map(async el => {
     await Type.findOrCreate({
        where: {name: el}
      });
    })

    const allTypes = await Type.findAll();
    res.send(allTypes)

  } catch (error) {
 console.log(error);
}
});



                                  
module.exports = router;




// const arr1 = [1,2,3]
// const arr2 = arr1.map( async n => {
//   await arrbd.findOrCreate(n)
// })

