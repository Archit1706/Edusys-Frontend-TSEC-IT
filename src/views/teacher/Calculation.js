import React, { useContext, useState, useEffect } from "react";
import TableCoPo from "../../components/Dashboard/TableCoPo";
import TableExitSurvey from "../../components/Dashboard/TableExitSurvey";
import TablePt from "../../components/Dashboard/TablePt";
import TableUni from "../../components/Dashboard/TableUni";
import { getFinalAttainment } from "../../Util/Calculations";
import TableFinalAttainment from "../../components/Dashboard/TableFinalAttainment";
import { TeacherContext } from "context/TeacherContext";
import MaterialTable from "material-table";
import TableTarget from "components/Dashboard/TableTarget";
const sample = "../../../sample.json";
// import "./Dashboard.css";
// import isOpen from "../Sidebar2/Sidebar";

const styles = {
  dash: `m-5 w-[90%]`,
  dashboard: ``,
  buttonDiv: `flex items-center justify-center`,
  button: `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-8 rounded`,
  table: `rounded-md mb-5`,
  hr: `p-5`,
};

const customCellStyle = {
  borderRadius: "6px",
  boxShadow: "inset 1px 1px 3px #341f97",
  textAlign: "center",

  // color: "#341f97",
};

const transform = (d) => {
  return d.map((co) => {
    return {
      co: co.CO,
      description: co.course_outcome,
      data: [
        {
          title: "PO1",
          value: co.PO1 ? co.PO1 : null,
        },
        {
          title: "PO2",
          value: co.PO2 ? co.PO2 : null,
        },
        {
          title: "PO3",
          value: co.PO3 ? co.PO3 : null,
        },
        {
          title: "PO4",
          value: co.PO4 ? co.PO4 : null,
        },
        {
          title: "PO5",
          value: co.PO5 ? co.PO5 : null,
        },
        {
          title: "PO6",
          value: co.PO6 ? co.PO6 : null,
        },
        {
          title: "PO7",
          value: co.PO7 ? co.PO7 : null,
        },
        {
          title: "PO8",
          value: co.PO8 ? co.PO8 : null,
        },
        {
          title: "PO9",
          value: co.PO9 ? co.PO9 : null,
        },
        {
          title: "PO10",
          value: co.PO10 ? co.PO10 : null,
        },
        {
          title: "PO11",
          value: co.PO11 ? co.PO11 : null,
        },
        {
          title: "PO12",
          value: co.PO12 ? co.PO12 : null,
        },
        {
          title: "PSO1",
          value: co.PSO1 ? co.PSO1 : null,
        },
        {
          title: "PSO2",
          value: co.PSO2 ? co.PSO2 : null,
        },
        {
          title: "PSO3",
          value: co.PSO3 ? co.PSO3 : null,
        },
        {
          title: "PSO4",
          value: co.PSO4 ? co.PSO4 : null,
        },
      ],
    };
  });
};

