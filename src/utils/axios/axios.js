import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNTgzMTk5LCJqdGkiOiIzNDk4ZjQyZDFhNDk0YTMwOTQwNTI0MWU0ZDA5OGY2YiIsInVzZXJfaWQiOiIyYWYwZTcwMC00NGE5LTQ0OWUtYjg1MS0xMDU1MDRlZjdmYTIifQ.9pEuitiizO54r-yUsY-ePSXAOetxvuHIM0CvL8NAqcg`,
  },
});
