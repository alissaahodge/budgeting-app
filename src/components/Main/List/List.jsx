import React, {useContext} from 'react';
import useStyles from './styles';
import {
    List as MUIList,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Slide
} from '@material-ui/core';
import {Delete, MoneyOff} from "@material-ui/icons";
import {ExpenseTrackerContext} from "../../../context/context";
import ConfirmDialog from "../../UI/ConfirmDialog/ConfirmDialog";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

const List = () => {
    const classes = useStyles();
    const {deleteTransaction, transactions} = useContext(ExpenseTrackerContext);

    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map((transaction) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category}
                                      secondary={`${transaction.amount} - ${transaction.date}`}/>
                        <ListItemSecondaryAction>
                            {/*<IconButton edge="end" aria-label="delete"*/}
                            {/*            onClick={() => deleteTransaction(transaction.id)}>*/}
                                <ConfirmDialog
                                    dialogText="Are You Sure You Want to Delete This?"
                                    okBtnText="Yes" cancelBtnTxt="No" openState={false}
                                    removeFunction={() => deleteTransaction(transaction.id)} id={transaction.id}
                                    dialogBtnTxt={<><Delete/></>}/>
                                {/*<Delete/></IconButton>*/}
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    );
};
export default List;
