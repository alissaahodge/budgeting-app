import React, {useContext, useState, Fragment} from 'react';
import useStyles from './styles';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from "@material-ui/core/TablePagination";
import {ExpenseTrackerContext} from "../../context/context";
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';

const CategoryList = ({setCurrentId, setCategoryType, type, setFormData}) => {
    const classes = useStyles();
    const {deleteExpenseCategory, deleteIncomeCategory, incomeCategories, expenseCategories} = useContext(ExpenseTrackerContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = [
        {id: 'type', label: 'Category Name'},
        {id: 'actions', label: 'Actions'},
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdate = (category) => {
        setCurrentId(category.id);
        setCategoryType(type);
        setFormData(category);


    };

    const handleRemoveCategory = (id) => {
        type === 'Income' ? deleteIncomeCategory(id) : deleteExpenseCategory(id);

    };

    return (<Fragment><TableContainer className={classes.container}>
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
                <TableBody>{type === "Income" ?

                    incomeCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === 'actions' && <div>

                                                        <ConfirmDialog
                                                            dialogText="Are You Sure You Want to Delete This?"
                                                            okBtnText="Yes" cancelBtnTxt="No" openState={false}
                                                            removeFunction={handleRemoveCategory} id={row.id} dialogBtn={<><Button><DeleteIcon/></Button></>}/>

                                               <Button onClick={() => handleUpdate(row)}><EditIcon/></Button>
                                            </div>} {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })
                    :

                    expenseCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === 'actions' && <div>

                                                        <ConfirmDialog
                                                            dialogText="Are You Sure You Want to Delete This?"
                                                            okBtnText="Yes" cancelBtnTxt="No" openState={false}
                                                            removeFunction={handleRemoveCategory} id={row.id} dialogBtn={<><Button><DeleteIcon/></Button></>}/>

                                               <Button onClick={() => handleUpdate(row)}><EditIcon/></Button>
                                            </div>} {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })


                }
                </TableBody>
            </Table>
        </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100
                ]
                }
                component="div"
                count={type === "Income" ? incomeCategories.length : expenseCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /></Fragment>
    );
};
export default CategoryList;
