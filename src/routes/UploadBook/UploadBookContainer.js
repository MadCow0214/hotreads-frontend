import React from "react";
import { gql } from "apollo-boost";
import UploadBookPresenter from "./UploadBookPresenter";
import axios from "axios";

// hooks
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Loader from "../../components/Loader";

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $subtitle: String
    $category: Int!
    $authorId: String!
    $company: String!
    $image: String
    $desc: String
    $publishDate: String
  ) {
    createBook(
      title: $title
      subtitle: $subtitle
      category: $category
      authorId: $authorId
      company: $company
      image: $image
      desc: $desc
      publishDate: $publishDate
    ) {
      id
    }
  }
`;

const UploadBookContainer = props => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(0);
  const titleInput = useInput("");
  const subtitleInput = useInput("");
  const companyInput = useInput("");
  const [date, setDate] = useState(new Date());
  const [author, setAuthor] = useState(null);
  const descInput = useInput("");

  const [createBookMutaion] = useMutation(CREATE_BOOK);

  const onSubmit = async event => {
    event.preventDefault();

    if (uploading) {
      console.log("error");
      return;
    }

    setUploading(true);

    if (!category) {
      console.log("error");
      return;
    }

    if (!author?.id) {
      console.log("error");
      return;
    }

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
      await createBookMutaion({
        variables: {
          title: titleInput.value,
          subtitle: subtitleInput.value,
          category: category,
          authorId: author.id,
          company: companyInput.value,
          image: imageUrl,
          desc: descInput.value,
          publishDate: date.toString()
        }
      });
    } catch {
      console.log("error");
    }

    props.history.push(`/book/${titleInput.value}`);
  };

  return (
    <>
      {uploading && <Loader />}
      {!uploading && (
        <UploadBookPresenter
          image={image}
          setImage={setImage}
          setCategory={setCategory}
          titleInput={titleInput}
          subtitleInput={subtitleInput}
          companyInput={companyInput}
          date={date}
          setDate={setDate}
          setAuthor={setAuthor}
          descInput={descInput}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default UploadBookContainer;
