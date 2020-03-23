import "date-fns";
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

// components
import Button from "@material-ui/core/Button";
import Input from "../../components/Input";
import CategorySelector from "../../components/CategorySelector";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import AuthorSelector from "../../components/AuthorSelector";
import BookImage from "../../components/BookImage";
import TextariaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[200],
    width: "100%",
    minHeight: "100vh",
    paddingTop: "140px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    width: "100%",
    padding: "0 20px"
  },
  basicInfo: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  basicInfoInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px"
  },
  ImageUploaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px"
  },
  ImageSelectButton: {
    marginTop: "5px",
    width: "100%"
  },
  publish: {
    display: "flex"
  },
  dateContainer: {
    display: "flex",
    alignItems: "flex-end",
    padding: "0px 10px 5px",
    background: "white",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,0.25)",
    marginLeft: "5px"
  },
  descTextArea: {
    display: "block",
    resize: "none",
    width: "100%",
    minWidth: "560px",
    minHeight: "150px",
    margin: "30px 0px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    "&:focus": {
      outline: "none"
    }
  },
  submitButton: {
    width: "30%",
    margin: "0px auto 40px"
  }
}));

const UploadBookPresenter = () => {
  const classes = useStyles();
  const inputFile = useRef(null);
  return (
    <div className={classes.root}>
      <form className={classes.container}>
        <div className={classes.basicInfo}>
          <div className={classes.ImageUploaderContainer}>
            <BookImage size="lg" />
            <input id="myInput" type="file" ref={inputFile} style={{ display: "none" }} />
            <Button
              className={classes.ImageSelectButton}
              variant="contained"
              color="secondary"
              onClick={e => inputFile.current.click()}
            >
              이미지 선택
            </Button>
          </div>
          <div className={classes.basicInfoInputs}>
            <CategorySelector value={0} />
            <Input label="제목" required />
            <Input label="부제" />
            <div className={classes.publish}>
              <Input label="출판사" required />
              <div className={classes.dateContainer}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    className={classes.publishDatePicker}
                    disableToolbar
                    format="yyyy/MM/dd"
                    id="date-picker-inline"
                    label="출간일"
                    maxDate={new Date()}
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    DialogProps={{ okLabel: "확인", cancelLabel: "취소", disableScrollLock: true }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <AuthorSelector />
          </div>
        </div>
        <TextariaAutosize className={classes.descTextArea} placeholder="책 소개" maxLength={4000} />
        <Button className={classes.submitButton} type="submit" variant="contained" color="primary">
          업로드
        </Button>
      </form>
    </div>
  );
};

export default UploadBookPresenter;