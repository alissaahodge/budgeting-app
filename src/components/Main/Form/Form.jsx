import React, {useState, useEffect, useContext} from 'react';
import {TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context/context';
import {v4 as uuidv4} from 'uuid';
// import {incomeCategories, expenseCategories} from "../../../constants/categories";
import {useSpeechContext} from "@speechly/react-client";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomizedSnackbar from "../../Snackbar/Snackbar";

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: new Date()
};
const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const {addTransaction, incomeCategories, expenseCategories} = useContext(ExpenseTrackerContext);
    const {segment} = useSpeechContext();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({...formData, type: 'Expense'})
            } else if (segment.intent.intent === 'add_income') {
                setFormData({...formData, type: 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction;
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch (e.type) {
                    case 'amount':
                        setFormData({...formData, amount: e.value});
                        break;
                    case 'category':
                        if (incomeCategories.map((IC) => IC.type).includes(category)) {
                            setFormData({...formData, type: 'Income', category: category});
                        } else if (expenseCategories.map((EC) => EC.type).includes(category)) {
                            setFormData({...formData, type: 'Expense', category: category});

                        }
                        break;
                    case 'date':
                        setFormData({...formData, date: e.value});
                        break;
                    default:
                        break;

                }
            });
            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
            }
        }

    }, [segment]);
    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()};
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    };

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const defaultCategories = {
        options: selectedCategories.map((option) => option.type)

    };
    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant='subtitle2' gutterBottom>
                    {segment && (<>
                        {segment.words.map((w) => w.value).join(' ')}
                    </>)}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Autocomplete
                        {...defaultCategories}
                        id="category"
                        value={formData.category}
                        onChange={(event, newValue) => {
                            setFormData({...formData, category: newValue});
                        }}
                        renderInput={(params) => < TextField {...params} margin="normal"/>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount}
                           onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Date</InputLabel>
                <TextField type="date" fullWidth value={formData.date}
                           onChange={(e) => setFormData({...formData, date: e.target.value})}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth
                    onClick={createTransaction}>Create</Button>
        </Grid>
    );
}
export default Form;
