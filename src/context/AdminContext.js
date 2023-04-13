import { createContext, useState } from "react";
import {
  getAllTeachers,
  getAllBatches,
  getAllSubjects,
  getAllLabs,
  getAllGradesOfBatch,
  createSubject,
  createLab,
  // getSubjectById,
  // getLabById,
  createBatch,
  updateBatchApi,
  deleteBatchApi,
  updateTeachers,
} from "./apis";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [labs, setLabs] = useState([]);
  const [grades, setGrades] = useState([]);

  const fetchTeachers = async () => {
    const token = localStorage.getItem("token");
    const res = await getAllTeachers(token);
    if (res.status === "success") {
      const temp = [];
      res.data.results.forEach((item) => {
        temp.push({
          name: item.pre + item.name,
          subjects: item.subjects.join(", "),
          id: item.id,
          isActive: item.isActive,
        });
      });
      setTeachers(temp);
    }
  };

  const fetchAllBatches = async () => {
    const token = localStorage.getItem("token");
    const res = await getAllBatches(token);
    if (res.status === "success") {
      setBatches(res.data.results);
    }
  };

  const fetchAllSubjects = async () => {
    const token = localStorage.getItem("token");
    const s = await getAllSubjects(token, "Theory");
    console.log("s", s.data);
    if (s.status === "success") {
      setSubjects(s.data);
    }
  };

  const fetchAllLabs = async () => {
    const token = localStorage.getItem("token");
    const s = await getAllLabs(token);
    if (s.status === "success") {
      setLabs(s.data);
    }
  };

  const transformYearToFE = (year, startYear) => {
    const yearMap = {
      1: "FE",
      2: "SE",
      3: "TE",
      4: "BE",
    };
    return (
      yearMap[year] +
      " " +
      (startYear + year - 1).toString().slice(2) +
      "-" +
      (startYear + year).toString().slice(2)
    );
  };

  const fetchAllGradesOfBatch = async (batchId) => {
    const token = localStorage.getItem("token");
    const res = await getAllGradesOfBatch(token, batchId);
    if (res.status === "success" && res.data.length > 0) {
      console.log("res", res);
      const start = res.data[0].batch.startYear;
      console.log("start", start);
      const temp = [];
      res.data.forEach((item) => {
        const sub = item.subject;
        const x = {
          year: transformYearToFE(sub.year, start),
          course: sub.subjectCode,
          subjectName: sub.subjectName,
          semester: sub.semester,
          type: sub.type,
        };
        item.output.forEach((ele) => {
          x[ele.title] = ele.final;
        });
        temp.push(x);
      });
      const sorted = temp.sort((a, b) => {
        if (a.semester === b.semester) {
          if (a.type === b.type) {
            return a.course <= b.course ? -1 : 1;
          }
          return a.type === "Theory" ? -1 : 1;
        }
        return a.semester < b.semester ? -1 : 1;
      });
      setGrades(sorted);
      console.log("temp", temp);
    }
  };

  const createNewSubject = async (body) => {
    const token = localStorage.getItem("token");
    const res = await createSubject(token, body);
    return res;
  };

  const createNewLab = async (body) => {
    const token = localStorage.getItem("token");
    const res = await createLab(token, body);
    return res;
  };

  const createNewBatch = async (body) => {
    const token = localStorage.getItem("token");
    const res = await createBatch(token, body);
    return res;
  };

  const updateBatch = async (id, body) => {
    const token = localStorage.getItem("token");
    const res = await updateBatchApi(token, id, body);
    return res;
  };

  const delelteBatch = async (id) => {
    const token = localStorage.getItem("token");
    const res = await deleteBatchApi(token, id);
    return res;
  };

  const updateTeacher = async (id, body) => {
    const token = localStorage.getItem("token");
    const res = await updateTeachers(token, id, body);
    return res;
  };

  return (
    <AdminContext.Provider
      value={{
        teachers,
        fetchTeachers,
        setTeachers,
        fetchAllBatches,
        batches,
        setBatches,
        subjects,
        setSubjects,
        fetchAllSubjects,
        fetchAllLabs,
        grades,
        setGrades,
        fetchAllGradesOfBatch,
        createNewSubject,
        labs,
        createNewLab,
        createNewBatch,
        updateBatch,
        delelteBatch,
        updateTeacher,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
