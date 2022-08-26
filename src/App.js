// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import ListTransactions from './components/listTransactions';
import SideBar from './components/sideBar';
import { Routes, Route, Link } from "react-router-dom";
import TransactionInfos from './components/transactionInfos';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='row'>
        <div className='col col-1'>
          <SideBar />
        </div>
        <div className='col col-11'>
        <Routes>
        <Route path="/" element={<ListTransactions />} />
        <Route path="/transactions/:id" element={<TransactionInfos />} />
      </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
