import './App.css';
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx';
import PokemonCreate from './components/PokemonCreate/PokemonCreate.jsx'; 


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch> 
    <Route exact path='/' component={LandingPage}/>
    <Route path='/home' component={Home}/>
    <Route exact path='/pokemons' component={PokemonCreate}/>
    <Route path='/pokemons/:id' component={match => <Detail match={match}/>}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
