import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransactionData } from "interfaces/pages/Transaction";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { RootState } from "interfaces/redux/store";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "400px",
  },
  avatar: {
    margin: theme.spacing(1),
    width: "250px",
    height: "70px",

    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface PayStatusType {
  newStatus: string;
  uuid: string;
}
interface ShopTransactionFormData {
  initialValues: TransactionData;
  onSubmit: (val: PayStatusType) => void;
  editMode: boolean;
  // isCreatingOrEditing: boolean;
}

const ShopTransactionDetails = ({
  initialValues,
  onSubmit,
  editMode,
}: ShopTransactionFormData) => {
  const classes = useStyles();
  const payment_permissions = useSelector<RootState>(
    (state) => state.dropdown.payment_permissions
  ) as string[];
  const [payment_status, setPaymentStatus] = useState<any>(
    initialValues?.payment_status?.toLowerCase()
  );
  const [open, setOpen] = useState(false);
  console.log("any", initialValues?.payment_status);
  return (
    <div className={classes.paper}>
      <Typography
        style={{ paddingBottom: 20, fontWeight: "bold" }}
        variant="h5"
        gutterBottom
      >
        Transactions Details
      </Typography>

      <div className={classes.form}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Shop Name:</Typography>
          <Typography>{initialValues?.shop?.name}</Typography>
        </div>
        <hr />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Payment Method: </Typography>
          <Typography>{initialValues?.payment_method.name}</Typography>
        </div>
        <hr />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Package Name:</Typography>
          <Typography>{initialValues?.package?.name}</Typography>
        </div>
        <hr />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Ammount Paid: </Typography>
          <Typography>{initialValues?.package?.amount}</Typography>
        </div>
        <hr />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Payment Type:</Typography>
          <Typography>{initialValues?.pay_type?.name}</Typography>
        </div>
        <hr />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {" "}
          <Typography>Comments: </Typography>
          <Typography>{initialValues?.purpose}</Typography>
        </div>
        <hr></hr>
        <div style={{ marginBottom: "20px" }}>
          <Typography>Change Payment Status: </Typography>
          <TextField
            select
            variant="outlined"
            // size="small"
            autoFocus
            id="pay_type"
            name="pay_type"
            value={payment_status}
            defaultValue="PAID"
            fullWidth
            placeholder="Change Payment Status"
            onChange={({ target }) =>
              // onSubmit({ newStatus: target.value as string, uuid: initialValues?.uuid })
              {
                setPaymentStatus(target.value);
              }
            }
          >
            {payment_permissions.map((permission) => {
              return (
                <MenuItem key={permission} value={permission}>
                  {permission.toUpperCase()}
                </MenuItem>
              );
            })}
            {initialValues?.payment_status &&
              !payment_permissions.includes(initialValues?.payment_status) && (
                <MenuItem disabled value={initialValues?.payment_status}>
                  {initialValues?.payment_status.toUpperCase()}
                </MenuItem>
              )}
          </TextField>
        </div>
        <Button
          // type="submit"
          fullWidth
          // disabled={isCreatingOrEditing}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => setOpen(true)}
        >
          Save
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Change Payment Status ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you{" "}
            {payment_status === "confirmed"
              ? "confirmated it you can not change it. Please make sure the payment confirmation before this request."
              : "declined it  you can not change it. Please verify before declining it."}
            ,
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "red" }}
            onClick={() => setOpen(false)}
            color="primary"
          >
            No
          </Button>
          <Button
            disabled={editMode}
            onClick={() => {
              onSubmit({
                newStatus: payment_status,
                uuid: initialValues?.uuid,
              });
              setTimeout(() => {
                setOpen(false);
              }, 1000);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export { ShopTransactionDetails };
