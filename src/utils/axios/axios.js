import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMzIxMTg5LCJqdGkiOiJkMzZjMDVlNTgyYzk0NzkwOGZlODYwZDQzYmU3ZDQ2NCIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.qqYLvONXn0noGqRmWUVPTSHgWlKyrXpXhbwvl6XQqMI`,
  },
});
