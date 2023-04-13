// const BASE_URL = "http://localhost:8000/v1";
const BASE_URL = "https://edusys-backend-vra9.onrender.com/v1";

const signin = async (useBody) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(useBody),
  });
  const x = await res.json();
  console.log(x.code, typeof x.code);
  return {
    status:
      x.code === undefined ||
        (200 <= parseInt(x.code) && parseInt(x.code) < 300)
        ? "success"
        : "error",
    data: x,
  };
};

const signup = async (useBody) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(useBody),
  });
  console.log(res);
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getTeacherSubject = async (token, userId, status, type) => {
  const res = await fetch(
    `${BASE_URL}/grade?status=${status}&teacher=${userId}&type=${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getTeacherLab = async (token, userId, status) => {
  const res = await fetch(
    `${BASE_URL}/grade?status=${status}&teacher=${userId}&type=Lab`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const calculateGradeApiCall = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/grade/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getGradeById = async (token, id) => {
  const res = await fetch(`${BASE_URL}/grade/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getAllSubjects = async (token, type) => {
  const res = await fetch(
    `${BASE_URL}/subject?sortBy=semester&type=${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getAllLabs = async (token) => {
  const res = await fetch(`${BASE_URL}/subject?sortBy=semester&type=Lab`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getAllBatches = async (token) => {
  const res = await fetch(`${BASE_URL}/batch`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const assignSubject = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/grade/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const assignLab = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/grade/assignLab`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getAllTeachers = async (token) => {
  const res = await fetch(`${BASE_URL}/users?limit=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const updateTeachers = async (token, id, body) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getAllGradesOfBatch = async (token, batchId) => {
  const res = await fetch(
    `${BASE_URL}/grade/all?batch=${batchId}&limit=100&sortBy=semester&status=completed`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const createSubject = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/subject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const createLab = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/lab`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const updateSubject = async (token, id, body) => {
  const res = await fetch(`${BASE_URL}/subject/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const updateLab = async (token, id, body) => {
  const res = await fetch(`${BASE_URL}/lab/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getSubjectById = async (token, id) => {
  const res = await fetch(`${BASE_URL}/subject/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const getLabById = async (token, id) => {
  const res = await fetch(`${BASE_URL}/lab/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const createBatch = async (token, useBody) => {
  const res = await fetch(`${BASE_URL}/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(useBody),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const updateBatchApi = async (token, id, body) => {
  const res = await fetch(`${BASE_URL}/batch/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

const deleteBatchApi = async (token, id) => {
  const res = await fetch(`${BASE_URL}/batch/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    status: 200 <= res.status < 300 ? "success" : "error",
    data: await res.json(),
  };
};

exports.assignLab = assignLab;

module.exports = {
  signin,
  signup,
  getTeacherSubject,
  getTeacherLab,
  calculateGradeApiCall,
  getGradeById,
  getAllSubjects,
  getAllLabs,
  getAllBatches,
  assignSubject,
  assignLab,
  getAllTeachers,
  getAllGradesOfBatch,
  createSubject,
  createLab,
  getSubjectById,
  getLabById,
  updateSubject,
  updateLab,
  createBatch,
  updateBatchApi,
  deleteBatchApi,
  updateTeachers,
};
