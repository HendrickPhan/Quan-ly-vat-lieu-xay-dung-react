import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { maxHeight } from '@material-ui/system';


const useStyles = makeStyles(theme => ({
    root: {
        height: 300,
        flexGrow: 1,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Image = imageProps => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCardActionsStyle = () => {
        return {
            display: "flex",
            justifyContent: 'center'
        }
    }

    const ImageButton = () => {
        console.log(imageProps.deleteImages.includes(imageProps.image.id), imageProps.deleteImages, imageProps.image.id)
        if(imageProps.deleteImages.includes(imageProps.image.id)){
            return(
                <Button 
                    variant="contained" 
                    style={{backgroundColor:"green", color:"white"}} 
                    value={imageProps.image.id}
                    onClick={e => imageProps.handleImageRestoreClick(e)}
                >Khôi phục</Button>)
        }else {
            return(
                <Button 
                    variant="contained" 
                    color="secondary" 
                    value={imageProps.image.id}
                    onClick={imageProps.handleImageDeleteClick}
                >
                    Xóa
                </Button>)
        }
    }

    return (
        <Grid item xs={6} sm={3}>
            <Card >
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={process.env.REACT_APP_STORAGE_URL + imageProps.image.image}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
                <CardActions style={getCardActionsStyle()}>
                   <ImageButton/>
                </CardActions>
            </Card>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={open}
                onClose={handleClose}
                style={{display:"flex", justifyContent:"center"}}
            >
                <Fade in={open}>
                    <Card style={{width:"fit-content", height:"fit-content", alignSelf:"center"}}>
                        <CardActionArea onClick={handleOpen}>
                            <CardMedia
                                component="img"
                                image={process.env.REACT_APP_STORAGE_URL + imageProps.image.image}
                                style={{
                                    maxHeight: "400px",
                                    maxWidth: "800px",
                                }}
                            />

                        </CardActionArea>

                    </Card>

                </Fade>
            </Modal>
        </Grid>
    )
}


export default function ImageList(props) {
    return (
        <Grid container spacing={3}>
            {
                props.images.map((image, index) =>
                    <Image
                        image={image}
                        deleteImages={props.deleteImages}
                        handleImageRestoreClick={props.handleImageRestoreClick}
                        handleImageDeleteClick={props.handleImageDeleteClick}
                        key={index}
                    />
                )
            }
        </Grid>
    );
}