const Calculation = (props) => {
  const [customData, setCustomData] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const gradeId = props.location.state.gradeId;
  console.log("gradeId", props);
  const {
    fetchGrade,
    grade,
    setGrade,
    output,
    calculateGrade,
    updateSubjectAttainment,
  } = useContext(TeacherContext);
  useEffect(() => {
    setGrade(null);
    fetchGrade(gradeId);
  }, []);

  useEffect(() => {
    if (grade !== null) {
      console.log(grade);
      const tempData = [];
      const cos = [];
      const tempColumns = [
        {
          title: "CO",
          field: "CO",
          cellStyle: customCellStyle,
        },
      ];
      setSubjectName(grade.subject.subjectName);
      setSubjectId(grade.subject.id.toString());
      grade.subject.attainment.forEach((ele, idx) => {
        cos.push({
          "CO No.": ele.co,
          "Course Outcome": ele.description,
          Attainment: 1,
        });
        tempData.push({
          CO: ele.co,
        });
        ele.data.forEach((po) => {
          tempData[idx][po.title] = po.value;
        });
      });
      grade.subject.attainment[0].data.forEach((ele) => {
        tempColumns.push({
          title: ele.title,
          field: ele.title,
          cellStyle: customCellStyle,
          type: "numeric",
        });
      });
      setColumns(tempColumns);
      setData(tempData);
      console.log(tempData);
      setPtAtt(cos);
      setExitAtt(cos);
      setUniAtt([
        {
          "CO No.": grade.subject.subjectCode,
          Course: grade.subject.subjectName,
          Attainment: 1,
        },
      ]);
      setTarget(grade.subject.target);
      console.log("target", grade.subject.target);
    }
  }, [grade]);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [uniAtt, setUniAtt] = useState([]);
  const [target, setTarget] = useState(null);

  const coUpdateListener = async (cos) => {
    if (subjectId.length === 0) return;
    console.log(transform(cos));
    const body = {
      attainment: transform(cos),
    };
    const res = await updateSubjectAttainment(subjectId, body);
    if (res.status === "success") {
      setData(cos);
    } else {
      console.log("error to be handled");
    }
    console.log(cos);
  };

  const uniUpdateListener = (att) => {
    setUniAtt(att);
  };

  const [ptAtt, setPtAtt] = useState([]);

  const ptUpdateListener = (att) => {
    setPtAtt(att);
  };

  const [exitAtt, setExitAtt] = useState([]);

  const exitAttUpdateListener = (att) => {
    setExitAtt(att);
  };
  const [finalAtt, setfinalAtt] = useState([]);

  useEffect(() => {
    if (finalAtt.length > 0) {
      console.log(finalAtt);
      const temp = [];
      finalAtt.forEach((item) => {
        temp.push({
          po: item.title,
          target: parseFloat(target[item.title].toFixed(2)),
          attainment: item.final,
        });
      });
      setCustomData(temp);
    }
  }, [finalAtt]);

  const onCalculateClickListener = async () => {
    const pt = [];
    const exit = [];
    const uni = [];
    ptAtt.forEach((ele) => {
      pt.push(Number(ele.Attainment));
    });
    exitAtt.forEach((ele) => {
      exit.push(Number(ele.Attainment));
    });
    for (let i = 0; i < ptAtt.length; i++) {
      uni.push(Number(uniAtt[0].Attainment));
    }
    const body = {
      batch: grade.batch.id,
      subject: grade.subject.id,
      teacher: grade.teacher.id,
      pt: pt,
      indirect: exit,
      uni: uni,
    };
    const res = await calculateGrade(body);
    console.log(res);
    if (res.status === "success") {
      const temp = [];
      res.data.output.forEach((ele) => {
        if (ele.final > 0) temp.push(ele);
      });
      setfinalAtt(temp);
    }
  };

  return (
    <div className={`${styles.dash}`}>
      {/* <h1>{props.subject}</h1> */}
      <div className={styles.dashboard}>
        <TableCoPo
          className={styles.table}
          data={data}
          onUpdate={coUpdateListener}
          columns={columns}
        />
        <hr className={styles.hr} />
        <TableUni
          className={styles.table}
          data={uniAtt}
          onUpdate={uniUpdateListener}
        />
        <hr className={styles.hr} />
        <TablePt
          className={styles.table}
          data={ptAtt}
          onUpdate={ptUpdateListener}
        />
        <hr className={styles.hr} />
        <TableExitSurvey
          className={styles.table}
          data={exitAtt}
          onUpdate={exitAttUpdateListener}
        />
        <hr className={styles.hr} />
        <div class={styles.buttonDiv}>
          <button class={styles.button} onClick={onCalculateClickListener}>
            Calculate
          </button>
        </div>
        <hr className={styles.hr} />
        <TableFinalAttainment className={styles.table} data={finalAtt} />
        <hr className={styles.hr} />
        <TableTarget customData={customData} subjectName={subjectName} />
      </div>
    </div>
  );
};

export default Calculation;
