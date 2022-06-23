import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  return (
    <div className="transaction-detail">
      <TransactionCard />
    </div>
  )
}

export function TransactionCard({transactions= {}, transactionId= null}) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3> Transaction # {transactionId}</h3>
        <p className="category"></p>
      </div>

      <div className="card-content">
        <p className="description"></p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transactions.amount < 0 ? "minus" : ""}`}>{formatAmount(transactions.amount)}</p>
        <p className="date">{formatDate(transactions.postedAt)}</p>
      </div>
    </div>
  )
}
