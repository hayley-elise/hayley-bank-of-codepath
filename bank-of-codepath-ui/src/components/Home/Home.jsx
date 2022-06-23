import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import {useEffect} from "react"
import axios from "axios"

export default function Home(props) {
  const filteredTransactions = props.filterInputValue ? 
    props?.transactions.filter((transaction) => 
      transaction.description.toLowerCase().indexOf(props.filterInputValue.toLowerCase()) !== -1) 
      : props?.transactions
  
  async function handleOnCreateTransaction() {
    props.setIsCreating(true)
    try {
      let response = await axios.post('http://localhost:3001/bank/transactions', {transactions : props.newTransactionForm})
      props.setTransactions((current) => [...current, ...response, res?.data?.transactions])
      props.setNewTransactionForm({
        category: "",
        description: "",
        amount: 0
      })
      props.setIsCreating(false)
    } catch(error) {
      props.setError(error)
      props.setIsCreating(false)
    }
  }

  async function handleOnCreateTransfer() {
    props.setIsCreating(true)
    try {
      let response = await axios.post('http://localhost:3001/bank/transfers', {transfer: props.newTransferForm})
      props.setTransfers((current) => [...current, ...response, res?.data?.transfers])
      props.setNewTransferForm({
        memo: "",
        recipientEmail: "",
        amount: 0
      })
      props.setIsCreating(false)
    } catch(error) {
      props.setError(error)
      props.setIsCreating(false)
    }
    }


  async function getTransactions() {
    try {
      let response = await axios.get("http://localhost:3001/bank/transactions")
      props.setTransactions(response.data.transactions)
      props.setIsLoading(false)
    } catch(error){
      props.setError(error)
    }
  }

  async function getTransfers() {
    try {
      let response = await axios.get("http://localhost:3001/bank/transfers")
      props.setTransfers(response.data.transfers)
      props.setIsLoading(false)
    } catch(error){
      props.setError(error)
    }
  }
  
  useEffect(() =>{
    async function getData() {
    props.setIsLoading(true)
    try {
      const transactionData = getTransactions()
      if (transactionData?.data?.transactions) {
        props.setTransactions(transactionData.data.transactions)
      }
      const transfersResult = getTransfers()
        if (transfersResult?.data?.transfers) {
          props.setTransfers(transfersResult.data.transfers)
        }
      } catch (error) {
          props.setError(error)
        } finally {
            props.setIsLoading(false)
        }
    }
    getData()
  }, [])


  return (
    <div className= "home">
      <AddTransaction 
        isCreating= {props.isCreating} 
        setIsCreating= {props.setIsCreating} 
        form= {props.newTransactionForm} 
        setForm= {props.setNewTransactionForm} 
        handleOnSubmit= {handleOnCreateTransaction} 
      />
      {props.isLoading ? (<h1> Loading... </h1>) : (<BankActivity transactions= {filteredTransactions} transfers= {props.transfers}/>)}
      {props.error ? <h2 className="error"> Error message </h2> : null}
    </div>
  )
}
