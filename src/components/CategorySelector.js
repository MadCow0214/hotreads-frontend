import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../Categories";

// components
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  formControl: {
    background: "white",
    borderRadius: "5px",
    width: "160px",
    padding: "10px 10px 5px",
    border: "1px solid rgba(0,0,0,0.25)"
  }
}));

const CategorySelector = ({ onChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = event => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel variant="filled" required>
          분류
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          MenuProps={{ disableScrollLock: true }}
          disableUnderline
        >
          {Categories.map(category => (
            <MenuItem key={category.number} value={category.number}>
              {category.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

CategorySelector.propTypes = {
  onChange: PropTypes.func
};

export default CategorySelector;
