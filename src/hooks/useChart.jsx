import { useContext } from "react";
import { ChartContext } from "../context/chartContext";

export const useChart = () => {
  return useContext(ChartContext);
};
