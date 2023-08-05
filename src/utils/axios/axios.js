import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMjU1MTU4LCJqdGkiOiIzNGIyNjA1NTQxMDk0Y2I0YWFmNGMwZGRmNWMwZjdmYiIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.6EOhLG1KnqrnZX0b-2o9WOCHYc2Qpkumy04uPAJmFGM`,
  },
});
