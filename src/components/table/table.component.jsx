import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import uuid from "react-uuid";
import {
  Button,
  Typography,
  Chip,
  TableFooter,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import { capitalizeFirstLetter } from "utils/functions.utils";
import { Switch } from "imports/components.imports";
import Link from "@mui/material/Link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFF4D6",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.3rem",
    left: 0,
    position: "sticky",
  },
}));

export default function CustomizedTables({
  headers,
  body,
  onDelete,
  hasFooter,
  footer,
  onSwitch,
  handleLinkClick,
  hasPagination,
  totalPage,
  totalDocs,
  limit,
  page,
  onPageChange,
  onPay,
  footerBtnLoad,
}) {
  const renderCells = (row, head, index) => {
    if (head?.value === "all") {
      const properties = _.pick(row[head.mainObj], head.keys);
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          {Object.values(properties).map((key) => (
            <Chip
              key={uuid()}
              sx={{ bgcolor: "#121828", m: 0.5, fontSize: "1rem" }}
              label={capitalizeFirstLetter(key)}
              color="secondary"
            />
          ))}
        </StyledTableCell>
      );
    } else if (head?.serial) {
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
      );
    } else if (head?.value?.includes(".")) {
      let keys = head?.value.split(".");
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          <Typography>{row[keys[0]][keys[1]]}</Typography>
        </StyledTableCell>
      );
    } else if (head?.button) {
      let key = [];
      let condidion_result = false;
      if (head?.payCondition) {
        if (head?.conditionObject?.includes(".")) {
          key = head?.conditionObject.split(".");
        } else {
          key = [head?.conditionObject];
        }
        if (key.length > 1) {
          let day = moment.utc(row[key[0]][key[1]]).format("YYYY-MM-DD");
          condidion_result = moment
            .utc(day)
            .isBefore(moment.utc().format("YYYY-MM-DD"));
        }
      }
      return (
        <StyledTableCell
          key={uuid()}
          align={head.textAlign || "left"}
          sx={{ display: "flex" }}
        >
          {head?.pay && (
            <Button
              color={head?.payColor ? head?.payColor : "success"}
              variant="contained"
              disabled={head?.payCondition ? !condidion_result : false}
              onClick={() => onPay(row)}
              sx={{ mr: 2 }}
            >
              {head?.payText ? head?.payText : "Pay"}
            </Button>
          )}
          {head?.delete && (
            <Button
              color={head?.deleteColor ? head?.deleteColor : "error"}
              variant="contained"
              onClick={() => onDelete(row)}
              disabled={head?.payCondition ? !condidion_result : false}
            >
              {head?.deleteText ? head?.deleteText : "Delete"}
            </Button>
          )}
        </StyledTableCell>
      );
    } else if (head?.switch) {
      return (
        <StyledTableCell
          key={uuid()}
          sx={{ textAlign: head.textAlign ? head.textAlign : "left" }}
          align="center"
        >
          <Switch
            firstLable={"Opt-Out"}
            lastLable={"Opt-In"}
            firstLableColor="error"
            lastLabelColor={"secondary"}
            value={row[head.value]}
            onChange={(e) => onSwitch(e, row)}
          />
        </StyledTableCell>
      );
    } else if (head?.date) {
      let format = head?.hasTime ? "MM-DD-YYYY HH:mm a" : "MM-DD-YYYY";
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          <Typography>
            {head?.hasTime
              ? moment.utc(row[head.value]).format(format)
              : moment.utc(row[head.value]).format(format)}
          </Typography>
        </StyledTableCell>
      );
    } else if (head?.hyberLink) {
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          <Link
            href={!head?.path && "#"}
            variant="body1"
            underline="none"
            sx={{ cursor: "pointer" }}
            onClick={() => handleLinkClick(row)}
          >
            {row[head.value]}
          </Link>
        </StyledTableCell>
      );
    } else {
      return (
        <StyledTableCell key={uuid()} align={head.textAlign || "left"}>
          <Typography>{row[head.value]}</Typography>
        </StyledTableCell>
      );
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 2px 52px -9px rgba(0,0,0,0.75);",
        userSelect: "none",
        maxHeight: "100%",
        "&::-webkit-scrollbar": {
          width: 5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "lightgray",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "gray",
          borderRadius: 2,
        },
      }}
    >
      <Table
        stickyHeader
        sx={{ width: "100%", maxHeight: "100%" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {headers.map((head) => (
              <TableCell key={uuid()} align={head.textAlign || "left"}>
                {head.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ position: "relative" }}>
          {body.map((row, index) => (
            <StyledTableRow sx={{ minHeight: 0 }} key={uuid()}>
              {headers.map((head) => renderCells(row, head, index))}
            </StyledTableRow>
          ))}
          {hasFooter && (
            <StyledTableRow
              style={{
                position: "sticky",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "white",
              }}
            >
              {footer.map((foot) =>
                foot.button ? (
                  <StickyTableCell
                    align={foot.textAlign}
                    colSpan={foot.calSpan}
                    key={uuid()}
                    sx={{ bgcolor: "white" }}
                  >
                    <Button
                      onClick={foot.onClick}
                      variant="contained"
                      color={foot.btnColor || "primary"}
                      disabled={footerBtnLoad}
                    >
                      {foot.buttonText}
                    </Button>
                  </StickyTableCell>
                ) : (
                  <StickyTableCell
                    align={foot.textAlign}
                    colSpan={foot.calSpan}
                    key={uuid()}
                    sx={{ fontWeight: 700, fontSize: "1rem", bgcolor: "white" }}
                  >
                    {foot.value}
                  </StickyTableCell>
                )
              )}
            </StyledTableRow>
          )}
        </TableBody>
        {hasPagination && (
          <TableFooter
            style={{
              position: "sticky",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "white",
            }}
          >
            <TableRow sx={{ bgcolor: "white" }}>
              <TablePagination
                count={totalDocs}
                page={page - 1}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page + 1}`;
                }}
                rowsPerPage={limit}
                rowsPerPageOptions={[]}
                backIconButtonProps={{
                  color: "secondary",
                }}
                nextIconButtonProps={{ color: "secondary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number",
                  },
                }}
                onPageChange={(e, page) => onPageChange(page + 1)}
                showFirstButton={true}
                showLastButton={true}
                //ActionsComponent={TablePaginationActions}
                //component={Box}
                //sx and classes prop discussed in styling section
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
