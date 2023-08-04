import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTcyOTEwLCJqdGkiOiJkYzIxOWU5YzI3YzQ0YWVjOGEyZTlkYTg3MWZlOTY5NSIsInVzZXJfaWQiOiJjMGE2ZmE2MC1hNWFmLTQzYWYtOTE4Yi05OTNlZjAxYmQ1NmUifQ.RJ64KtD0CwgFVrbTDxrpYB0hQMmXnqVrgyAoOatoVxY`,
  },
});
