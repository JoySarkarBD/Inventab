import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTcwNzU2LCJqdGkiOiI3ZGQ2MDdkOWE5YmU0YzE5YmQ3OWRiNTMzODBmMWZlNSIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.lKC7TRJJC3APXpRNhffw4j_Y29i-MLY0DfV9hrE6EPY`,
  },
});
