import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../../Categories";
import { formatDate } from "../../util";

// components
import BookImage from "../../components/BookImage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";
import Review from "../../components/Review";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[200],
    minHeight: "100vh",
    paddingTop: "140px"
  },
  container: {
    maxWidth: 800,
    padding: "0 20px"
  },
  bookInfo: {
    display: "flex"
  },
  bookInfoColumn: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "35px"
  },
  category: {
    marginBottom: "20px"
  },
  rating: {
    display: "flex",
    margin: "20px 0px"
  },
  flex: {
    display: "flex"
  },
  author: {
    marginRight: "5px",
    fontWeight: 700
  },
  publisher: {
    fontWeight: 700
  },
  wantedButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    width: "48px",
    height: "48px",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,0.25)",
    marginTop: "auto",
    "&:hover": {
      cursor: "pointer"
    }
  },
  menuTitle: {
    marginTop: "40px",
    marginBottom: "15px",
    paddingBottom: "10px",
    width: "100%",
    borderBottom: "2px solid rgba(0,0,0,0.45)"
  },
  sliderElement: {
    margin: "auto"
  },
  writeReviewContainer: {
    display: "flex",
    alignItems: "center"
  },
  reviewTextArea: {
    resize: "none",
    width: "100%",
    height: "80px",
    margin: "0 10px",
    fontSize: "16px"
  },
  reviewList: {
    listStyleType: "none",
    padding: "25px 0"
  }
}));

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const BookProfilePresenter = ({ isLoggedIn, book, tabIndex, handleTabChange }) => {
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false
  };

  const calAvgStar = reviews => reviews.reduce((p, c) => p + c.star, 0) / reviews.length;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box className={classes.bookInfo}>
          <BookImage src={book.image || ""} size="lg" />
          <Box className={classes.bookInfoColumn}>
            <Typography className={classes.category} variant="subtitle2" component="div">
              {Categories[book.category]?.text}
            </Typography>
            <Typography variant="h4" component="div">
              {book.title}
            </Typography>
            {book.subTitle && (
              <Typography className={classes.subTitle} variant="subtitle1" component="div">
                {book.subTitle}
              </Typography>
            )}

            <Box className={classes.rating}>
              <Rating name="read-only" value={calAvgStar(book.reviews)} precision={0.5} readOnly />
              <Typography className={classes.subTitle} variant="subtitle1" component="div">
                ({book.reviews.length})
              </Typography>
            </Box>
            <Box className={classes.flex}>
              <Typography className={classes.author} variant="subtitle1" component="div">
                {book.author.name}
              </Typography>
              <Typography variant="subtitle1">저</Typography>
            </Box>
            <Box className={classes.flex}>
              <Typography className={classes.publisher} variant="subtitle2" component="div">
                {book.company}
              </Typography>
              <Typography variant="p" component="span">
                , {formatDate(new Date(book.publishDate))}
              </Typography>
            </Box>
            <div className={classes.wantedButton}>
              <BookmarkBorderIcon color="primary" fontSize="large" />
            </div>
          </Box>
        </Box>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            책 소개
          </Typography>
        </Box>
        <Typography variant="body1" component="div">
          <Box p={3}>{book.desc}</Box>
        </Typography>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            저자
          </Typography>
        </Box>
        <Typography variant="body1" component="div">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="프로필" />
            <Tab label="저서" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            {book.author.desc}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Slider {...sliderSettings}>
              {book.author?.books?.map(book => (
                <BookImage className={classes.sliderElement} src={book.image} size="sm" />
              ))}
            </Slider>
          </TabPanel>
        </Typography>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            리뷰
          </Typography>
        </Box>
        <form className={classes.writeReviewContainer}>
          <Rating name="star" disabled={!isLoggedIn} />
          <textarea
            className={classes.reviewTextArea}
            disabled={!isLoggedIn}
            maxLength="200"
            placeholder={
              isLoggedIn ? "리뷰를 작성해 주세요" : "리뷰를 작성하시려면 로그인 해주세요"
            }
          ></textarea>
          <Button type="submit" variant="contained" color="primary" disabled={!isLoggedIn}>
            등록
          </Button>
        </form>
        <ul className={classes.reviewList}>
          <li>
            <Review />
          </li>
          <li>
            <Review />
          </li>
          <li>
            <Review />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookProfilePresenter;
