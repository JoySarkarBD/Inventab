import KpiInvoice from "./KpiInvoice";
import KpiPo from "./KpiPo";

const SalesKPI = () => {
  return (
    <div className='card p-4'>
      <h3>Sales Dashboard</h3>
      <div className='row my-2'>
        <KpiPo />
        <KpiInvoice />
      </div>
    </div>
  );
};

export default SalesKPI;
