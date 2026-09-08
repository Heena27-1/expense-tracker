import { useEffect, useState } from "react";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {

  // Transaction state + LocalStorage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // Edit state
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");


  // Save transactions to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);


  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      transaction
    ]);
  };


  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter(
        (transaction) => transaction.id !== id
      )
    );
  };


  // Start editing
  const startEdit = (transaction) => {
    setEditingTransaction(transaction);
  };


  // Update transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };


  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction) => {

      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        filterType === "all" ||
        transaction.type === filterType;

      const matchesCategory =
        filterCategory === "all" ||
        transaction.category === filterCategory;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    }
  );
return (
  <div className="app">

    {/* Header */}
    <div className="dashboard-header">
      <div>
        <h1>Expense Tracker</h1>
        <p>Manage your income and expenses</p>
      </div>
    </div>

    {/* Summary */}
    <SummaryCards transactions={transactions} />

    {/* Chart */}
    <ExpenseChart transactions={transactions} />

    {/* Add / Edit Transaction */}
    <TransactionForm
      onAddTransaction={addTransaction}
      editingTransaction={editingTransaction}
      onEditTransaction={updateTransaction}
    />

    {/* Filters */}
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="shopping">Shopping</option>
        <option value="bills">Bills</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Transactions */}
    <TransactionList
      transactions={filteredTransactions}
      onDeleteTransaction={deleteTransaction}
      onEditTransaction={startEdit}
    />

  </div>
);
}
 export default App