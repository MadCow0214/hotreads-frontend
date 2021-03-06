import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../Categories";

// hooks
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CategoryBest from "../components/CategoryBest";
import SwipeableViews from "react-swipeable-views";
import Slider from "react-slick";
import BannerPanel from "../components/BannerPanel";
import Link from "../components/Link";
import Helmet from "react-helmet";

const GET_BANNER_DATA = gql`
  query getBannerData($bannerLength: Int!) {
    getBannerData(bannerLength: $bannerLength) {
      starBest {
        id
        image
        title
        author {
          id
          name
        }
      }
      wantedBest {
        id
        image
        title
        author {
          id
          name
        }
      }
      newest {
        id
        image
        title
        author {
          id
          name
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "70px"
  },
  container: {
    padding: "40px 20px",
    maxWidth: 800,
    width: "100%"
  },
  slider: {
    marginBottom: "70px"
  },
  banner: {
    width: "100%",
    height: "350px"
  },
  bookPreview: {
    marginTop: "10px"
  },
  menuTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "40px",
    marginBottom: "15px",
    paddingBottom: "10px",
    width: "100%",
    borderBottom: `2px solid ${theme.palette.grey[500]}`
  }
}));

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
};

const Main = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryLoad, setCategoryLoad] = useState({ 1: true });
  const bannerLength = !matches ? 2 : 4;
  const { data, loading } = useQuery(GET_BANNER_DATA, {
    variables: { bannerLength }
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 5000,
    autoplay: true
  };

  const handleCategoryChange = (event, newValue) => {
    let loaded = categoryLoad;
    loaded[newValue + 1] = true;
    setCategoryLoad(loaded);
    setCategoryIndex(newValue);
  };

  const handleCategorySwipeChange = index => {
    let loaded = categoryLoad;
    loaded[index + 1] = true;
    setCategoryLoad(loaded);
    setCategoryIndex(index);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Hotread</title>
      </Helmet>
      <div className={classes.container}>
        <Slider className={classes.slider} {...sliderSettings}>
          <BannerPanel
            title="최고 평점"
            books={data?.getBannerData?.starBest}
            loading={loading}
            length={bannerLength}
          />
          <BannerPanel
            title="읽고 싶은 책 베스트"
            books={data?.getBannerData?.wantedBest}
            loading={loading}
            length={bannerLength}
          />
          <BannerPanel
            title="새로운 책"
            books={data?.getBannerData?.newest}
            loading={loading}
            length={bannerLength}
          />
        </Slider>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div">
            분야별 베스트
          </Typography>
          <Link to={"/book/list"} underline="hover">
            <Typography variant="caption" component="div">
              전체보기 >
            </Typography>
          </Link>
        </Box>
        <Tabs
          value={categoryIndex}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {Categories.filter(category => category.number > 0).map(category => (
            <Tab key={category.number} label={category.text} />
          ))}
        </Tabs>
        <SwipeableViews axis={"x"} index={categoryIndex} onChangeIndex={handleCategorySwipeChange}>
          {Categories.filter(category => category.number > 0).map(category => (
            <TabPanel key={category.number}>
              <CategoryBest
                category={category.number}
                load={Boolean(categoryLoad[category.number])}
              />
            </TabPanel>
          ))}
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Main;
