import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProfileUpdateData } from "interfaces/Profile";
import * as Yup from "yup";

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

interface ProfileUpdateFormDataProps {
  initialValues: ProfileUpdateData;
  // onSubmit: (values: ProfileUpdateData) => void;
  onSubmit: (values: ProfileUpdateData) => void;
  editMode: boolean;
  onClose: (values: any) => void;
  // isCreatingOrEditing: boolean;
}

const ShopTransactionForm = ({
  initialValues,
  onSubmit,
  editMode,
  onClose,
}: ProfileUpdateFormDataProps) => {
  const [values, setValues] = useState<ProfileUpdateData>({
    first_name: " ",
    last_name: " ",
    email: " ",
    phone_number: " ",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required(" Email is required"),
    phone_number: Yup.number()
      .typeError("Phone Number must be number")
      .integer("Enter valid phone number")
      .min(5)
      .required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      {/* <Card variant="outlined"> */}
      {/* <CardContent> */}
      <Typography
        style={{ paddingBottom: 20, fontWeight: "bold" }}
        variant="h5"
        gutterBottom
      >
        Update Profile
      </Typography>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        {/* <div style={{ display: "flex", flexDirection: "column", minWidth: "400px" }}> */}
        {/* <Label label="First Name:" /> */}
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          autoFocus
          label="First Name"
          required
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />

        {formik.touched.first_name && formik.errors.first_name ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.first_name}
          </Typography>
        ) : null}

        <TextField
          variant="outlined"
          label="Last Name"
          fullWidth
          margin="normal"
          autoFocus
          required
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.last_name}
          </Typography>
        ) : null}
        <TextField
          required
          variant="outlined"
          fullWidth
          margin="normal"
          autoFocus
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        ></TextField>
        {formik.touched.email && formik.errors.email ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.email}
          </Typography>
        ) : null}
        <TextField
          required
          variant="outlined"
          fullWidth
          margin="normal"
          autoFocus
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
        ></TextField>

        {formik.touched.phone_number && formik.errors.phone_number ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.phone_number}
          </Typography>
        ) : null}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{ marginTop: 30 }}
            // type="submit"
            color="primary"
            onClick={onClose}
            variant="contained"
          >
            Close
          </Button>
          <Button
            style={{ marginTop: 30 }}
            // type="submit"
            color="primary"
            variant="contained"
            disabled={editMode}
            // className={classes.submit}
            onClick={() => {
              setValues(formik.values);
              setOpen(true);
            }}
          >
            Save Changes
          </Button>
        </div>
        {/* </div> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to update your profile?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will be logged out to apply changes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ color: "red" }}
              onClick={handleClose}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              disabled={editMode}
              onClick={() => {
                onSubmit(values);
                setTimeout(() => {
                  setOpen(false);
                }, 1000);
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {/* </CardContent> */}
      {/* </Card> */}
    </div>
  );
};
export default ShopTransactionForm;
