import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTc3MzY2LCJqdGkiOiJlNmU1ZDFjNmQzNGE0MDUwOGMyNWNiOGRiZmFjYTZkNyIsInVzZXJfaWQiOiJjMGE2ZmE2MC1hNWFmLTQzYWYtOTE4Yi05OTNlZjAxYmQ1NmUifQ.lhsSv3o2YcOTKfu370rcYMTEItQJOd1L7VdOvbIzZNI`,
  },
});
