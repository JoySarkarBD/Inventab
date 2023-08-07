import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDEwMjY4LCJqdGkiOiJlYTAzYjU0MGU2MTk0YjNkOWZmYWYwNjZiYThlMDA4YSIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.izuQFQ27l0ef_VjRJ_Z4jVRDVcj6oJ9w9_O5NhL2CB4`,
  },
});
