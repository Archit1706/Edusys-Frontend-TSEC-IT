import React, { useState, useEffect, useContext, forwardRef } from "react";
import { TeacherContext } from "context/TeacherContext";
import SelectSearch from "react-select-search";
import MaterialTable from "material-table";
import data from "./staticData";
import { AdminContext } from "context/AdminContext";

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

export default function Dashboard() {
  const headingStyle = {
    backgroundColor: "#341f97",
    fontSize: "0.9rem",
    textAlign: "center",
    color: "white",
    padding: "0.5rem 0.1rem",
    multiline: "true",
  };
  const [selectedBatch, setSelectedBatch] = useState("");
  const { batches, fetchAllSubjectsAndBatches } = useContext(TeacherContext);
  const { fetchAllGradesOfBatch, grades, setGrades } = useContext(AdminContext);
  useEffect(async () => {
    await fetchAllSubjectsAndBatches();
  }, []);

  useEffect(async () => {
    if (selectedBatch !== "") {
      const batch = batches.find((batch) => batch.value === selectedBatch);
      console.log(batch);
      if (batch) {
        const x = (
          (Number(batch.name) - 4).toString() +
          "-" +
          batch.name
        ).toString();
        console.log(typeof x);
        setCurBatch(x);
      }
      setGrades([]);
      await fetchAllGradesOfBatch(selectedBatch);
    }
  }, [selectedBatch]);

  const customCellStyle = {
    fontSize: "0.9rem",
    textAlign: "center",
    padding: "0.5rem 0.1rem",
  };

  const [curBatch, setCurBatch] = useState("");

  const [columns, setColumns] = useState([
    {
      title: "Year",
      field: "year",
      cellStyle: customCellStyle,
    },
    {
      title: "Semester",
      field: "semester",
      cellStyle: customCellStyle,
    },
    {
      title: "Course",
      field: "course",
      cellStyle: customCellStyle,
    },
    {
      title: "Subject",
      field: "subjectName",
      cellStyle: customCellStyle,
    },
    {
      title: "PO1",
      field: "PO1",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO2",
      field: "PO2",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO3",
      field: "PO3",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO4",
      field: "PO4",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO5",
      field: "PO5",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO6",
      field: "PO6",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO7",
      field: "PO7",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO8",
      field: "PO8",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO9",
      field: "PO9",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO10",
      field: "PO10",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO11",
      field: "PO11",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PO12",
      field: "PO12",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PSO1",
      field: "PSO1",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PSO2",
      field: "PSO2",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PSO3",
      field: "PSO3",
      type: "numeric",
      cellStyle: customCellStyle,
    },
    {
      title: "PSO4",
      field: "PSO4",
      type: "numeric",
      cellStyle: customCellStyle,
    },
  ]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full  shadow-lg rounded">
        <div className="rounded-t mb-0 px-6 py-6 border-0 ">
          <div className="flex items-center justify-end z-10">
            <div className="pr-4 text-lg">Batch: </div>
            {batches.length > 0 && (
              <SelectSearch
                options={batches}
                onChange={(value) => setSelectedBatch(value)}
                placeholder={"Select batch"}
                search={true}
              />
            )}
          </div>
        </div>
        <div className="block w-full overflow-x-auto z-0">
          {grades.length > 0 ? (
            <div>
              <MaterialTable
                title={"PO Attainment for AY " + curBatch + " Batch"}
                columns={columns}
                data={grades}
                icons={tableIcons}
                options={{
                  paging: false,
                  search: false,
                  headerStyle: headingStyle,
                  exportButton: true,
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-md text-gray-600">No data available</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
