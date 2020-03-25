import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

//hooks
import { useRef, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";

// components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "../components/Input";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const EDIT_PROFILE = gql`
  mutation editProfile($avatar: String, $curPassword: String, $newPassword: String) {
    editProfile(avatar: $avatar, curPassword: $curPassword, newPassword: $newPassword)
  }
`;

const USER_CACHE_FRAGMENT = gql`
  fragment editedUser on User {
    avatar
    __typename
  }
`;

const useStyles = makeStyles(theme => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginBottom: "5px",
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  button: {
    marginBottom: "15px"
  },
  input: {
    marginTop: "5px"
  }
}));

const EditUserDialog = ({ user, open, handleClose }) => {
  const classes = useStyles();
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);
  const [image, setImage] = useState(null);
  const curPasswordInput = useInput("");
  const newPasswordInput = useInput("");
  const verifyPasswordInput = useInput("");
  const [editProfileMutation] = useMutation(EDIT_PROFILE);

  const onAvatarSelected = event => {
    if (event.target?.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  const onSubmit = async () => {
    if (uploading) {
      console.log("error");
      return;
    }

    if (!image && !newPasswordInput.value) {
      console.log("바꿀 정보 없음!");
      return;
    }

    if (newPasswordInput.value) {
      if (newPasswordInput.value !== verifyPasswordInput.value) {
        console.log("비밀번호 확인 실패");
        return;
      }
    }

    setUploading(true);

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(process.env.REACT_APP_CONTENTS_SERVER_URL, formData);

      if (res.status !== 200) {
        console.log("error");
        return;
      }

      imageUrl = res.data.url;
    }

    try {
      const result = await editProfileMutation({
        variables: {
          avatar: imageUrl,
          curPassword: curPasswordInput.value,
          newPassword: newPasswordInput.value
        },
        update: store => {
          if (!imageUrl) {
            return;
          }

          const data = store.readFragment({
            id: "User:" + user.id,
            fragment: USER_CACHE_FRAGMENT
          });

          store.writeFragment({
            id: "User:" + user.id,
            fragment: USER_CACHE_FRAGMENT,
            data: {
              avatar: imageUrl,
              __typename: data.__typename
            }
          });
        }
      });

      if (!result) {
        console.log("비밀번호 변경 실패! 현재 비밀번호 확인");
        setUploading(false);
        return;
      }

      handleClose();
    } catch {
      console.log("error");
    }

    setUploading(false);
  };

  let displayImageSrc = user.avatar;
  if (image) {
    displayImageSrc = URL.createObjectURL(image);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableScrollLock>
      <DialogTitle id="form-dialog-title">회원정보 수정</DialogTitle>
      <DialogContent className={classes.contentContainer}>
        <Avatar className={classes.avatar} src={displayImageSrc} />
        <input
          id="avatarInput"
          type="file"
          accept="image"
          onChange={onAvatarSelected}
          ref={inputFile}
          style={{ display: "none" }}
        />
        <Button
          className={classes.button}
          onClick={e => inputFile.current.click()}
          color="primary"
          variant="contained"
        >
          변경
        </Button>
        <Input
          className={classes.input}
          type="password"
          label="현재 비밀번호"
          onChange={curPasswordInput.onChange}
          inputProps={{ minLength: 8, maxLength: 20 }}
        />
        <Input
          className={classes.input}
          type="password"
          label="새 비밀번호(8-20)"
          onChange={newPasswordInput.onChange}
          inputProps={{ minLength: 8, maxLength: 20 }}
        />
        <Input
          className={classes.input}
          type="password"
          label="새 비밀번호 확인"
          onChange={verifyPasswordInput.onChange}
          inputProps={{ minLength: 8, maxLength: 20 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={onSubmit} color="primary">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
