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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        overflowX: 'auto',
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
    button:{
        align_item: 'center'
    },
    table: {
    minWidth: 650,
    },
    full_size: {
      width: '100%',
      marginBottom: '10px'
    },
    color_red:{
        color: 'red'
    },
    right: {
      float: 'right'
    }
    
}));

export default function Step3FormView(props) {
    const classes = useStyles();
    return (
      <Paper className={classes.root}>
        <Grid item xs={12} sm={12}>
          <InputLabel>Thông tin Khách hàng</InputLabel>
          <TextField
              disabled
              className={ classes.full_size }
              name="total_paid"
              label="Tên Khách hàng"              
             value={(props.currentCustomer) ? props.currentCustomer.name : ''}
          />
          <TextField
              disabled
              className={ classes.full_size }
              name="total_paid"
              label="SDT khách hàng"              
              value={(props.currentCustomer) ? props.currentCustomer.phone : ''}
          />
        </Grid>
        <InputLabel id="categories-select-label">Xác nhận hóa đơn</InputLabel>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Đơn vị tính</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sellingBillDetail.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity * row.price}</TableCell>
              </TableRow>
            ))}
             {/* <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right" className={classes.color_red}>Thuế VAT</TableCell>
                <TableCell align="right">%</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{ props.totalBill/110*100 }</TableCell>
              </TableRow> */}

              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right" className={classes.color_red}>Tổng tiền</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right" className={classes.color_red}>{ props.totalBill }</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <Grid item xs={12} sm={12}>
          <TextField
              required
              className={ classes.full_size }
              name="total_paid"
              label="Trả trước"
              type="number"
              inputProps={{ min: "0", max: props.totalBill }}
              value={(props.totalPaid !== null) ? props.totalPaid : 0}
              onChange={ (e) => props.handleTotalPaidChange(e) }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField 
              className={classes.full_size }
              disabled
              name="total_paid"
              label="Còn lại"
              type="number"
             
              value={ props.totalBill - props.totalPaid }
          />
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
              variant="contained"
              color="primary"
              className={[classes.button, classes.right]}
              onClick={(e) => props.handleSubmit(e)}
              type="button">
              Lập hóa đơn
          </Button>
        </Grid>
      </Paper>
    );
} 