import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDk3NjIyLCJqdGkiOiI1YTVhY2Y2YTlhNTI0YjU5YTY5MzU5ZDM2ZDQ3NmUwNiIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.-vrFb8-sh3H3SCzOrV_jbFshQFsdCygy14ROL3Kf6wg`,
  },
});
