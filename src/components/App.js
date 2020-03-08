import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import axios from "axios";

const GOOGLE_LOGIN = gql`
  mutation googleLogin($tokenId: String!) {
    googleLogin(tokenId: $tokenId)
  }
`;

function App() {
  const [imageFile, setImageFile] = useState();
  const [googleLogin] = useMutation(GOOGLE_LOGIN);

  const onSuccess = async response => {
    const { data } = await googleLogin({ variables: { tokenId: response.tokenId } });

    console.log(data);
  };

  const onFailure = response => {
    console.log(response);
  };

  const onChange = e => {
    if (e.target?.files?.length) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!imageFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post("https://contents-server.herokuapp.com/upload/image", formData);

    console.log(res);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" id="image" name="image" accept="images" onChange={onChange}></input>
        <input type="submit" value="submit" onClick={onSubmit} />
      </form>
      <GoogleLogin
        clientId="217958793011-rf62op6r0dkc7qgong09sl4fmmm5raf3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default App;
