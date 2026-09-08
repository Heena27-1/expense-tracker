import { useEffect, useState } from "react";

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onEditTransaction
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(String(editingTransaction.amount));
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      id: editingTransaction
        ? editingTransaction.id
        : Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date
    };

    if (editingTransaction) {
      onEditTransaction(transaction);
    } else {
      onAddTransaction(transaction);
    }

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setDate("");
  };

  return (
    <div className="form-container">
      <h2>
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Type</label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

      </form>
    </div>
  );
}

export default TransactionForm;