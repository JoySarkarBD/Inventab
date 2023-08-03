import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDEzNzE0LCJqdGkiOiI0MmNhZmM3YzgxNDY0MTY2OTgzM2ZiNDMzNTc0NzVmYyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.2lk_7pCqkiARpohdeS-YTW7-xYP24WEBGkIoFaUaPpE`,
  },
});
