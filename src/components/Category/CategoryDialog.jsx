import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {v4 as uuidv4} from "uuid";
import {expenseCategories, incomeCategories} from "../../constants/categories";
import Icon from '@material-ui/core/Icon';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {ExpenseTrackerContext} from "../../context/context";

export default function CategoryDialog(props) {
    const [open, setOpen] = React.useState(false);
    const initialState = {
        amount: 0,
        type: '',
        color: '#ffffff'
    };
    let category_type = 'Income';
    const [formData, setFormData] = useState(initialState);
    const {addCategory} = useContext(ExpenseTrackerContext);

    // const {addCategory} = useContext(ExpenseTrackerContext);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onCloseCategoryDialog();

    };

    const handleCreateCategory = () => {
        const color = category_type === 'Income' ? `rgb(0,${generateRandomIntegerInRange(100, 255)},0)` : `rgb(${generateRandomIntegerInRange(130, 255)},0,0)`;
        const category = {...formData, color: color};
        const categoryData = {data: category, categoryType: category_type}
        addCategory(categoryData);

        setFormData(initialState);

        handleClose();

    };

    return (
        <div>
            <Icon className="fa fa-plus-circle" style={{fontSize: 30}}/>
            <ListItemText primary="Add Category" onClick={handleClickOpen}/>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select value={category_type}
                                onChange={(e) => category_type = e.target.value}>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Category name"
                            type="text"
                            fullWidth
                        /></FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCategory} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
