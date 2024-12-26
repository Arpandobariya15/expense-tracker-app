import React, { useEffect, useState } from 'react'
import { APIUrl, handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            // if token exiper or unothorise
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }

            const result = await response.json();
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }
    
    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        // for income add
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        // for expense remove  (-5000 * -1) = (+5000)
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])



    return (
        <div>
            <div className='user-section'>
                <h1>Welcome! {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt}/>
            <ExpenseForm addTransaction={addTransaction}/>
            <ExpenseTable  expenses={expenses} deleteExpens={deleteExpens}/>
            <ToastContainer />
        </div>
    )
}

export default Home
