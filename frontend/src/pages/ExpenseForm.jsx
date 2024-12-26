import React, { useState } from 'react'
import { handleError } from '../utils';


const ExpenseForm = ({addTransaction}) => {
    const [expenseInfo, setExpenseInfo] = useState({ amount: '',text: ''})

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const addExpenses = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;
        if (!amount || !text) {
            handleError('Please add Expense Details');
            return;
        }
        addTransaction(expenseInfo);
        setExpenseInfo({ amount: '', text: '' })
    }

  return (
    <div className='container'>
            <h1>Expense Tracker</h1>
            <form onSubmit={addExpenses}>
                <div>
                    <label htmlFor='text'>Expense Detail</label>
                    <input onChange={handleChange} type='text'name='text' value={expenseInfo.text} placeholder='Enter your Expense Detail'/>
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input onChange={handleChange} type='number'name='amount' value={expenseInfo.amount} placeholder='Enter your Amount'/>
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
  )
}

export default ExpenseForm