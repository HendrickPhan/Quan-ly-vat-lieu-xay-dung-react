import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-bootstrap/Carousel'

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
        bottom: 0
    },
    nextBtn: {
        width: 'fit-content',
        position: 'absolute',
        right: 0
    }
}));


export default function SellingBillFormView(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <FormControl fullWidth>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                        <InputLabel id="categories-select-label">Loại sản phẩm</InputLabel>
                        <Select
                            labelid="categories-select-label"
                            id="categories-select"
                            value=""
                            // value={this.props.categories.map(category => category.id)}
                            name="categories"
                            // onChange={props.handleCategorySelectChange}
                            fullWidth
                        >
                            <MenuItem value={null}>
                                <em>None</em>
                            </MenuItem>
                            {props.categories.map(prop => {
                                // if (prop.id !== props.product.id) {
                                return (
                                    <MenuItem value={prop.id} key={prop.id} >{prop.name}</MenuItem>
                                )
                                // }
                            })}
                        </Select>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Tên sản phẩm"
                            fullWidth
                            value={props.keyword ? props.keyword : ''}
                        // onChange={(e) => props.handleInputChange(e)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.button}
                        >
                            <SearchIcon />Tìm
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>

            <Grid container spacing={3}>
                {props.products.map(product => {
                    return (
                        <Grid item xs={4} sm={4}>

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


                                    {/* <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                    /> */}
                                    <CardContent>
                                        <Typography gutterBottom color="textSecondary" variant="h5" component="h2">
                                            {product.name}
                                         </Typography>
                                        <Typography variant="body1"  component="p">
                                            Giá: <b>{product.price}</b>
                                        </Typography>
                                        <Typography variant="body1"  component="p">
                                            Còn lại: <b>{product.price}</b>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <TextField
                                        required
                                        name="quantity"
                                        label="Số lượng"
                                        type="number"
                                        value={product.price ? product.price : ''}
                                        // onChange={(e) => props.handleInputChange(e)}
                                    />
                                    <Button size="small" variant="contained" color="primary">
                                        Thêm vào hóa đơn
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <AppBar position="fixed" className={classes.appBar} color="default">
                <Toolbar>
                    <Button size="small" variant="contained" color="primary" className={classes.nextBtn}>
                        Tiếp tục
                    </Button>
                </Toolbar>
            </AppBar>
        </Paper>
    );
} 