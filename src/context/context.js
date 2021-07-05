import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer';
import categoryContextReducer from './CategoryContextReducer';

const transactionsInitialState = JSON.parse(localStorage.getItem('transactions')) || [];
const initialState = [];
export const ExpenseTrackerContext = createContext(transactionsInitialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, transactionsInitialState);
    const [categories, categoryDispatch] = useReducer(categoryContextReducer, initialState);
    console.log(transactions, 'context');
    //action creators
    const deleteTransaction = (id) => {
        dispatch({type: 'DELETE_TRANSACTION', payload: id});
    };
    const addTransaction = (transaction) => {
        dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    };
    const addCategory = (category) => {
        categoryDispatch({type: 'ADD_CATEGORY', payload: category});
    };
    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense') ? acc - currVal.amount : acc + currVal.amount;
    }, 0);
    return (
        <ExpenseTrackerContext.Provider
            value={{deleteTransaction, addTransaction, addCategory, transactions, categories, balance}}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
};
