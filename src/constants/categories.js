const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const incomeCategories = [
    {id: 1, type: 'Business', amount: 0, color: incomeColors[0]},
    {id: 2, type: 'Investments', amount: 0, color: incomeColors[1]},
    {id: 3, type: 'Extra income', amount: 0, color: incomeColors[2]},
    {id: 4, type: 'Deposits', amount: 0, color: incomeColors[3]},
    {id: 5, type: 'Lottery', amount: 0, color: incomeColors[4]},
    {id: 6, type: 'Gifts', amount: 0, color: incomeColors[5]},
    {id: 7, type: 'Salary', amount: 0, color: incomeColors[6]},
    {id: 8, type: 'Savings', amount: 0, color: incomeColors[7]},
    {id: 9, type: 'Rental income', amount: 0, color: incomeColors[8]},
];

export const expenseCategories = [
    {id: 10, type: 'Bills', amount: 0, color: expenseColors[0]},
    {id: 11, type: 'Car', amount: 0, color: expenseColors[1]},
    {id: 12, type: 'Clothes', amount: 0, color: expenseColors[2]},
    {id: 13, type: 'Travel', amount: 0, color: expenseColors[3]},
    {id: 24, type: 'Food', amount: 0, color: expenseColors[4]},
    {id: 15, type: 'Shopping', amount: 0, color: expenseColors[5]},
    {id: 16, type: 'House', amount: 0, color: expenseColors[6]},
    {id: 17, type: 'Entertainment', amount: 0, color: expenseColors[7]},
    {id: 18, type: 'Phone', amount: 0, color: expenseColors[8]},
    {id: 19, type: 'Pets', amount: 0, color: expenseColors[9]},
    {id: 20, type: 'Other', amount: 0, color: expenseColors[10]},
];

export const resetCategories = () => {
    incomeCategories.forEach((c) => c.amount = 0);
    expenseCategories.forEach((c) => c.amount = 0);
};

