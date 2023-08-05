import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMjMyOTE1LCJqdGkiOiI5NmI2NzBhMTVmMzE0MDMwYjk5Y2ExZWI2OTE4M2FkYyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.jrHQB4OrhdchoilJzBlXFfRwDsn-IWgDBmJ2KDu7-OQ`,
  },
});
