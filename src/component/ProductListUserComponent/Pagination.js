import * as React from "react";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
export default function Content({
  category,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) {
  const categoryName = category ? `category/${category}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/shop/product-list/${categoryName}${search}`;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt("1", paginationLinksNumber);
  const navigate = useNavigate();
  const handlePagination = (e, page) => {
    navigate(url + page);
  };
  // return (
  //   <Pagination
  //     page={pageNum}
  //     count={paginationLinksNumber}
  //     renderItem={(item) => (
  //       <PaginationItem
  //         component={Link}
  //         // to={`${url}${pageNum === 1 ? "" : `?page=${paginationLinksNumber}`}`}
  //         to={`${url}${pageNum + 1}`}
  //         {...item}
  //         key={item.page}
  //       />
  //     )}
  //   />
  // );
  return (
    <Stack spacing={5}>
      <Pagination count={paginationLinksNumber} onChange={handlePagination} />
    </Stack>
  );
}
