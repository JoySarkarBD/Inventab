import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTY1Njg3LCJqdGkiOiJkOWI0ZDA2OTI3MjU0Zjg0OTM2MjMzMjkzNTNhNDc4ZSIsInVzZXJfaWQiOiJjMGE2ZmE2MC1hNWFmLTQzYWYtOTE4Yi05OTNlZjAxYmQ1NmUifQ.1JkJp8LuDdOZGsU7-264OBvIE8BeV3dX6jlP8CVMz1A`,
  },
});
