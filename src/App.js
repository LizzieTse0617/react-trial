import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({
    monsters: [],
    filterMonsters: [],
    searchString: '',
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        setState((prevState) => ({ ...prevState, monsters: users }));
        /* 把users 放入setState, 而setState入面,preState keep 番住preState, 另外monsters有新野user, monsters:[{user},{user}] */
      })
      .catch(console.error);
  }, []);

  const handleSearch = (ev) => {
    const searchString = ev.target.value.toLowerCase();
    const filterMonsters = state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });

    setState((prevState) => ({ ...prevState, filterMonsters, searchString }));
    /* filterMonsters + searchString，連埋其他野一齊入setState */
  };

  return (
    <div className="App">
      <input
        className="search-box"
        type="search"
        placeholder="search monsters"
        onChange={handleSearch}
      />
      {state.filterMonsters.length > 0
        ? state.filterMonsters.map((monster) => (
            <h1 key={monster.id}>{monster.name}</h1>
          ))
        : state.monsters.map((monster) => (
            <h1 key={monster.id}>{monster.name}</h1>
          ))}
    </div>
  );
}

export default App;
