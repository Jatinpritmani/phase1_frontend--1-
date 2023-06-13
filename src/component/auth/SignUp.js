import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginLogo from "../../assets/svg/LoginLogo.svg";
import { Input, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/slices/authSlice";
import { toast } from "react-hot-toast";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = React.useState({
    role: "6477deef02a47278f405b618",
  });
  console.log(loginData);
  const handleOnChnage = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUp(loginData))
      .unwrap()
      .then((res) => {
        console.log(res, "reresresresress");
        if (res?.status == 200) {
          toast("Here is your toast.");
          navigate("/feed");
        } else {
          toast.error(res.response.data.message);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          p={10}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            color={"white"}
            sx={{ bottom: 0, left: 0 }}
            position={"absolute"}
            p={10}
          >
            <Typography component="h2" variant="h2">
              Stay updated on your
              <br /> network
            </Typography>
            <Box
              color={"white"}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "15px",
              }}
              position={"relative"}
              p={2}
            >
              <Typography>You already have an account?</Typography>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#E57C23",
                  borderRadius: "25px",
                  fontSize: "14px",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ p: 4, borderBottomLeftRadius: 18, borderTopLeftRadius: 18 }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                width: "100%",
                gap: "10px",
              }}
            >
              <img
                src={LoginLogo}
                //   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                //   alt={item.title}
                loading="lazy"
                style={{ height: "41px", width: "36px" }}
              />
              <Typography
                component="h6"
                variant="h6"
                fontSize={20}
                fontWeight={600}
                display={"flex"}
                alignItems={"center"}
              >
                Social Box
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                m: 2,
                bgcolor: "background.paper",

                width: "100%",
              }}
            >
              <Typography
                fontSize={20}
                fontWeight={600}
                display={"flex"}
                alignItems={"center"}
              >
                Create an account
              </Typography>
              <Typography fontSize={12} display={"flex"} alignItems={"center"}>
                Sign up to continue
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <InputLabel htmlFor="email">Full Name</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={handleOnChnage}
                />
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleOnChnage}
                />

                <InputLabel htmlFor="email">Password</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleOnChnage}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#E57C23",
                    height: "58px",
                    borderRadius: "10px",
                    ":hover": {
                      bgcolor: "white",
                      color: "black",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Create an account
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
