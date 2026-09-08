
function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction
}) {
  return (
    <div className="transaction-container">
      <h2>Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="empty-message">
          No transactions yet.
        </p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div
              className="transaction-item"
              key={transaction.id}
            >
              <div>
                <h3>{transaction.description}</h3>

                <p>
                  {transaction.category} • {transaction.date}
                </p>
              </div>

              <span className={transaction.type}>
                {transaction.type === "income" ? "+" : "-"}
                ₹{transaction.amount}
              </span>

              <div>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => onEditTransaction(transaction)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    onDeleteTransaction(transaction.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;