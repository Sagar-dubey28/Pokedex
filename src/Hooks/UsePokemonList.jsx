import axios from "axios";
import { useState,useEffect } from "react";

function UsePokemonList() {

    // // const[pokemonList, setPokemonList]= useState([]);
    // // const[isLoading,setIsLoading]=useState(true);
    // // const[pokedexUrl,setPokedexUrl]= useState("https://pokeapi.co/api/v2/pokemon")

    // // const[nextUrl,setNextUrl]= useState("");
    // // const[prevUrl,setPrevUrl]= useState("");

    const[pokemonListState,setPokemonListState]= useState({
        pokemonList:[],
        isLoading : true,
        pokedexUrl : "https://pokeapi.co/api/v2/pokemon",
        nextUrl : "",
        prevUrl : ""
    })
     
    async function pokemonDownload(){
        // setIsLoading(true)
        setPokemonListState((state) => ({...state, isLoading : true}))
        const response = await axios.get(pokemonListState.pokedexUrl);
        const pokemonResults= response.data.results;

        console.log(response.data);
        // setNextUrl(response.data.next)
        // setPrevUrl(response.data.previous)
        setPokemonListState( (state) =>({
            ...state,
            nextUrl : response.data.next,
            prevUrl: response.data.previous,
        })
        );


        const pokemonResultPromise= pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        const pokemonData= await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData)=>{
            const pokemon= pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name ,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.front_shiny,
                type: pokemon.types,
            }
        })
        console.log(res);
    //     setPokemonList(res);
    //    setIsLoading(false);
    setPokemonListState((state)=>({...state, pokemonList: res, isLoading:false }))
     }

     useEffect(()=>{
        pokemonDownload()
    },[  pokemonListState.pokedexUrl])

    return [pokemonListState,setPokemonListState];
}

export default UsePokemonList;
