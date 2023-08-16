import { createContext, useState } from "react";

export const ChartContext = createContext(null);

// eslint-disable-next-line react/prop-types
const ChartContextProvider = ({ children }) => {
  const [kpiPoChart, setKpiPoChart] = useState([]);

  return (
    <ChartContext.Provider value={{ kpiPoChart, setKpiPoChart }}>
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
