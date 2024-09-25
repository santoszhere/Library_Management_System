import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  timeout: 120000,
});

const loginUSER = (data) => {
  return apiClient.post("/users/login", data);
};

const getCurrentUser = () => {
  return apiClient.get("/users/current-user");
};
const registerUSER = (data) => {
  return apiClient.post("/users/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const logoutUSER = () => {
  return apiClient.post("/users/logout");
};

const getAvailableUsers = () => {
  return apiClient.get("/chats/users");
};

const getUserChats = () => {
  return apiClient.get(`/chats`);
};

const createUserChat = (receiverId) => {
  return apiClient.post(`/chats/c/${receiverId}`);
};

const createGroupChat = (data) => {
  return apiClient.post(`/chats/group`, data);
};

const getGroupInfo = (chatId) => {
  return apiClient.get(`/chats/group/${chatId}`);
};

const updateGroupName = (chatId, name) => {
  return apiClient.patch(`/chats/group/${chatId}`, { name });
};

const deleteGroup = (chatId) => {
  return apiClient.delete(`/chats/group/${chatId}`);
};

const deleteOneOnOneChat = (chatId) => {
  return apiClient.delete(`/chats/remove/${chatId}`);
};

const addParticipantToGroup = (chatId, participantId) => {
  return apiClient.post(`/chats/group/${chatId}/${participantId}`);
};

const removeParticipantFromGroup = (chatId, participantId) => {
  return apiClient.delete(`/chats/group/${chatId}/${participantId}`);
};

const getChatMessages = (chatId) => {
  return apiClient.get(`/chat/messages/${chatId}`);
};

const sendMessage = (chatId, content) => {
  return apiClient.post(`/chat/messages/${chatId}`, { content });
};

const deleteMessage = (chatId, messageId) => {
  return apiClient.delete(`/chat/messages/${chatId}/${messageId}`);
};
const getNotification = () => {
  return apiClient.get("/notification/get-notification");
};

const returnBook = (id) => {
  return apiClient.post(`/borrow/books/${id}/return`, {});
};
const borrowBook = (bookId) => {
  return apiClient.post(`/borrow/books/${bookId}/borrow`, {});
};

const updateUser = (editData) => {
  return apiClient.put(`/users/update`, { editData });
};
const getAllBooks = () => {
  return apiClient.get("/books/get-all-books");
};

const adminGetALlUser = () => {
  return apiClient.get("/admin/get-all-users");
};
const adminGetAllBook = () => {
  return apiClient.get("/admin/get-all-books");
};
const adminDeleteUser = (id) => {
  return apiClient.delete(`/admin/delete-user/${id}`);
};
const adminUpdateRole = (id, newRole) => {
  return apiClient.put(`/admin/update-user-role/${id}`, {
    role: newRole,
  });
};
const adminDeleteBook = (id) => {
  return apiClient.delete(`/books/delete-book/${id}`);
};

const getSingleBook = (id) => {
  return apiClient.get(`/books/get-single-book/${id}`);
};
const createBook = (data) => {
  return apiClient.post("/books/add-book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const searchQuery = (params) => {
  return apiClient.get("/search/query", { params });
};
const getCategory = (params) => {
  return apiClient.get("/search/get-category");
};

const editBook = (id, data) => {
  return apiClient.put(`/books/update-book/${id}`, { data });
};
const getAdminStatictics = () => {
  return apiClient.get("/admin/get-statistics");
};
const getOtherUser = (userId) => {
  return apiClient.get(`/users/get-other-user/${userId}`);
};
// Export all the API functions
export {
  adminGetALlUser,
  adminDeleteUser,
  adminUpdateRole,
  adminGetAllBook,
  adminDeleteBook,
  getAdminStatictics,
  searchQuery,
  getOtherUser,
  getCategory,
  createBook,
  getSingleBook,
  editBook,
  addParticipantToGroup,
  createGroupChat,
  createUserChat,
  deleteGroup,
  deleteOneOnOneChat,
  getCurrentUser,
  getAvailableUsers,
  getChatMessages,
  getGroupInfo,
  updateUser,
  getUserChats,
  loginUSER,
  logoutUSER,
  registerUSER,
  getNotification,
  removeParticipantFromGroup,
  sendMessage,
  updateGroupName,
  deleteMessage,
  returnBook,
  getAllBooks,
  borrowBook,
};
