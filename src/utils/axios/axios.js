import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNTE1NjU1LCJqdGkiOiJkN2I5ZWY4OWQxMWE0ZjExOWEzMGU3ZDcyOTdkY2I5ZSIsInVzZXJfaWQiOiIyYWYwZTcwMC00NGE5LTQ0OWUtYjg1MS0xMDU1MDRlZjdmYTIifQ.3vogLCOsew50m9JNMnm0IIGogfsgKK-2FAXUDugFeso`,
  },
});
