import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-bootstrap/Carousel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from "../../../components/Snackbar/Snackbar.js";
import ImageList from "../../../components/ImageList/ImageList.js";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(3, 2),
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)"
    },
    media: {
        height: 200,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        right: 0,
        width: 'calc(100% - 276px)'
         
    },
    nextBtn: {
        width: 'fit-content',
        position: 'absolute',
        right: 0
    },
    right: {
        float: 'right'
    },
    button: {
        marginTop: '10px'
    }
}));


export default function Step2FormView(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid item xs={6} sm={6}>
                <InputLabel id="categories-select-label">Danh Sách sản phẩm</InputLabel>
            </Grid>
            <Grid container spacing={3}>
                
            </Grid>
           <Grid container spacing={3}>
                {props.importBillDetail.map(product => {
                    return (
                        <Grid item xs={4} sm={4} key={product.id}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <Carousel
                                    >
                                        {product.images.map(image => {
                                            return(
                                                <Carousel.Item>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={process.env.REACT_APP_STORAGE_URL + image.image}
                                                    />
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>
                                    
                                    <CardContent>
                                        <Grid>
                                            <Typography 
                                                gutterBottom 
                                                color="textSecondary" 
                                                variant="h5" 
                                                component="h2"
                                                item xs={6} sm={6}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body1"  component="p">
                                                Giá: <b>{product.price}</b>
                                            </Typography>
                                            <TextField
                                                required
                                                name="quantity"
                                                label="Số lượng"
                                                type="number"
                                                inputProps={{ min: "0", max: "8888"}}
                                                value={(product.quantity !== undefined) ? product.quantity : 0}
                                                onChange={(value) => props.handleQuantityChange(value, product)}
                                            />
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                                <Typography variant="body1"  component="p">
                                        Thành tiền: <b>{product.price * product.id}</b>
                                </Typography>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        variant="contained" 
                                        color="primary"
                                        onClick={(e) => props.handleAddProduct(e, product)}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button 
                                        size="small" 
                                        variant="contained" 
                                        color="primary"
                                        onClick={(e) => props.handleRemoveProduct(e, product)}
                                    >
                                        Xóa
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputLabel id="demo-simple-select-label">Nhà cung cấp</InputLabel>
                <Select
                    labelid="demo-simple-select-label"
                    value={props.vendor_id}
                    name="parent_id"
                    onChange={(e) => props.handleVendorChange(e)}
                    
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.vendors.map(vendor => {
                        //if(vendor.id === product.vendor_id){
                            return (
                                <MenuItem value={vendor.id} key={vendor.id} >{vendor.name}</MenuItem>
                            )
                        //}
                    })}
                </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick = { (e) => props.movePrevStep(e) }  
                >
                Quay lại
                </Button>
                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    size="small"
                    className={[classes.button, classes.right]}
                    onClick = { (e) => props.moveNextStep(e) }  
                >
                Tiếp tục
                </Button>
            </Grid>
        </Paper>
    );
} 