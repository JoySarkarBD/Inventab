import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTg5ODk0LCJqdGkiOiIxMGIyYjliN2U0ZjU0NDI3YTMwYmUwNjljZDE2NGVjMiIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.silEkfarqpEMfV_FKnJ_BUna3QK6nrqjHNO4COlfs9A`,
  },
});
