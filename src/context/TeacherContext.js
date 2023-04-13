import { createContext, useState } from "react";
import {
  getTeacherSubject,
  getTeacherLab,
  getGradeById,
  calculateGradeApiCall,
  getAllSubjects,
  getAllLabs,
  getAllBatches,
  assignSubject,
  assignLab,
  updateSubject,
  updateLab,
} from "./apis";

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [pendingDataLab, setPendingDataLab] = useState([]);
  const [completedDataLab, setCompletedDataLab] = useState([]);
  const [grade, setGrade] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [labs, setLabs] = useState([]);
  const [batches, setBatches] = useState([]);

  const fetchTeacherSubjects = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const res = await getTeacherSubject(token, userId, "pending", "Theory");
    if (res.status === "success" && res.data !== undefined) {
      console.log(res.data);
      setPendingData(
        res.data.map((item) => {
          return {
            name: item.subject.subjectName,
            semester: item.subject.semester,
            batch: item.batch.endYear,
            status: item.status,
            id: item.id,
          };
        })
      );
    }
    console.log(res);
    const res2 = await getTeacherSubject(token, userId, "completed", "Theory");
    if (res2.status === "success" && res2.data !== undefined) {
      setCompletedData(
        res2.data.map((item) => {
          return {
            name: item.subject.subjectName,
            semester: item.subject.semester,
            batch: item.batch.endYear,
            status: item.status,
            id: item.id,
          };
        })
      );
    }
    console.log(res2);
    console.log(pendingData, completedData);
  };

  const fetchTeacherLabs = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const res = await getTeacherLab(token, userId, "pending", "Lab");
    if (res.status === "success" && res.data !== undefined) {
      setPendingDataLab(
        res.data.map((item) => {
          return {
            name: item.subject.subjectName,
            semester: item.subject.semester,
            batch: item.batch.endYear,
            status: item.status,
            id: item.id,
          };
        })
      );
    }
    console.log(res);
    const res2 = await getTeacherLab(token, userId, "completed", "Lab");
    if (res2.status === "success" && res2.data !== undefined) {
      setCompletedDataLab(
        res2.data.map((item) => {
          return {
            name: item.subject.subjectName,
            semester: item.subject.semester,
            batch: item.batch.endYear,
            status: item.status,
            id: item.id,
          };
        })
      );
    }
    console.log(res2);
    console.log(pendingDataLab, completedDataLab);
  };

  const calculateGrade = async (body) => {
    const token = localStorage.getItem("token");
    const res = await calculateGradeApiCall(token, body);
    return res;
  };

  const fetchGrade = async (id) => {
    const token = localStorage.getItem("token");
    const res = await getGradeById(token, id);
    if (res.status === "success") {
      setGrade(res.data);
      console.log(res.data);
    }
  };

  const fetchAllSubjectsAndBatches = async (type = "Theory") => {
    const token = localStorage.getItem("token");
    const s = await getAllSubjects(token, type);
    const b = await getAllBatches(token);
    console.log(s, b);

    if (s.status === "success" && s.data !== undefined) {
      const temp = [];
      s.data.forEach((item) => {
        temp.push({ value: item.id, name: item.subjectName });
      });
      if (type === "Theory") setSubjects(temp);
      else setLabs(temp);
      console.log(temp);
    }
    if (b.status === "success") {
      const temp2 = [];
      b.data.results.forEach((item) => {
        temp2.push({ value: item.id, name: item.endYear });
      });
      setBatches(temp2);
    }
  };

  const assignSubjectToTeacher = async (body) => {
    const token = localStorage.getItem("token");
    const res = await assignSubject(token, body);
    if (res.status === "success") {
      fetchTeacherSubjects();
    }
    return res;
  };

  const assignLabToTeacher = async (body) => {
    const token = localStorage.getItem("token");
    const res = await assignLab(token, body);
    if (res.status === "success") {
      fetchTeacherLabs();
    }
    return res;
  };

  const updateSubjectAttainment = async (id, body) => {
    const token = localStorage.getItem("token");
    const res = await updateSubject(token, id, body);
    return res;
  };

  const updateLabAttainment = async (id, body) => {
    const token = localStorage.getItem("token");
    const res = await updateLab(token, id, body);
    return res;
  };

  return (
    <TeacherContext.Provider
      value={{
        pendingData,
        setPendingData,
        completedData,
        setCompletedData,
        pendingDataLab,
        setPendingDataLab,
        completedDataLab,
        setCompletedDataLab,
        fetchTeacherSubjects,
        fetchTeacherLabs,
        calculateGrade,
        grade,
        setGrade,
        fetchGrade,
        subjects,
        labs,
        batches,
        fetchAllSubjectsAndBatches,
        assignSubjectToTeacher,
        assignLabToTeacher,
        updateSubjectAttainment,
        updateLabAttainment,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
