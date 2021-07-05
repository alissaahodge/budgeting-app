import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer';
import categoryContextReducer from './CategoryContextReducer';
import {incomeCategories, expenseCategories} from "../constants/categories";

const transactionsInitialState = JSON.parse(localStorage.getItem('transactions')) || [];
const incomeCategoriesInitialState = JSON.parse(localStorage.getItem('incomeCategories')) || incomeCategories;
const expenseCategoriesInitialState = JSON.parse(localStorage.getItem('expenseCategories')) || expenseCategories;
export const ExpenseTrackerContext = createContext(transactionsInitialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, transactionsInitialState);
    const [incomeCategories, incomeCategoryDispatch] = useReducer(categoryContextReducer, incomeCategoriesInitialState);
    const [expenseCategories, expenseCategoryDispatch] = useReducer(categoryContextReducer, expenseCategoriesInitialState);
    //action creators
    const deleteTransaction = (id) => {
        dispatch({type: 'DELETE_TRANSACTION', payload: id});
    };
    const addTransaction = (transaction) => {
        dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    };
    const addIncomeCategory = (category) => {
        console.log(category, "this is in context")
        incomeCategoryDispatch({type: 'ADD_INCOME_CATEGORY', payload: category});
    };
    const addExpenseCategory = (category) => {
        expenseCategoryDispatch({type: 'ADD_EXPENSE_CATEGORY', payload: category});
    };
    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense') ? acc - currVal.amount : acc + currVal.amount;
    }, 0);
    return (
        <ExpenseTrackerContext.Provider
            value={{
                deleteTransaction,
                addTransaction,
                addIncomeCategory,
                addExpenseCategory,
                transactions,
                incomeCategories,
                expenseCategories,
                balance
            }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
};
