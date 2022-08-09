import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/material";

import { Logo } from "../../assets/svg";

import { useAppSelector, useAppDispatch } from "../../services/hook";

import { login } from "./authSlice";

import { default as Validator } from "validatorjs";

interface IData {
  email: string;
  password: string;
  remember: boolean;
}

interface Item {
  title: string;
  href: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  loginWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: 873,
    height: 709,
    boxShadow: "0px 0px 10px 10px #00000010",
    padding: 64,
    position: "relative",
  },
  title: {
    fontFamily: "Ubuntu !important",
    fontWeight: "700 !important",
    fontSize: "36px !important",
    marginTop: "40px !important",
  },
  input: {
    "& .MuiOutlinedInput-input": {
      width: 398,
      height: 18,
      padding: "13px 16px",
    },
  },
  policy: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontFamily: "Open Sans",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  isLogining: {
    width: "100%",
    position: "absolute !important" as any,
    top: 0,
  },
}));

const items = [
  {
    title: "Polityka Prywatności",
    href: "privacy-policy",
  },
  {
    title: "Regulamin korzystania z serwisu",
    href: "regulations",
  },
  {
    title: "Deklaracja Dostępności",
    href: "accessibility-declaration",
  },
  {
    title: "Klauzula Informacyjna",
    href: "information-clause",
  },
];

const Login = () => {
  const isLogining = useAppSelector((state) => state.auth.isLogining);
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();

  const initialData = {
    email: "",
    password: "",
    remember: false,
  };

  const rules = {
    email: "required|email",
    password: "required",
  };

  const classes = useStyles();
  const [data, setData] = useState<IData>(initialData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Validator.Errors | null>(null);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange =
    (prop: keyof IData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [prop]: prop === "remember" ? event.target.checked : event.target.value,
      });
    };

  const handleSubmit = () => {
    let validation = new Validator(data, rules);
    if (validation.fails()) {
      setErrors(validation.errors);
      return;
    }

    dispatch(login(data));
    setErrors(null);
  };

  const handlePressEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box className={classes.loginWrapper}>
      <Paper variant="outlined" className={classes.loginCard}>
        {isLogining && <LinearProgress className={classes.isLogining} />}
        <Box>
          <NavLink to="/login">
            <Logo width={189} height={106} />
          </NavLink>

          <Typography variant="h1" className={classes.title}>
            Zaloguj się
          </Typography>
        </Box>

        <Box>
          <Box mb={3}>
            <Typography variant="body1">Login</Typography>
            <TextField
              fullWidth
              id="email"
              variant="outlined"
              error={!!errors?.first("email")}
              helperText={errors?.first("email")}
              placeholder="Wpisz swój login"
              className={classes.input}
              value={data.email}
              onChange={handleChange("email")}
              onKeyDown={handlePressEnterKey}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="body1">Hasło</Typography>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={!!errors?.first("password")}
              value={data.password}
              onChange={handleChange("password")}
              className={classes.input}
              onKeyDown={handlePressEnterKey}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!errors?.first("password") && (
              <Typography
                variant="body1"
                className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
              >
                {errors?.first("password")}
              </Typography>
            )}
          </Box>

          <Box mb={5}>
            <FormControlLabel
              label="Zapamiętaj mnie"
              control={
                <Checkbox
                  color="secondary"
                  checked={data.remember}
                  onChange={handleChange("remember")}
                />
              }
            />
          </Box>

          <Box display="flex" alignItems="center" flexDirection="column">
            <Box mb={3}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLogining}
                sx={{
                  "&.MuiButton-root": {
                    width: 192,
                    height: 44,
                  },
                }}
              >
                Zaloguj się
              </Button>
            </Box>
            <Box>
              <NavLink
                to="/forgot-password"
                style={{
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                }}
              >
                Zapomniałem hasła
              </NavLink>
            </Box>
          </Box>
        </Box>

        <Stack spacing={3} direction="row">
          {items.map((item: Item, index: number) => (
            <NavLink key={index} to={item.href} className={classes.policy}>
              {item.title}
            </NavLink>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
