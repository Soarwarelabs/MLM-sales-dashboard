import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { PasswordData } from "interfaces/Profile"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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



interface PasswordPropsData {
    initialValues: PasswordData;
    // onSubmit: (values: ProfileUpdateData) => void;
    onSubmit: (values: PasswordData) => void;
    editMode: boolean;
    onClose: (values: any) => void;
    // isCreatingOrEditing: boolean;
}

const ChangePassword = ({ initialValues, onSubmit, editMode, onClose }: PasswordPropsData) => {
    const classes = useStyles();
    const [values, setValues] = useState<PasswordData>({
        old_password: "",
        new_password: "",
        confirm_password: ""
    })


    const [open, setOpen] = useState(false);



    const handleClose = () => {
        setOpen(false);
    };

    // const handleSubmitChange = () => {
    //     onSubmit(values)
    // }

    const validationSchema = Yup.object({
        old_password: Yup.string().required("Required"),
        new_password: Yup.string().required("Required"),
        confirm_password: Yup.string().required("Required").oneOf([Yup.ref('new_password'), null], 'Passwords must match'),

    });
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,

    })

    //     const handleClickOpen = (values: PasswordData) => {
    //         setValues(values)
    // formik.values.old_password !== " "
    //         setOpen(true)


    //     };
    // console.log(formik.errors === {})
    return (
        <>

            <div className={classes.paper}>

                <Typography
                    style={{ paddingBottom: 20, fontWeight: "bold" }}
                    variant="h5"
                    gutterBottom
                >
                    Change Password
              </Typography>
                <form noValidate className={classes.form} onSubmit={formik.handleSubmit} >



                    <TextField
                        variant="outlined"
                        label="Old Password"
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        type="password"
                        id="old_password"
                        name="old_password"
                        value={formik.values.old_password}
                        onChange={formik.handleChange}

                    />
                    {formik.touched.old_password && formik.errors.old_password ? (
                        <Typography style={{ color: "red", fontSize: 12 }}>
                            {formik.errors.old_password}
                        </Typography>
                    ) : null}
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        label="New Password"
                        id="new_password"
                        name="new_password"
                        onChange={formik.handleChange}
                        value={formik.values.new_password}
                        type="password"
                    />
                    {formik.touched.new_password && formik.errors.new_password ? (
                        <Typography style={{ color: "red", fontSize: 12 }}>
                            {formik.errors.new_password}
                        </Typography>
                    ) : null}



                    <TextField
                        required
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        autoFocus
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        label="Confirm New Password"
                    >

                    </TextField>
                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                        <Typography style={{ color: "red", fontSize: 12 }}>
                            {formik.errors.confirm_password}
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
                            onClick={() => { setValues(formik.values); setOpen(true) }}

                        >
                            Save Changes
                </Button>


                    </div>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to update your password?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                You will be logged out to apply changes.
          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{color:"red"}} onClick={handleClose} color="primary">
                                Disagree
          </Button>
                            <Button disabled={editMode} onClick={() => {onSubmit(values); setTimeout(() => {
                                setOpen(false)
                            }, 1000);}} color="primary" autoFocus >
                                Agree
                                
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>

            </div>
        </>)
}
export default ChangePassword 