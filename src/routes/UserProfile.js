import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

// components
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BookList from "../components/BookList";
import EditUserDialog from "../components/EditUserDialog";
import Grid from "@material-ui/core/Grid";
import Loader from "../components/Loader";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import ProfileReview from "../components/ProfileReview";

const USER_BY_NICKNAME = gql`
  query userByNickName($nickName: String!) {
    userByNickName(nickName: $nickName) {
      id
      email
      avatar
      nickName
      reviews {
        id
        book {
          id
          image
          title
          author {
            id
            name
          }
        }
        text
        star
        createdAt
      }
      isSelf
      wantedBookCount
      uploadedBookCount
    }
  }
`;

const UPLOADED_BOOKS = gql`
  query uploadedBooks($nickName: String!, $page: Int!) {
    uploadedBooks(nickName: $nickName, page: $page) {
      id
      image
      title
      author {
        id
        name
      }
    }
  }
`;

const WANTED_BOOKS = gql`
  query wantedBooks($nickName: String!, $page: Int!) {
    wantedBooks(nickName: $nickName, page: $page) {
      id
      image
      title
      author {
        id
        name
      }
    }
  }
`;

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
  userContainer: {
    padding: "0px 30px 30px",
    display: "flex",
    alignItems: "center",
    borderBottom: `2px solid ${theme.palette.grey[500]}`
  },
  avatar: {
    marginRight: "10px",
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  nickName: {
    fontSize: "24px",
    fontWeight: "600"
  },
  editButton: {
    marginLeft: "auto"
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

const UserProfile = ({
  match: {
    params: { nickName }
  }
}) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [wantedPage, setWantedPage] = useState(1);
  const [uploadedPage, setUploadedPage] = useState(1);
  const [editOpen, setEditOpen] = React.useState(false);
  const { data, loading } = useQuery(USER_BY_NICKNAME, {
    variables: { nickName }
  });
  const { data: wantedData, loading: wantedLoading } = useQuery(WANTED_BOOKS, {
    variables: {
      nickName,
      page: wantedPage
    }
  });
  const { data: uploadedData, loading: uploadedLoading } = useQuery(UPLOADED_BOOKS, {
    variables: {
      nickName,
      page: uploadedPage
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleTabSwipeChange = index => {
    setTabIndex(index);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const user = data?.userByNickName;
  const wantedBooks = wantedData?.wantedBooks;
  const uploadedBooks = uploadedData?.uploadedBooks;

  return (
    <>
      {loading && !user && <Loader />}
      {!loading && user && (
        <div className={classes.root}>
          <div className={classes.container}>
            <Box className={classes.userContainer}>
              <Avatar src={user.avatar} className={classes.avatar} />
              <div>
                <Typography className={classes.nickName} noWrap>
                  {user.nickName}
                </Typography>
                {user.isSelf && <Typography noWrap>{user.email}</Typography>}
              </div>
              {user.isSelf && (
                <Button
                  className={classes.editButton}
                  onClick={handleEditOpen}
                  variant="contained"
                  color="primary"
                >
                  회원정보 수정
                </Button>
              )}
            </Box>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={`리뷰 ${user.reviews.length}`} />
              <Tab label={`북마크 ${user.wantedBookCount}`} />
              <Tab label={`업로드 ${user.uploadedBookCount}`} />
            </Tabs>
            <SwipeableViews axis={"x"} index={tabIndex} onChangeIndex={handleTabSwipeChange}>
              <TabPanel>
                <Grid container spacing={3}>
                  {user.reviews.length <= 0 && (
                    <Grid item className={classes.emptyGrid} key="emptyReview" xs={12}>
                      작성한 리뷰가 없습니다
                    </Grid>
                  )}
                  {user.reviews.length > 0 &&
                    user.reviews.map(review => (
                      <Grid item key={review.id} xs={12}>
                        <ProfileReview review={review} />
                      </Grid>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <BookList
                  books={wantedBooks}
                  loading={wantedLoading}
                  messageForNothing="북마크한 책이 없습니다"
                  page={wantedPage}
                  pageCount={Math.ceil(user.wantedBookCount / 12)}
                  onPageChange={(e, newPage) => setWantedPage(newPage)}
                />
              </TabPanel>
              <TabPanel>
                <BookList
                  books={uploadedBooks}
                  loading={uploadedLoading}
                  messageForNothing="업로드한 책이 없습니다"
                  page={uploadedPage}
                  pageCount={Math.ceil(user.uploadedBookCount / 12)}
                  onPageChange={(e, newPage) => setUploadedPage(newPage)}
                />
              </TabPanel>
            </SwipeableViews>
          </div>
          <EditUserDialog user={user} open={editOpen} handleClose={handleEditClose} />
        </div>
      )}
    </>
  );
};

export default UserProfile;
