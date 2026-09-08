function SummaryCards({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="summary-container">

      <div className="summary-card">
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div className="summary-card">
        <h3>Income</h3>
        <p>₹{income}</p>
      </div>

      <div className="summary-card">
        <h3>Expenses</h3>
        <p>₹{expenses}</p>
      </div>

    </div>
  );
}

export default SummaryCards;