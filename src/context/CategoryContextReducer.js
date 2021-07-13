// Reducer => a function that takes in old state , and an action => new state..
let incomeCategories;
let expenseCategories;
const categoryContextReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INCOME_CATEGORY':
            incomeCategories = [action.payload, ...state];
            localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
            return incomeCategories;
        case 'ADD_EXPENSE_CATEGORY':
            expenseCategories = [action.payload, ...state];
            localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
            return expenseCategories;
        case 'REMOVE_EXPENSE_CATEGORY':
            expenseCategories = state.filter((c)=>c.id!==action.payload);
            localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
            return expenseCategories;
        case 'REMOVE_INCOME_CATEGORY':
            incomeCategories = state.filter((c)=>c.id!==action.payload);
            localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
            return incomeCategories;
        default:
            return state;
    }
};
export default categoryContextReducer;

