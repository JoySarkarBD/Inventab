import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDc1ODY1LCJqdGkiOiI1Yzc1ZjAxMjA2MGQ0ZTRmYmQ2MzU3NjIwNWMwNDIyYyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.UzixXr7OHqZXixVaRGs2RjcTeqvO_7UK7gM-cYHmGTw`,
  },
});
