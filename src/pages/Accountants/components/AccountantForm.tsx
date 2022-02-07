import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ManagerFormData, Area } from "interfaces/pages/Managers";
import { useFormik } from "formik";
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

interface AccountantFormProps {
  initialValues: ManagerFormData;
  onSubmit: (values: ManagerFormData) => void;
  editMode: boolean;
  isCreatingOrEditing: boolean;
}

const AccountantForm = ({
  initialValues,
  onSubmit,
  editMode,
  isCreatingOrEditing,
}: AccountantFormProps) => {
  const classes = useStyles();
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    // phone_number: Yup.number()
    //   .typeError("Phone Number must be number")
    //   .required("Required"),
    // cnic: Yup.number().typeError("CNIC must be number").required("Required"),
    // area: Yup.array().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {editMode ? "Edit Accountant" : "Create Accountant"}
      </Typography>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          error={
            formik.touched.first_name && formik.errors.first_name ? true : false
          }
          required
          fullWidth
          id="first_name"
          label="First Name"
          name="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          autoFocus
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.first_name}
          </Typography>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          error={
            formik.touched.last_name && formik.errors.last_name ? true : false
          }
          required
          fullWidth
          id="last_name"
          label="Last Name"
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
          variant="outlined"
          margin="normal"
          error={formik.touched.email && formik.errors.email ? true : false}
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.email}
          </Typography>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          error={
            formik.touched.phone_number && formik.errors.phone_number
              ? true
              : false
          }
          label="Phone Number"
          name="phone_number"
          id="phone_number"
          onChange={formik.handleChange}
          value={formik.values.phone_number}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.phone_number}
          </Typography>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          error={formik.touched.cnic && formik.errors.cnic ? true : false}
          label="CNIC"
          name="cnic"
          id="cnic"
          onChange={formik.handleChange}
          value={formik.values.cnic}
        />
        {formik.touched.cnic && formik.errors.cnic ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.cnic}
          </Typography>
        ) : null}
        <Button
          type="submit"
          fullWidth
          disabled={isCreatingOrEditing}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export { AccountantForm };
