import React, { useState } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const TableFinalAttainment = ({ data }) => {
  const headingStyle = {
    backgroundColor: "#341f97",
    fontSize: "1.2rem",
    padding: "10px",
    textAlign: "center",
    color: "white",
  };

  const customCellStyle = {
    borderRadius: "6px",
    boxShadow: "inset 1px 1px 3px #341f97",
    textAlign: "center",
    // color: "#341f97",
  };

  const [columns, setColumns] = useState([
    {
      title: "Program Outcome",
      field: "title",
      cellStyle: customCellStyle,
    },
    {
      title: "Attainment through University Examination (X1)",
      field: "uni",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "Attainment through Internal Assessment (X2)",
      field: "pt",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "Overall Attainment Y1=(0.8X1+0.2X2)",
      field: "direct",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "Attainment through Course Exit Survey (Y2)",
      field: "indirect",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "Final Attainment",
      field: "final",
      type: "numeric",
      cellStyle: customCellStyle,
    },
  ]);
  return (
    <div>
      <MaterialTable
        title="Mapping of CO with PO:"
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
          paging: false,
          search: false,
          exportButton: true,
          headerStyle: headingStyle,
        }}
      />
    </div>
  );
};

export default TableFinalAttainment;
