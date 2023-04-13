
import React, { useState, useEffect, useContext } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { useHistory } from "react-router";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

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

import { AdminContext } from "context/AdminContext";

import CardPendingLab from "components/Cards/CardPendingLab";
import AssignLab from "views/teacher/AssignLab";
import NewTableLab from "components/Cards/NewTableLab";
import CreateSubject from "./CreateSubject";

const headingStyle = {
    backgroundColor: "#341f97",
    fontSize: "1.2rem",
    padding: "10px",
    textAlign: "center",
    color: "white",
};

const customCellStyle = {
    textAlign: "center",
    // color: "rgb(109 40 217)",
};

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

const styles = {
    container: `m-8 flex`,
    head: ``,
    table: `w-full`,
    teachers: ``,
};

const Labs = () => {
    const history = useHistory();
    const { labs, setLabs, fetchAllLabs } = useContext(AdminContext);

    useEffect(async () => {
        await fetchAllLabs();
        console.log(labs);
    }, []);

    const [columns, setColumns] = useState([
        {
            title: "Semester",
            field: "semester",
        },
        {
            title: "Year",
            field: "year",
            lookup: { 1: "FE", 2: "SE", 3: "TE", 4: "BE" },
        },
        { title: "Code", field: "subjectCode" },
        {
            title: "Subject",
            field: "subjectName",
        },
        {
            title: "Action",
            field: "internal_action",
            render: (rowData) =>
                rowData && (
                    <div className="w-full justify-center">
                        <button className="bg-emerald-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded">
                            Edit
                        </button>
                    </div>
                ),
        },
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                {labs.length > 0 && (
                    <div className="flex flex-col">
                        <NewTableLab
                            columns={["Subject", "semester", "year", "code", "action"]}
                            data={labs}
                            title="Labs"
                            onAddClick={() => {
                                history.push("/admin/labs/create");
                            }}
                            onEditClick={(ele) => {
                                console.log(ele);
                                history.push(`/admin/labs/create`, ele.id);

                                // <Route to="/admin/subjects/create" element={<CreateSubject subjectName={ele.subjectName} />} /> 
                            }}
                            onViewClick={(ele) => {
                                console.log(ele);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Labs;
