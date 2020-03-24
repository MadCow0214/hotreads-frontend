import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { SEARCH_AUTHOR } from "../sharedQueries";

//hooks
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";

// components
import Input from "../components/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!, $desc: String!) {
    createAuthor(name: $name, desc: $desc) {
      id
      name
    }
  }
`;

const useStyles = makeStyles(theme => ({
  newAuthorName: {
    display: "block"
  },
  newAuthorDesc: {
    resize: "none",
    width: "100%",
    minWidth: "500px",
    padding: "10px",
    borderRadius: "5px",
    "&:focus": {
      outline: "none"
    }
  }
}));

const filter = createFilterOptions();

const AuthorSelecter = ({ onChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [dialogValue, setDialogValue] = useState({ id: null, name: "" });
  const [open, toggleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimerId, setSearchTimerId] = useState();
  const newAuthorDescInput = useInput("");
  const [createAuthorMutation, { loading: authorCreating }] = useMutation(CREATE_AUTHOR);
  const { data: searchData, loading: searching } = useQuery(SEARCH_AUTHOR, {
    variables: {
      term: searchTerm,
      count: 5
    }
  });

  const handleClose = () => {
    if (authorCreating) {
      return;
    }

    setDialogValue({ id: null, name: "" });

    toggleOpen(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (authorCreating) {
      return;
    }

    const { data } = await createAuthorMutation({
      variables: {
        name: dialogValue.name,
        desc: newAuthorDescInput.value
      }
    });

    setValue(data.createAuthor);
    onChange(data.createAuthor);

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onInputChange={(event, newValue) => {
          if (searching || searchTimerId) {
            clearTimeout(searchTimerId);
          }

          const timerId = setTimeout(
            () => {
              setSearchTerm(newValue);
              setSearchTimerId(0);
            },
            searchTimerId ? 100 : 0
          );

          setSearchTimerId(timerId);
        }}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);

              setDialogValue({ id: null, name: newValue });
            });
            return;
          }

          if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({ id: null, name: newValue.inputValue });

            return;
          }

          setValue(newValue);
          onChange(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            if (searching) {
              filtered.push({
                inputValue: params.inputValue,
                name: "검색중..."
              });
            } else if (filtered.length === 0) {
              filtered.push({
                inputValue: params.inputValue,
                name: `새로 추가: ${params.inputValue}`
              });
            }
          }

          return filtered;
        }}
        id="author-selector"
        options={searchData?.searchAuthor || []}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={option => option.name}
        style={{ width: 300 }}
        freeSolo
        renderInput={params => <Input {...params} label="작가 검색" variant="filled" required />}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-author"
        disableScrollLock
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-author">작가 추가</DialogTitle>
          <DialogContent>
            <Input
              className={classes.newAuthorName}
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={event => setDialogValue({ ...dialogValue, name: event.target.value })}
              label="이름"
              type="text"
            />
            <TextareaAutosize
              className={classes.newAuthorDesc}
              placeholder="작가 소개(최대 2000자)"
              onChange={newAuthorDescInput.onChange}
              rowsMin={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AuthorSelecter;
