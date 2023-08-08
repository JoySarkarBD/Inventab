import axios from "axios";
export default axios.create({
  baseURL: "http://inventab.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNTczNzM3LCJqdGkiOiJiMmM4Y2U4ZWEzNDc0OGMzOGM1YzA3MDdjY2QwZThjYiIsInVzZXJfaWQiOiIyYWYwZTcwMC00NGE5LTQ0OWUtYjg1MS0xMDU1MDRlZjdmYTIifQ.1jXcpwvV3ALaAAfpl7wLkqCpwMFSijV7QrbRXda-h6k`,
  },
});
