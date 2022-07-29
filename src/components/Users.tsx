import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "./common/Header";

const useStyles = makeStyles({
  button: {
    marginLeft: 15,
    background: "#002852",
    paddingTop: 11,
    paddingBottom: 11,
  },
});

const Users = () => {
  const classes = useStyles();

  return (
    <Header
      title="Zarządzaj użytkownikami"
      createTitle="Dodaj UŻYTKOWNIKA"
      createPath="/uers/form"
    >
      <Button variant="contained" className={classes.button}>
        modyfikuj PARAMETRY
      </Button>
    </Header>
  );
};

export default Users;
