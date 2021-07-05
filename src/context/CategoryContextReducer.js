// Reducer => a function that takes in old state , and an action => new state..
import {incomeCategories, expenseCategories} from "../constants/categories";
import React, {useState} from 'react';

let transactions;
const categoryContextReducer = (state, action) => {

    switch (action.type) {
        case 'DELETE_CATEGORY':
            incomeCategories = state.filter((t) => t.id !== action.payload);
            return incomeCategories;
        case 'ADD_CATEGORY':
            if (action.payload.categoryType === 'Income') {
                incomeCategories = [action.payload.data, ...state];
                return incomeCategories;
            } else {
                expenseCategories = [action.payload.data, ...state];
                return expenseCategories;
            }
            break;
        default:
            return state;
    }

};
export default categoryContextReducer;
