import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTQzODM4LCJqdGkiOiJjNjNlZDY2NDkwMTk0OTgzYWY2NTY4ZWQ4MjJiZDRmMCIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.jkglTPTgn3N2Y3CR7ieL2i4lTDQ2DWdIMN__C3JXSnw`,
  },
});
