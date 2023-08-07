import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDA4MDM4LCJqdGkiOiJjNmE5MWM1ZjQ5YmE0NGU0YjI4YjNlNTNmOTFkN2JlZSIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.CGl9p6RGwe4CvJHotJNSMkkQu0AFlSqZn65xiPYYHgE`,
  },
});
