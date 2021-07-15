import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, InputLabel, MenuItem, Select, Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {ExpenseTrackerContext} from "../../context/context";
import Slide from '@material-ui/core/Slide';
import useStyles from './styles';
import TabPanel from '../UI/TabPanel/TabPanel';
import CategoryList from './CategoryList';

const CategoryDialog = (props)=> {
    const initialState = {
        id: Math.random(),
        amount: 0,
        type: '',
        color: '#ffffff'
    };
    const {addIncomeCategory, addExpenseCategory, updateIncomeCategory, updateExpenseCategory} = useContext(ExpenseTrackerContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialState);
    const [tabValue, setTabValue] = React.useState(0);
    const [currentId, setCurrentId] = useState(null);
    const [categoryType, setCategoryType] = useState('Income');


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onCloseCategoryDialog();

    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        categoryType === "Income" ? setCategoryType("Expense") : setCategoryType("Income");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0 || currentId == null) {

            const color = categoryType === 'Income' ? `rgb(0,${generateRandomIntegerInRange(100, 255)},0)` : `rgb(${generateRandomIntegerInRange(130, 255)},0,0)`;
            const category = {...formData, color: color};
            categoryType === 'Income' ? addIncomeCategory(category) : addExpenseCategory(category);
        } else {
            console.log(formData)
            categoryType === 'Income' ? updateIncomeCategory(formData) : updateExpenseCategory(formData);

        }
        clear();
    };
    const clear = () => {
        setFormData(initialState);
        setCurrentId(null);
    };

    return (
        <div>

            <Icon className="fa fa-plus-circle" style={{fontSize: 30}}/>
            <ListItemText primary="Manage Categories" onClick={handleClickOpen}/>

            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {/*// TransitionComponent={Transition}>*/}
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Manage All Categories
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <Grid container spacing={10} alignItems="center" Justify="center" fullwidth="true">
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.root}>
                                <div className={classes.root2}>
                                    <Tabs
                                        orientation="vertical"
                                        value={tabValue}
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Income Categories"/>
                                        <Tab label="Expense Categories"/>
                                    </Tabs>

                                    <TabPanel value={tabValue} index={0}>
                                        <CategoryList setCurrentId={setCurrentId}
                                                      setCategoryType={setCategoryType} type="Income"
                                                      setFormData={setFormData}/></TabPanel>
                                    <TabPanel index={1} value={tabValue}>

                                        <CategoryList setCurrentId={setCurrentId}
                                                      setCategoryType={setCategoryType} type="Expense"
                                                      setFormData={setFormData}/>
                                    </TabPanel></div>
                            </Paper><br/>
                        </Grid>
                        <Grid item xs={12} sm={4} spacing={4}>
                            <h3 Justify="center" className={classes.categoryName}>Create/Edit Category</h3>
                            <br/>
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>

                                <Select value={categoryType}
                                        onChange={(e) => setCategoryType(e.target.value)}>

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
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                </DialogActions>

            </Dialog>

        </div>

    )
        ;
}
export default CategoryDialog;

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
