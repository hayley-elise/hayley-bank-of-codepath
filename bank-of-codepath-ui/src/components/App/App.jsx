import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"
import {BrowserRouter, Router, Routes, Route} from "react-router-dom"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import {useState} from "react"


export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])
  const [error, setError] = useState(null)
  const [filterInputValue, setfilterInputValue] = useState("")

  return (
    <div className= "app">
      <BrowserRouter> 
        <Navbar filterInputValue= {filterInputValue} setfilterInputValue= {setfilterInputValue} />
        <main> 
          <Routes> 
            <Route path= "/"  element= {<Home/>} />
            <Route path= "/tansactions/:transactionId"  element= {<TransactionDetail/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
