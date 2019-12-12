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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
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
        bottom: 0,
        right: 0,
        width: 'calc(100% - 276px)'
         
    },
    nextBtn: {
        width: 'fit-content',
        position: 'absolute',
        right: 0
    }
}));
const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}))(Badge);
  


export default function Step1View(props) {
    const classes = useStyles();
    console.log('props', props.sellingBillDetail);
    return (
        <Paper className={classes.root}>
            <FormControl fullWidth>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                        <InputLabel id="categories-select-label">Loại sản phẩm</InputLabel>
                        <Select
                            labelid="categories-select-label"
                            id="categories-select"
                            //value=""
                            value={props.currentCategory ? props.currentCategory.id: 1}
                            name="categories"
                            onChange={props.handleCategorySelectChange}
                            fullWidth
                        >
                            <MenuItem value={null}>
                                <em>None</em>
                            </MenuItem>
                            {props.categories.map(category => {
                                // if (prop.id !== props.product.id) {
                                return (
                                    <MenuItem value={category.id} key={category.id} >{category.name}</MenuItem>
                                )
                                // }
                            })}
                        </Select>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="keyword"
                            label="Tên sản phẩm"
                            fullWidth
                            value={props.keyword !== null ? props.keyword : ''}
                            onChange={(e) => props.handleKeywordChange(e)}
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
                                        inputProps={{ min: "0", max: "8888"}}
                                        value={(product.quantity !== undefined) ? product.quantity : 0}
                                        onChange={(value) => props.handleQuantityChange(value, product)}
                                    />
                                    <Button 
                                        size="small" 
                                        variant="contained" 
                                        color="primary"
                                        onClick={(e) => props.handleAddProduct(e, product)}
                                    >
                                        Thêm sản phẩm
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <AppBar position="fixed" className={classes.appBar} color="default">
                <Toolbar>
                    <Box m={1}>
                        <IconButton aria-label="cart">
                        <StyledBadge1 
                            badgeContent = { props.sellingBillDetail !== null ? props.sellingBillDetail.length : 0 } 
                            color="primary"
                        >
                            <ShoppingCartIcon />
                        </StyledBadge1>
                        </IconButton>
                    </Box>
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick = { (e) => props.moveNextStep(e) }  
                        className={classes.nextBtn}>
                        Tiếp tục
                    </Button>
                </Toolbar>
            </AppBar>
        </Paper>
    );
} 