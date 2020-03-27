import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../../Categories";
import { formatDate } from "../../util";

// hooks
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import BookImage from "../../components/BookImage";
import BookPreview from "../../components/BookPreview";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";
import Review from "../../components/Review";
import BookmarkButton from "../../components/BookmarkButton";
import SwipeableViews from "react-swipeable-views";
import Link from "../../components/Link";
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
    maxWidth: 800,
    width: "100%",
    padding: "0 20px"
  },
  bookImage: {
    margin: "auto"
  },
  bookInfoColumn: {
    display: "flex",
    flexDirection: "column"
  },
  category: {
    marginBottom: "20px"
  },
  ratingContainer: {
    display: "flex",
    margin: "20px 0px",
    alignItems: "flex-end"
  },
  rating: {
    paddingBottom: "3px",
    marginRight: "5px"
  },
  avgStar: {
    fontWeight: "600",
    marginRight: "5px"
  },
  starCount: {
    fontSize: "14px"
  },
  flex: {
    display: "flex",
    alignItems: "flex-end",
    "&:last-child": {
      marginTop: "auto"
    }
  },
  author: {
    marginRight: "5px",
    fontWeight: 700
  },
  publishInfo: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "15px"
  },
  publisher: {
    fontWeight: 700
  },
  bookmarkButton: {
    marginRight: "5px"
  },
  menuTitle: {
    marginTop: "40px",
    marginBottom: "15px",
    paddingBottom: "10px",
    width: "100%",
    borderBottom: `2px solid ${theme.palette.grey[500]}`
  },
  slider: {
    height: "220px",
    marginBottom: "30px"
  },
  tabPanel: {
    minHeight: "200px",
    overflow: "hidden"
  },
  writeReviewContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px"
  },
  reviewTextArea: {
    resize: "none",
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    "&:focus": {
      outline: "none"
    }
  },
  reviewList: {
    listStyleType: "none",
    padding: "25px 0"
  },
  NoReview: {
    padding: "25px 0",
    width: "100%",
    textAlign: "center"
  }
}));

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      style={{ paddingTop: "30px", whiteSpace: "pre-line" }}
      {...other}
    >
      {value === index && <>{children}</>}
    </Typography>
  );
};

const BookProfilePresenter = ({
  isLoggedIn,
  book,
  isWanted,
  wantedCount,
  onBookmarkClick,
  tabIndex,
  handleTabChange,
  handleTabSwipeChange,
  star,
  onStarChange,
  reviewText,
  onReviewTextChange,
  onReviewSubmit
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const sliderLength = book.author?.books?.length || 0;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, sliderLength),
    slidesToScroll: Math.min(4, sliderLength),
    adaptiveHeight: true,
    arrows: false
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={3} direction="row" justify="center">
          <Grid item xs={12} sm={4}>
            <BookImage className={classes.bookImage} src={book.image || ""} size="lg" />
          </Grid>
          <Grid item className={classes.bookInfoColumn} xs={12} sm={8}>
            <Typography className={classes.category} variant="subtitle2" component="div">
              {Categories[book.category - 1]?.text}
            </Typography>
            <Typography variant="h4" component="div">
              {book.title}
            </Typography>
            {book.subtitle && (
              <Typography variant="subtitle1" component="div">
                {book.subtitle}
              </Typography>
            )}

            <Box className={classes.ratingContainer}>
              <Rating className={classes.rating} value={book.avgStar} precision={0.5} readOnly />
              <Typography className={classes.avgStar} variant="body1" component="span">
                {book.avgStar.toFixed(1)}
              </Typography>
              <Typography className={classes.starCount} variant="body1" component="span">
                ({book.reviewCount})
              </Typography>
            </Box>
            <Box className={classes.flex}>
              <Link to={`/author/${book.author.name}`}>
                <Typography className={classes.author} variant="subtitle1" component="div">
                  {book.author.name}
                </Typography>
              </Link>
            </Box>
            <Box className={classes.publishInfo}>
              <Typography className={classes.publisher} variant="subtitle2" component="span">
                {book.company}
              </Typography>
              <Typography variant="caption" component="span">
                , {formatDate(book.publishDate)}
              </Typography>
            </Box>
            <Box className={classes.flex}>
              <BookmarkButton
                className={classes.bookmarkButton}
                marked={isWanted}
                onClick={onBookmarkClick}
              />
              <Typography variant="caption" component="span">
                {wantedCount}명이 이 책을 읽고 싶어합니다!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            책 소개
          </Typography>
        </Box>
        <Typography
          className={classes.descBox}
          variant="body1"
          component="div"
          style={{ whiteSpace: "pre-line" }}
        >
          {book.desc}
        </Typography>
        <Box className={classes.menuTitle}>
          <Link to={`/author/${book.author.name}`}>
            <Typography variant="h5" component="div">
              {`저자 - ${book.author.name}`}
            </Typography>
          </Link>
        </Box>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="소개" />
          <Tab label="저서" />
        </Tabs>
        <SwipeableViews axis={"x"} index={tabIndex} onChangeIndex={handleTabSwipeChange}>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={0}>
            {book.author.desc}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={1}>
            <Slider className={classes.slider} {...sliderSettings}>
              {book.author?.books?.map(otherBook => (
                <BookPreview
                  key={otherBook.id}
                  book={otherBook}
                  imageSize={!matches ? "xs" : "sm"}
                />
              ))}
            </Slider>
          </TabPanel>
        </SwipeableViews>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            리뷰
          </Typography>
        </Box>
        <form onSubmit={onReviewSubmit}>
          <Grid container>
            <Grid item className={classes.writeReviewContainer} xs={12} sm={2}>
              <Rating
                name="star"
                value={star}
                precision={1}
                onChange={onStarChange}
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item className={classes.writeReviewContainer} xs={12} sm={10}>
              <textarea
                className={classes.reviewTextArea}
                disabled={!isLoggedIn}
                maxLength="200"
                onChange={onReviewTextChange}
                value={reviewText}
                placeholder={
                  isLoggedIn
                    ? "리뷰를 작성해 주세요 (최대 200자)"
                    : "리뷰를 작성하시려면 로그인 해주세요"
                }
              ></textarea>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isLoggedIn}
                style={{ marginLeft: "10px" }}
              >
                등록
              </Button>
            </Grid>
          </Grid>
        </form>
        {book.reviews?.length > 0 && (
          <ul className={classes.reviewList}>
            {book.reviews
              ?.sort((r, l) => {
                return new Date(l.createdAt) - new Date(r.createdAt);
              })
              .map(review => (
                <li key={review.id}>
                  <Review review={review} />
                </li>
              ))}
          </ul>
        )}
        {book.reviews?.length <= 0 && (
          <Typography className={classes.NoReview} variant="body1" component="div">
            리뷰가 없습니다
          </Typography>
        )}
      </div>
    </div>
  );
};

export default BookProfilePresenter;
