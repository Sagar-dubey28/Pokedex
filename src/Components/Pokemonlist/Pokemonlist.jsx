import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";
import UsePokemonList from "../../Hooks/UsePokemonList";

function PokemonList(){

      const[pokemonListState,setPokemonListState]= UsePokemonList(false);
      
    
    return(
        <>   
            <div className="pokemon-list-wrapper">
             <div className="pokemon-wrapper">
                    {(pokemonListState.isLoading) ? "Loading....": pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
                </div>
                <div className="controls">
                    <button disabled={pokemonListState.prevUrl==null}  onClick={()=>{
                        const UrlToSet= pokemonListState.prevUrl;
                        setPokemonListState({...pokemonListState, pokedexUrl: UrlToSet})
                    }}>Prev</button>
                    <button disabled={pokemonListState.nextUrl==null}  onClick={()=>{
                        const UrlToSet= pokemonListState.nextUrl;
                        setPokemonListState({...pokemonListState, pokedexUrl: UrlToSet})
                    }}>Next</button>
                </div>
            </div>
        </>
    )
}
export default PokemonList;