import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function UserFormView(props) {
    console.log(props);
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

    let idField = "";
    let imageField = "";
    let imagesName = "";
    // props.user.avatar.name;
    if (props.user.id) {
        idField = <Grid item xs={12} sm={12}>
            <TextField
                id="id"
                label="Id"
                fullWidth
                disabled
                value={props.fetched && props.user.id ? props.user.id : ''}

            />
        </Grid>


        imageField = (<Grid item xs={12} sm={12}>
            <Card style={{maxWidth: 200}}>
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        component="img"
                        height="140"
                        width="200"
                        image={process.env.REACT_APP_STORAGE_URL + props.user.fetchedAvatar}
                    />
                </CardActionArea>
            </Card>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={open}
                onClose={handleClose}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Fade in={open}>
                    <Card style={{ width: "fit-content", height: "fit-content", alignSelf: "center" }}>
                        <CardActionArea onClick={handleOpen}>
                            <CardMedia
                                component="img"
                                image={process.env.REACT_APP_STORAGE_URL + props.user.fetchedAvatar}
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

    return (
        <Paper className={classes.root}>
            <form noValidate autoComplete="off" onSubmit={(e) => props.handleSubmit(e)}>
                <Grid container spacing={3}>
                    {idField}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Tên nhân viên"
                            fullWidth
                            value={props.user.name ? props.user.name : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="image-label">Ảnh đại diện</InputLabel>
                        </FormControl>
                    </Grid>
                    {imageField}
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                        <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => props.handleImagesChange(e)}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={9}>
                        <TextField
                            readOnly
                            fullWidth
                            multiline
                            value={imagesName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                            <Select id="role" name="role"
                                value={props.user.role}
                                onChange={(value) => props.handleRoleChange(value)}
                            >
                                <MenuItem value={0}>Admin</MenuItem>
                                <MenuItem value={1}>Mananager</MenuItem>
                                <MenuItem value={2}>Assistant Staff</MenuItem>
                                <MenuItem value={3}>Agency Mananager</MenuItem>
                                <MenuItem value={4}>Bussiness Staff</MenuItem>
                                <MenuItem value={5}>Warehouse Staff</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                            <Select
                                labelid="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.agencies.map(agency => agency.id)}
                                name="agency_id"
                                // onChange={props.handleCategorySelectChange}
                                fullWidth
                                multiple
                                input={<Input id="agency_id" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            props.categorySelectList.map(category => {
                                                if (category.id === value) {
                                                    return (
                                                        <Chip key={value} label={category.name} className={classes.chip} />
                                                    )
                                                }
                                            })
                                        ))}
                                    </div>
                                )}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {props.categorySelectList.map(prop => {
                                    return (
                                        <MenuItem value={prop.id} key={prop.id} >{prop.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Địa chỉ"
                            fullWidth
                            value={props.user.address ? props.user.address : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            value={props.user.email ? props.user.email : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Số điện thoại"
                            fullWidth
                            value={props.user.phone ? props.user.phone : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={props.user.password ? props.user.password: ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="retype_psw"
                            name="retype_psw"
                            label="Nhập lại password"
                            type="password"
                            fullWidth
                            value={props.retype_psw ? props.retype_psw: ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.button}
                        >
                            <SaveIcon />Save
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
} 