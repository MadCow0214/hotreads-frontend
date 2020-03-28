import React from "react";
import { makeStyles } from "@material-ui/core";

//hooks
import useInput from "../hooks/useInput";

// components
import AutoComplete from "@material-ui/lab/Autocomplete";
import Input from "../components/Input";

const useStyles = makeStyles(theme => ({}));

const SearchInput = props => {
  const classes = makeStyles();

  return (
    <AutoComplete
      {...props}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={["하하하하"].map(option => option)}
      renderInput={params => (
        <Input
          {...params}
          label="제목/저자"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

export default SearchInput;
