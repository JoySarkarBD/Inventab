import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDk2Mjk5LCJqdGkiOiIyMzRkNjhlOTc4MjI0YzI5YjhlOGQ2MmQxZDRjNzM4NiIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.GQmglltZqc-7au1MVb8nMy-nok7q7nHQtDRG6bNRvjI`,
  },
});
