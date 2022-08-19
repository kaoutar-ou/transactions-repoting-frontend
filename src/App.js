// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import ListTransactions from './components/listTransactions';
import SideBar from './components/sideBar';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //   </header>
    // </div>
    <div className='app'>
      <Header />
      <div className='row'>
        <div className='col col-1'>
          <SideBar />
        </div>
        <div className='col col-11'>
          <ListTransactions />
        </div>
      </div>
    </div>
  );
}

export default App;
