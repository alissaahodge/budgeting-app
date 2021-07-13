import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, InputLabel, MenuItem, Select, Grid} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {ExpenseTrackerContext} from "../../context/context";
import Slide from '@material-ui/core/Slide';
import useStyles from './styles';
import TabPanel from '../UI/TabPanel/TabPanel';

export default function CategoryDialog(props) {
    const columns = [
        {id: 'type', label: 'Category Name'},
        {id: 'actions', label: 'Actions'},
    ];
    const initialState = {
        id: Math.random(),
        amount: 0,
        type: '',
        color: '#ffffff'
    };
    let category_type = 'Income';
    const {addIncomeCategory, addExpenseCategory, incomeCategories, expenseCategories} = useContext(ExpenseTrackerContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [formData, setFormData] = useState(initialState);
    const [tabValue, setTabValue] = React.useState(0);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleCreateCategory = () => {
        const color = category_type === 'Income' ? `rgb(0,${generateRandomIntegerInRange(100, 255)},0)` : `rgb(${generateRandomIntegerInRange(130, 255)},0,0)`;
        const category = {...formData, color: color};
        // const categoryData = {data: category, categoryType: category_type};
        category_type === 'Income' ? addIncomeCategory(category) : addExpenseCategory(category);

        setFormData(initialState);

        handleClose();

    };

    return (
        <div>

            <Icon className="fa fa-plus-circle" style={{fontSize: 30}}/>
            <ListItemText primary="Add Category" onClick={handleClickOpen}/>

            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                    TransitionComponent={Transition}>
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
                    <Grid container spacing={10} alignItems="center" Justify="center" fullWidth>
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
                                    <TableContainer className={classes.container}>
                                        <h2 Justify="center" className={classes.categoryName}>Income Categories</h2>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {incomeCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.id === 'actions' && <div>
                                                                            <Button><DeleteIcon/></Button><Button><EditIcon/></Button>
                                                                        </div>} {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={incomeCategories.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    /></TabPanel>
                                <TabPanel index={1} value={tabValue}>
                                    <TableContainer className={classes.container}>
                                        <h2 Justify="center" className={classes.categoryName}>Expense Categories</h2>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {expenseCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.id === 'actions' && <div>
                                                                            <Button><DeleteIcon/></Button><Button><EditIcon/></Button>
                                                                        </div>} {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={expenseCategories.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TabPanel></div>
                            </Paper><br/>
                        </Grid>
                        <Grid item xs={13} sm={4} spacing={4}>
                            <h3 Justify="center" className={classes.categoryName}>Create/Edit Category</h3>
                            <br/>
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
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Button onClick={handleCreateCategory} variant="contained" color="primary">
                                Create
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

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
