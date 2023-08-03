import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDUzOTk5LCJqdGkiOiJjMmZlNDNiNzgwZDQ0ZDlhYTA0NTlkZjFjZTk2ZmZkOSIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.UQ61DxZgFssEv1amXOy0Ep8tmETrRbeUcqfOjyeClt8`,
  },
});
