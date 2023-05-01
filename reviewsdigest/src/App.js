import Header from './layouts/Header.js'
import MainContainer from './layouts/MainContainer.js'
import './App.css';

/* 
* App module.    
*/
function App() {
  // Render the header and the main container.
  return (
    <div className="App">
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;
