import React from "react";
import { gql } from "apollo-boost";
import UploadBookPresenter from "./UploadBookPresenter";
import axios from "axios";
import { toast } from "react-toastify";

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
      error
      book {
        id
      }
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

  const isToday = someDate => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const onSubmit = async event => {
    event.preventDefault();

    if (!category) {
      toast.error("분류를 선택해주세요.");
      return;
    }

    if (isToday(date)) {
      toast.error("출간일을 선택해주세요.");
      return;
    }

    if (!author?.id) {
      toast.error("저자를 선택해주세요.");
      return;
    }

    if (uploading) {
      toast.warn("잠시만 기다려 주세요...");
      return;
    }

    setUploading(true);

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(process.env.REACT_APP_CONTENTS_SERVER_URL, formData);

      if (res.status !== 200) {
        toast.error("업로드 중 오류가 발생하였습니다.");
        return;
      }

      imageUrl = res.data.url;
    }

    try {
      const { data } = await createBookMutaion({
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

      if (data?.createBook.error) {
        if (data.createBook.error === 1) {
          toast.warn("이미 등록된 책입니다.");
        } else {
          setUploading(false);
          toast.error("업로드 중 오류가 발생하였습니다.");
          return;
        }
      }
    } catch {
      setUploading(false);
      toast.error("업로드 중 오류가 발생하였습니다.");
      return;
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
