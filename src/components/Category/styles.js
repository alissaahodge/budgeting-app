import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        width: '100%',
    },
    root2: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    container: {
        maxHeight: 440,
    },
    categoryName: {
        marginLeft: theme.spacing(2),
        fontFamily: 'Roboto, Helvetica'
    }
}));
