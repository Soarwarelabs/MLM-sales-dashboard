import React, { useState } from "react";
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
import { AreaFormData, CityData } from "interfaces/pages/Area";
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

interface AreaFormDataProps {
  initialValues: AreaFormData;
  onSubmit: (values: AreaFormData) => void;
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

export const AreaForm = ({
  initialValues,
  onSubmit,
  editMode,
  isCreatingOrEditing,
}: AreaFormDataProps) => {
  const cities = useSelector<RootState>((state) => state.dropdown.cities) as CityData[];
  const classes = useStyles();
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),

    city: Yup.array().required("Required"),
  });
  const [name, setName] = useState(initialValues.name);
  const [city, setCity] = useState(initialValues.city)
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit(values) {
  //     console.log("dataaa", values);
  //     onSubmit({ ...values, city: cities[0] })
  //   },
  // });
  const handleChange = (e: any) => {
    e.preventDefault()
    console.log(e.target.value)
    setName(e.target.value)
  }
  const handleChangeCity = (e: any) => {
    e.preventDefault()
    // const cit = cities?.filter((item) => item.id === e.target.value)
    console.log("fffff", e.target.value)
    setCity(cities?.filter((item) => item.id === e.target.value)[0])
  }
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {editMode ? "Edit Area" : "Add Area"}
      </Typography>
      <div className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"

          required
          fullWidth
          id="name"
          label="Area Name"
          name="name"
          onChange={handleChange}
          value={name}
          autoFocus
        />
        <Typography
          style={{ paddingTop: 10, paddingLeft: 10, color: "rgb(150,150,150)" }}
        >
          City
        </Typography>
        <Select
          label="City"
          id="city"
          name="city"
          required
          fullWidth

          value={city}
          onChange={handleChangeCity}
          input={<Input />}
          renderValue={(selected: any) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {console.log("selecteddd", selected)}
              <Typography>{selected.name} </Typography>


            </div>
          )}
          MenuProps={MenuProps}

        >
          {cities.map((_city) => {
            return (
              <MenuItem key={_city.id} value={_city.id}>
                {_city.name.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          type="submit"
          fullWidth
          disabled={isCreatingOrEditing}
          variant="contained"
          color="primary"
          onClick={() => onSubmit({ name: name, city: city })}
          className={classes.submit}
        >
          Save
        </Button>

      </div>
      {/* <form className={classes.form} noValidate onSubmit={formik.handleSubmit}> */}
      {/* <TextField
          variant="outlined"
          margin="normal"
          error={
            formik.touched.name && formik.errors.name ? true : false
          }
          required
          fullWidth
          id="name"
          label="First Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          autoFocus
        />
        {formik.touched.name && formik.errors.name ? (
          <Typography style={{ color: "red", fontSize: 12 }}>
            {formik.errors.name}
          </Typography>
        ) : null} */}

      {/* <Typography
        style={{ paddingTop: 10, paddingLeft: 10, color: "rgb(150,150,150)" }}
      >
        City
        </Typography> */}
      {/* <Select
          label="City"
          id="city"
          name="city"
          required
          fullWidth

          value={formik.values.city}
          onChange={formik.handleChange}
          input={<Input />}
          renderValue={(selected: string[] | null) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {console.log("selecteddd", selected)}
              <Typography>{selected?.name} </Typography>


            </div>
          )}
          MenuProps={MenuProps}

        >
          {cities.map((_city) => {
            return (
              <MenuItem key={_city.id} value={_city.name}>
                {_city.name.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select> */}
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
      {/* <Button
          type="submit"
          fullWidth
          disabled={isCreatingOrEditing}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button> */}
      {/* </form> */}
    </div>
  );
};
