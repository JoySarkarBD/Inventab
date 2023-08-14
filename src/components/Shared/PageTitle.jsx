/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>Inventab | {title}</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;
