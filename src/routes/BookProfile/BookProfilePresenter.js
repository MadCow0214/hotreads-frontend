import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../../Categories";
import { formatDate } from "../../util";

// components
import BookImage from "../../components/BookImage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";
import Review from "../../components/Review";
import BookmarkButton from "../../components/BookmarkButton";

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
    maxWidth: 800,
    width: "100%",
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
    borderBottom: "2px solid rgba(0,0,0,0.45)"
  },
  sliderElement: {
    margin: "auto"
  },
  tabPanel: {
    minHeight: "240px"
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
      style={{ whiteSpace: "pre-line" }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
  star,
  onStarChange,
  reviewText,
  onReviewTextChange,
  onReviewSubmit
}) => {
  const classes = useStyles();

  const sliderLength = book.author?.books?.length || 0;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, sliderLength),
    slidesToScroll: Math.min(4, sliderLength),
    arrows: false
  };

  const avgStar = book.reviews.length
    ? book.reviews.reduce((p, c) => p + c.star, 0) / book.reviews.length
    : 0;

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
            {book.subtitle && (
              <Typography variant="subtitle1" component="div">
                {book.subtitle}
              </Typography>
            )}

            <Box className={classes.ratingContainer}>
              <Rating className={classes.rating} value={avgStar} precision={0.5} readOnly />
              <Typography className={classes.avgStar} variant="body1" component="span">
                {avgStar.toFixed(1)}
              </Typography>
              <Typography className={classes.starCount} variant="body1" component="span">
                ({book.reviews.length})
              </Typography>
            </Box>
            <Box className={classes.flex}>
              <Typography className={classes.author} variant="subtitle1" component="div">
                {book.author.name}
              </Typography>
            </Box>
            <Box className={classes.flex}>
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
          </Box>
        </Box>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            책 소개
          </Typography>
        </Box>
        <Typography variant="body1" component="div" style={{ whiteSpace: "pre-line" }}>
          <Box p={3}>{book.desc}</Box>
        </Typography>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            {`저자 - ${book.author ? book.author.name : "미상"}`}
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
          <TabPanel className={classes.tabPanel} value={tabIndex} index={0}>
            {book.author.desc}
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={1}>
            <Slider {...sliderSettings}>
              {book.author?.books?.map(book => (
                <BookImage
                  key={book.id}
                  className={classes.sliderElement}
                  src={book.image}
                  size="sm"
                />
              ))}
            </Slider>
          </TabPanel>
        </Typography>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            리뷰
          </Typography>
        </Box>
        <form className={classes.writeReviewContainer} onSubmit={onReviewSubmit}>
          <Rating
            name="star"
            value={star}
            precision={1}
            onChange={onStarChange}
            disabled={!isLoggedIn}
          />
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
          <Button type="submit" variant="contained" color="primary" disabled={!isLoggedIn}>
            등록
          </Button>
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
