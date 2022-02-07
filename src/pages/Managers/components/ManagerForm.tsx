import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ManagerFormData, Area } from "interfaces/pages/Managers";
import { useSelector } from "react-redux";
import { RootState } from "interfaces/redux/store";

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

interface ManagerFormProps {
  initialValues: ManagerFormData;
  onSubmit: (values: ManagerFormData) => void;
  editMode: boolean;
  isCreatingOrEditing: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ManagerForm = ({
  initialValues,
  onSubmit,
  editMode,
  isCreatingOrEditing,
}: ManagerFormProps) => {
  const area = useSelector<RootState>((state) => state.dropdown.area) as Area[];
  const classes = useStyles();
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    // phone_number: Yup.number()
    //   .typeError("Phone Number must be number")
    //  ,
    // cnic: Yup.number().typeError("CNIC must be number"),
    area: Yup.array().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {editMode ? "Edit Manager" : "Create Manager"}
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
          // error={
          //   formik.touched.phone_number && formik.errors.phone_number
          //     ? true
          //     : false
          // }
          label="Phone Number"
          name="phone_number"
          id="phone_number"
          onChange={formik.handleChange}
          value={formik.values.phone_number}
        />
        {/* {formik.touched.phone_number && formik.errors.phone_number ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.phone_number}
          </Typography>
        ) : null} */}
        <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          // error={formik.touched.cnic && formik.errors.cnic ? true : false}
          label="CNIC"
          name="cnic"
          id="cnic"
          onChange={formik.handleChange}
          value={formik.values.cnic}
        />
        {/* {formik.touched.cnic && formik.errors.cnic ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.cnic}
          </Typography>
        ) : null} */}
        <Typography
          style={{ paddingTop: 10, paddingLeft: 10, color: "rgb(150,150,150)" }}
        >
          Areas
        </Typography>
        <Select
          label="Area"
          id="area"
          name="area"
          required
          fullWidth
          multiple
          value={formik.values.area}
          onChange={formik.handleChange}
          input={<Input />}
          renderValue={(selected: string[]) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => {
                const parsedArea: Area = JSON.parse(value);
                return (
                  <Chip
                    key={parsedArea.uuid}
                    label={parsedArea.name}
                    style={{ margin: 2 }}
                  />
                );
              })}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {area.map((_area) => (
            <MenuItem key={_area.uuid} value={JSON.stringify(_area)}>
              {_area.name}
            </MenuItem>
          ))}
        </Select>
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={formik.touched.area && formik.errors.area ? true : false}
          label="Area"
          name="area"
          id="area"
          onChange={formik.handleChange}
          value={formik.values.area}
        />
        {formik.touched.area && formik.errors.area ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.area}
          </Typography>
        ) : null} */}
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
