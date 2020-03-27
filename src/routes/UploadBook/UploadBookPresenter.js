import "date-fns";
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { sizeList } from "../../components/BookImage";

// components
import Button from "@material-ui/core/Button";
import Input from "../../components/Input";
import CategorySelector from "../../components/CategorySelector";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import AuthorSelector from "../../components/AuthorSelector";
import BookImage from "../../components/BookImage";
import TextariaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[100],
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
  basicInfoInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px",
    minHeight: sizeList["lg"].h
  },
  ImageUploaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px"
  },
  ImageSelectButton: {
    marginTop: "5px",
    width: sizeList["lg"].w
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

const UploadBookPresenter = ({
  image,
  setImage,
  setCategory,
  titleInput,
  subtitleInput,
  companyInput,
  date,
  setDate,
  setAuthor,
  descInput,
  onSubmit
}) => {
  const classes = useStyles();
  const inputFile = useRef(null);

  const onImageSelected = event => {
    if (event.target?.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  let displayImageSrc = "";
  if (image) {
    displayImageSrc = URL.createObjectURL(image);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item className={classes.ImageUploaderContainer} xs={12} sm={5}>
            <BookImage src={displayImageSrc} size="lg" />
            <input
              id="imageInput"
              type="file"
              accept="image"
              onChange={onImageSelected}
              ref={inputFile}
              style={{ display: "none" }}
            />
            <Button
              className={classes.ImageSelectButton}
              variant="contained"
              color="secondary"
              onClick={e => inputFile.current.click()}
            >
              이미지 선택
            </Button>
          </Grid>
          <Grid item className={classes.basicInfoInputs} xs={12} sm={7}>
            <CategorySelector unselectedString="선택해 주세요" onChange={setCategory} />
            <Input
              label="제목"
              inputProps={{ maxLength: 50 }}
              onChange={titleInput.onChange}
              required
            />
            <Input label="부제" inputProps={{ maxLength: 50 }} onChange={subtitleInput.onChange} />
            <div className={classes.publish}>
              <Input
                label="출판사"
                inputProps={{ maxLength: 20 }}
                onChange={companyInput.onChange}
                required
              />
              <div className={classes.dateContainer}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    className={classes.publishDatePicker}
                    openTo="year"
                    autoOk
                    disableFuture
                    views={["year", "month", "date"]}
                    format="yyyy/MM/dd"
                    id="date-picker-inline"
                    label="출간일"
                    value={date}
                    onChange={setDate}
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    DialogProps={{
                      okLabel: "확인",
                      cancelLabel: "취소",
                      disableScrollLock: true
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <AuthorSelector onChange={setAuthor} />
          </Grid>
        </Grid>
        <TextariaAutosize
          className={classes.descTextArea}
          placeholder="책 소개(최대 5000자)"
          onChange={descInput.onChange}
          maxLength={5000}
        />
        <Button
          className={classes.submitButton}
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          업로드
        </Button>
      </div>
    </div>
  );
};

export default UploadBookPresenter;
