import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// core components
import Background from '../../static/bg-01.jpg';
// import Snackbar from "../../Snackbar/Snackbar.js"; 
import Snackbar from "../../components/Snackbar/Snackbar.js"; 


const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(" + Background + ")"
    },
    loginFormTitle: {
        width: "100%",
        display: "block",
        color: "#555555",
        lineHeight: "1.2",
        textAlign: "center",
        margin: theme.spacing(1),
    },
    root: {
        padding: theme.spacing(3, 2),
    },
    button: {
        margin: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    loginForm: {
        width: 400,
        textAlign: "center"
    }
}));


export default function LoginView(props) {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Paper className={classes.root}>
            <Typography variant="h3" component="h3" className={classes.loginFormTitle}>
                Đăng nhập
            </Typography>
                <form className={classes.loginForm} onSubmit={props.handleSubmit}>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            type="text"
                            name="email"
                            onChange={props.handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            name="password"
                            onChange={props.handleChange}
                        />
                    </FormControl>
                    <Button 
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                    >
                        Đăng Nhập
                    </Button>
                </form>
            </Paper>
            <Snackbar/>
        </Box>
    );
} 