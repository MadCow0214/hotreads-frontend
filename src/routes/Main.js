import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import BookPreview from "../components/BookPreview";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "100px"
  },
  container: {},
  bookPreview: {
    marginTop: "10px"
  }
}));

const Main = props => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="md">
        <BookPreview className={classes.bookPreview}></BookPreview>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Container>
    </div>
  );
};

export default Main;
