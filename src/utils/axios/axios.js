import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDkzNzQ4LCJqdGkiOiJkYjBjYzVhZTMzNmM0OTM2YTUxZjdlODBjN2ZmYWJmMSIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.yLIHj8D7js_uh1OkcRwkzHna3zfyTY1fDLHw0qWoo40`,
  },
});
