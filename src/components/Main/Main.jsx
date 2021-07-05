import React, {useContext} from 'react';
import {Card, CardContent, Grid, Divider, CardHeader, Typography} from "@material-ui/core";
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import MainMenu from './Menu/Menu';
import {ExpenseTrackerContext} from '../../context/context';
import InfoCard from "../InfoCard";

const Main = () => {
    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root}>
            <MainMenu/>
            <CardHeader title="Alissa's Budgeting App" subheader="Powered by Speechly"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
                <Typography variant="subtitle1" style={{lineHeight: '1.5em', marginTop: '20px'}}>
                    <InfoCard/>
                </Typography>
                <Divider className={classes.divider}/>
                <Form/>
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container>
                    <Grid item xs={12}>
                        <List/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
        ;
};
export default Main;
