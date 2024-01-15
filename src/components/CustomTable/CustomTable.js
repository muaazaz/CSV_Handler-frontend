import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Pagination, Typography } from "@mui/material";
import { cloneElement, useState } from "react";
import {
  headerText,
  noRecord,
  statusText,
  tableContainer,
  tableHeader,
  tagText,
} from "./styles";

export default function CustomTable({
  label,
  rowsPerPage = 10,
  paginationHidden = false,
  data,
  view,
  action,
}) {
  const [page, setPage] = useState(1);

  let round = 0,
    count = 0;
  //Calculating no of pages
  if (data?.length / rowsPerPage < 1) {
    count = 1;
  } else {
    if (data?.length % rowsPerPage > 0 && data?.length / rowsPerPage !== 1) {
      round = 1;
    } else {
      round = 0;
    }
    count = parseInt(data?.length / rowsPerPage) + round;
  }
  //Handeling rows to show per page for every page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {data?.length > 0 ? (
        <TableContainer sx={tableContainer}>
          <Table sx={{ marginBottom: "1rem" }}>
            <TableHead sx={tableHeader}>
              <TableRow>
                {label.map((item) => (
                  <TableCell key={item} sx={headerText}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                (paginationHidden
                  ? data
                  : data.slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                ).map((row, i) => (
                  <TableRow key={row + i}>
                    {Object.entries(row).map(([key, val], index) => {
                      if (key === "tags") {
                        return (
                          <TableCell key={index + key} align="left">
                            <Box sx={{ display: "flex" }}>
                              {val.map((val, index) => (
                                <Typography key={val + index} sx={tagText}>
                                  {val}
                                </Typography>
                              ))}
                            </Box>
                          </TableCell>
                        );
                      } else {
                        return (
                          key !== "id" && (
                            <TableCell key={index + key} align="left">
                              <Typography sx={statusText}>{val}</Typography>
                            </TableCell>
                          )
                        );
                      }
                    })}
                    {view && (
                      <TableCell align="left">
                        {cloneElement(action, { data: row })}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Pagination
            variant="outlined"
            color="primary"
            shape="rounded"
            size="large"
            hidden={paginationHidden}
            count={count}
            page={page}
            onChange={handlePageChange}
          />
        </TableContainer>
      ) : (
        <Box>
          <Typography sx={noRecord}>No Records Found</Typography>
        </Box>
      )}
    </>
  );
}
