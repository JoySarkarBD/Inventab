import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDQwMjc5LCJqdGkiOiI4Yzg4MDAwZjJkODk0ODhkOGU3ODljZjg4ZDVlNjFlMyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.YS_zWwLqn0SOvhkgpinDqrZwmP9VQ7DxlChd_wEaOUQ`,
  },
});
