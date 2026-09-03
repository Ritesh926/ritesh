import api from "./client";

export const getProfile = () => api.get("/profile").then((r) => r.data);
export const updateProfile = (payload) => api.put("/profile", payload).then((r) => r.data);
export const uploadPhoto = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.put("/profile/photo", fd).then((r) => r.data);
};
export const uploadResume = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.put("/profile/resume", fd).then((r) => r.data);
};
export const trackResume = () => api.get("/profile/resume").then((r) => r.data);

export const getSkills = () => api.get("/skills").then((r) => r.data);
export const createSkillCategory = (payload) => api.post("/skills", payload).then((r) => r.data);
export const updateSkillCategory = (id, payload) => api.put(`/skills/${id}`, payload).then((r) => r.data);
export const deleteSkillCategory = (id) => api.delete(`/skills/${id}`).then((r) => r.data);
export const addSkill = (id, payload) => api.post(`/skills/${id}/skills`, payload).then((r) => r.data);
export const updateSkill = (id, skillId, payload) =>
  api.put(`/skills/${id}/skills/${skillId}`, payload).then((r) => r.data);
export const deleteSkill = (id, skillId) => api.delete(`/skills/${id}/skills/${skillId}`).then((r) => r.data);

export const getExperience = () => api.get("/experience").then((r) => r.data);
export const createExperience = (payload) => api.post("/experience", payload).then((r) => r.data);
export const updateExperience = (id, payload) => api.put(`/experience/${id}`, payload).then((r) => r.data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`).then((r) => r.data);

export const getProjects = () => api.get("/projects").then((r) => r.data);
export const saveProject = (payload, id) => {
  const fd = toForm(payload);
  return (id ? api.put(`/projects/${id}`, fd) : api.post("/projects", fd)).then((r) => r.data);
};
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);

export const getCertifications = () => api.get("/certifications").then((r) => r.data);
export const saveCertification = (payload, id) => {
  const fd = toForm(payload);
  return (id ? api.put(`/certifications/${id}`, fd) : api.post("/certifications", fd)).then((r) => r.data);
};
export const deleteCertification = (id) => api.delete(`/certifications/${id}`).then((r) => r.data);

export const getEducation = () => api.get("/education").then((r) => r.data);
export const createEducation = (payload) => api.post("/education", payload).then((r) => r.data);
export const updateEducation = (id, payload) => api.put(`/education/${id}`, payload).then((r) => r.data);
export const deleteEducation = (id) => api.delete(`/education/${id}`).then((r) => r.data);

export const sendContact = (payload) => api.post("/contact", payload).then((r) => r.data);
export const getMessages = () => api.get("/contact").then((r) => r.data);
export const deleteMessage = (id) => api.delete(`/contact/${id}`).then((r) => r.data);

export const getDashboard = () => api.get("/dashboard").then((r) => r.data);
export const loginAdmin = (payload) => api.post("/auth/login", payload).then((r) => r.data);
export const getMe = () => api.get("/auth/me").then((r) => r.data);
export const changePassword = (payload) => api.put("/auth/password", payload).then((r) => r.data);

function toForm(payload) {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "file" && value) fd.append("file", value);
    else if (typeof value === "boolean") fd.append(key, String(value));
    else fd.append(key, value);
  });
  return fd;
}
