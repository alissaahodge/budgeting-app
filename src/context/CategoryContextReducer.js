// Reducer => a function that takes in old state , and an action => new state..
import {
    ADD_INCOME_CATEGORY,
    ADD_EXPENSE_CATEGORY,
    DELETE_EXPENSE_CATEGORY,
    DELETE_INCOME_CATEGORY,
    UPDATE_EXPENSE_CATEGORY,
    UPDATE_INCOME_CATEGORY
} from "../constants/actionTypes";

let incomeCategories;
let expenseCategories;
const categoryContextReducer = (state, action) => {
    switch (action.type) {
        case ADD_INCOME_CATEGORY:
            incomeCategories = [action.payload, ...state];
            localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
            return incomeCategories;
        case ADD_EXPENSE_CATEGORY:
            expenseCategories = [action.payload, ...state];
            localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
            return expenseCategories;
        case DELETE_EXPENSE_CATEGORY:
            expenseCategories = state.filter((c) => c.id !== action.payload);
            localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
            return expenseCategories;
        case DELETE_INCOME_CATEGORY:
            incomeCategories = state.filter((c) => c.id !== action.payload);
            localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
            return incomeCategories;
        case UPDATE_INCOME_CATEGORY:
            incomeCategories = state.map((c) => c.id === action.payload.id ? action.payload : c);
            console.log(incomeCategories, action.payload);
            localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
            return incomeCategories;
        case UPDATE_EXPENSE_CATEGORY:
            expenseCategories = state.map((c) => c.id === action.payload.id ? action.payload : c);
            localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
            return expenseCategories;

        default:
            return state;
    }
};
export default categoryContextReducer;
