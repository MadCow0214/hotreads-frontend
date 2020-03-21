import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box className={classes.bookInfo}>
          <BookImage src={book?.image ? book.image : ""} size="lg" />
          <Box className={classes.bookInfoColumn}>
            <Typography className={classes.category} variant="subtitle2" component="div">
              에세이
            </Typography>
            <Typography variant="h4" component="div">
              유 미 에브리싱{" "}
            </Typography>
            <Typography className={classes.subTitle} variant="subtitle1" component="div">
              너는 나의 모든 것
            </Typography>
            <Box className={classes.rating}>
              <Rating name="read-only" value={3.5} precision={0.5} readOnly />
              <Typography className={classes.subTitle} variant="subtitle1" component="div">
                (43)
              </Typography>
            </Box>
            <Box className={classes.flex}>
              <Typography className={classes.author} variant="subtitle1" component="div">
                손한성
              </Typography>
              <Typography variant="subtitle1">저</Typography>
            </Box>
            <Box className={classes.flex}>
              <Typography className={classes.publisher} variant="subtitle2" component="div">
                민음사
              </Typography>
              <Typography variant="subtitle2" component="div">
                , 2020.03.21
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
          <Box p={3}>
            도대체 왜 미니멀리스트가 되어야 한다는 거지? “미니멀리즘은 소중한 것에 집중하는 힘이자
            불필요한 것들을 제거하는 도구다. 그리고 쓸데없는 것들에 나를 빼앗기지 않을 자유, 행복이
            충만한 삶을 선사한다.” 잘 나가던 직장에 사표를 던지고, 좋은 자동차와 집도 팔고, 편안한
            소파와 책 몇 권만을 남긴 조슈아와 라이언. 자신들을 ‘미니멀리스트’라고 소개하는 이 두
            남자에게 도대체 무슨 일이 벌어진 것일까? 월스트리트저널, USA투데이, NBC, CBS 등이
            주목하고 전 세계 200만 명의 독자들이 공감한 ‘미니멀리즘’이란 무엇일까? 단순함과 간결함을
            추구하는 예술과 문화적인 흐름을 뜻하는 미니멀리즘을 삶에 적용함으로써 우리는 인생 앞에
            너저분하게 흩어져 있는 잡동사니들을 깨끗이 치우고 시간적으로나 경제적으로 더 여유롭고,
            자유로우며, 의미 있는 삶을 살 수 있다. 지금 당장 미니멀리스트가 되겠다고 선언하라! 삶이
            훨씬 간결하고 풍요로우며 아름다워질 것이다.
          </Box>
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
            1984년 저널리즘계에 뛰어든 그는 명료하면서도 비범한 필력, 차별화된 이슈를 고르는 탁월한
            감각에 힘입어 곧 [워싱턴포스트]에 입성했다. 이후 ‘문학적 저널리즘의 최고봉’이라 할 수
            있는 [뉴요커]로 자리를 옮겨 그동안 밝혀지지 않았던 세상의 다양한 패턴과 행동양식, 심리적
            아이디어로 가득 찬 기사들을 썼다. 이 기사들은 훗날 그를 베스트셀러 작가이자 21세기 가장
            영향력 있는 저널리스트의 반열에 오르게 했다. 영국에서 태어나 캐나다 온타리오에서 자랐고,
            토론토대학교와 트리니티대학에서 역사학을 공부했다. 1987년부터 1996년까지
            [워싱턴포스트]의 경제부?과학부 기자, 뉴욕 지부장을 지냈다. 1999년, 이 시대 최고의 마케터
            중 한 명인 론 포페일에 대한 기사로 ‘내셔널 매거진 어워드’를 수상했으며, [타임] ‘가장
            영향력 있는 100인’, [월스트리트저널] ‘세계에서 가장 영향력 있는 경영사상가 10인’,
            [포린폴리시] ‘최고의 세계세상가’에 선정되었다. 저자는 발표한 여섯 권의 책을 모두
            [뉴욕타임스] 베스트셀러에 올린 최고의 경영저술가이다. 신작 『타인의 해석』은 우리가
            그동안 타인을 판단해온 기준을 뒤집으며 낯선 사람을 온전히 파악하는 것이 가능한지
            모색한다. 저서로 『아웃라이어』 『다윗과 골리앗』 『티핑 포인트』 『블링크』 『그 개는
            무엇을 보았나』가 있다.
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Slider {...sliderSettings}>
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
              <BookImage
                className={classes.sliderElement}
                src="https://img.ridicdn.net/cover/703000594/xxlarge"
                size="sm"
              />
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
      </div>
    </div>
  );
};

export default BookProfilePresenter;
