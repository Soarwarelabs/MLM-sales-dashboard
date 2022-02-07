import React, { useState, useEffect, MouseEvent } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import Badge from '@material-ui/core/Badge';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Paper from '@material-ui/core/Paper';
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import ShopIcon from "@material-ui/icons/Shop";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Content from "./Content";
import { Link } from "react-router-dom";
import { logout } from "@redux/actions/auth";
import logo from "@assets/image/logo.png";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { RootState } from "interfaces/redux/store";
import axios from "axios";
import { getData } from "@redux/actions/dropdown";
import UpdateProfile from "./UpdateProfileForm";
import { ProfileUpdateData, PasswordData } from "interfaces/Profile";
import ChangePassword from "./ChangePassword";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <a color="inherit" href="https://material-ui.com/"> */}
      DukandarOnline
      {/* </a>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      backgroundColor: "#91C43E",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      backgroundColor: "#91C43E",
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      overflowX: "hidden",
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    avatarContainer: {
      display: "flex",
      flexDirection: "row",
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    avatar: {
      margin: theme.spacing(1),
      width: "180px",
      height: "50px",

      // backgroundColor: theme.palette.secondary.main,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  })
);

const AppRouter = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  const token = useSelector<RootState>((state) => state.auth.token);
  const name = useSelector<RootState>((state) => state.profile.name) as string;
  const email = useSelector<RootState>(
    (state) => state.profile.email
  ) as string;
  const uuid = useSelector<RootState>((state) => state.profile.uuid) as string;
  const first_name = useSelector<RootState>(
    (state) => state.profile.first_name
  ) as string;
  const last_name = useSelector<RootState>(
    (state) => state.profile.last_name
  ) as string;
  const phone_number = useSelector<RootState>(
    (state) => state.profile.phone_number
  ) as string;
  const promo_code = useSelector<RootState>(
    (state) => state.profile.promo_code
  ) as string;
  const [isprofile, setIsProfile] = useState<boolean>(false);
  const [ispassword, setIsPassword] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const close = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };
  const handleProfileDrawerOpen = () => {
    setVisible(true);
    setAnchorEl(null);
  };

  const handleProfileDrawerClose = () => {
    setVisible(false);
  };
  const changePassword = async (values: PasswordData) => {
    setIsLoading(true);
    try {
      await axios.post(
        "change-password/",
        {
          old_password: values.old_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      handleProfileDrawerClose();
      handleLogout();
      setMessage("You have successfully changed your profile");
      setIsMessageOpen(true);
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
      setIsMessageOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (values: ProfileUpdateData) => {
    setIsLoading(true);
    try {
      await axios.post(
        "update-profile/",
        {
          email: values.email,
          uuid: uuid,
          first_name: values.first_name,
          last_name: values.last_name,
          phone_number: values.phone_number,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      handleProfileDrawerClose();
      handleLogout();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getDropdownData = async () => {
    try {
      const { data } = await axios.get("dropdown/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(getData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDropdownData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        anchor="right"
        open={visible}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        {isprofile && (
          <UpdateProfile
            initialValues={{
              first_name: first_name,
              last_name: last_name,
              email: email,
              phone_number: phone_number,
            }}
            //  onSubmit={currentSelected ? editTransaction : addTransaction}
            onSubmit={updateProfile}
            editMode={isLoading}
            onClose={handleProfileDrawerClose}
            // isCreatingOrEditing={isCreatingOrEditing}
          />
        )}
        {ispassword && (
          <ChangePassword
            initialValues={{
              old_password: "",
              new_password: "",
              confirm_password: "",
            }}
            //  onSubmit={currentSelected ? editTransaction : addTransaction}
            onSubmit={changePassword}
            editMode={isLoading}
            onClose={handleProfileDrawerClose}
            // isCreatingOrEditing={isCreatingOrEditing}
          />
        )}
      </SwipeableDrawer>

      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {open === false ? (
            <Avatar
              variant="square"
              style={{ marginLeft: "-25px" }}
              className={classes.avatar}
              src={logo}
            />
          ) : null}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ margin: "13px" }}>
              {name === " " ? (email as string) : (name as string)} |{" "}
              {promo_code}{" "}
            </Typography>
            {/* <Typography style={{ margin: "13px" }}>{email as string} </Typography> */}
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Popover
                open={close}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileDrawerOpen();
                    setIsProfile(true);
                    setIsPassword(false);
                  }}
                >
                  Update Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileDrawerOpen();
                    setIsProfile(false);
                    setIsPassword(true);
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Popover>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        {" "}
        <div className={classes.avatarContainer}>
          <Avatar variant="square" className={classes.avatar} src={logo} />

          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <List style={{ marginLeft: "0px" }}>
          {/* <Link style={{ textDecoration: "none", color: "black" }} to="/">
            {" "}
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link> */}
          {role?.code !== "acc" &&
            role?.code !== "crm" &&
            role?.code !== "macc" && (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/shops"
              >
                <ListItem button>
                  <ListItemIcon>
                    <ShopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shops" />
                </ListItem>
              </Link>
            )}
          {(role?.code === "admin" || role?.code === "head") && (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/managers"
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Managers" />
              </ListItem>
            </Link>
          )}
          {role?.code === "admin" && (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/accountants"
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Accountants" />
              </ListItem>
            </Link>
          )}
          {role?.code !== "acc" &&
            role?.code !== "crm" &&
            role?.code !== "macc" && (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/agents"
              >
                <ListItem button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agents" />
                </ListItem>
              </Link>
            )}
          {(role?.code === "acc" ||
            role?.code === "admin" ||
            role?.code === "macc" ||
            role?.code === "head") && (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/transactions"
            >
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
            </Link>
          )}

          {role?.code !== "acc" &&
          role?.code !== "crm" &&
          role?.code !== "macc" &&
          role?.code !== "tech" ? (
            <Link
              to="/inquiries/sales"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <ListItem button>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Inquiries" />
              </ListItem>
            </Link>
          ) : null}
          {(role?.code === "crm" || role?.code === "admin") && (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/complaints"
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Complaints" />
              </ListItem>
            </Link>
          )}
          {role?.code === "tech" ? (
            <Link
              to="/inquiries/tech"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <ListItem button>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Inquiries" />
              </ListItem>
            </Link>
          ) : null}

          {role?.code === "acc" && (
            <Link
              to="/inquiries/accounts"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <ListItem button>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Inquiries" />
              </ListItem>
            </Link>
          )}

          {role?.code !== "acc" &&
            role?.code !== "crm" &&
            role?.code !== "macc" && (
              <Link
                to="/area"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <ListItem button>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Area" />
                </ListItem>
              </Link>
            )}
        </List>
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid style={{ minHeight: "450px" }} container spacing={3}>
            {/* Chart */}
            {/* <DashboardTable/> */}
            <Content />
          </Grid>
          <footer>
            <Box pt={4}>
              <Copyright />
            </Box>
          </footer>
        </Container>
      </main>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        message={message}
        autoHideDuration={3000}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => setIsMessageOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};
export { AppRouter };
