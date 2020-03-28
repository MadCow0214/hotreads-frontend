import React from "react";
import { gql } from "apollo-boost";

//hooks
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

// components
import AutoComplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Input from "../components/Input";

const SEARCH_AUTOCOMPLETE = gql`
  query searchAutoComplete($term: String!, $count: Int!) {
    searchAuthor(term: $term, count: $count) {
      id
      name
    }
    searchBook(term: $term, count: $count) {
      id
      title
    }
  }
`;

const filter = createFilterOptions();

const SearchInput = props => {
  const { onChange } = props;
  const [searchTimerId, setSearchTimerId] = useState();
  const [searchedList, setSearchedList] = useState([]);
  const [autoCompleteQuery, { loading, data }] = useLazyQuery(SEARCH_AUTOCOMPLETE);

  useEffect(() => {
    const bookList = data?.searchBook.map(book => ({ type: "책", name: book.title })) || [];
    const authorList =
      data?.searchAuthor.map(author => ({ type: "저자", name: author.name })) || [];

    setSearchedList([...bookList, ...authorList]);
  }, [data]);

  const onInputChange = (event, newValue) => {
    if (newValue === "") {
      clearTimeout(searchTimerId);
      return;
    }

    if (loading || searchTimerId) {
      clearTimeout(searchTimerId);
    }

    const timerId = setTimeout(() => {
      autoCompleteQuery({
        variables: { term: newValue, count: 3 }
      });
      setSearchTimerId(0);
    }, 200);

    setSearchTimerId(timerId);
  };

  return (
    <AutoComplete
      {...props}
      freeSolo
      disableClearable
      openOnFocus
      clearOnEscape
      ListboxProps={{ style: { fontSize: "12px", fontWeight: "600" } }}
      id="searchInput"
      onChange={(e, value) => {
        onChange(value);
      }}
      onInputChange={onInputChange}
      options={searchedList}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          if (loading || searchTimerId) {
            filtered.push({
              type: "검색중...",
              name: ""
            });
          } else if (filtered.length === 0) {
            filtered.push({
              type: "책/저자를 찾지 못했습니다",
              name: ""
            });
          }
        }

        return filtered;
      }}
      groupBy={option => option.type}
      getOptionLabel={option => {
        if (typeof option === "string") return option;

        return option.name;
      }}
      renderInput={params => (
        <Input
          {...params}
          label="제목/저자"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

export default SearchInput;
