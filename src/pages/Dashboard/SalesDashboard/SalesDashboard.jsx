import RevenueChart from "../../../components/Chart/Chart";
import KPIInvoice from "../../../components/KPI/KPI-Invoice/KPIInvoice";
import KPIPO from "../../../components/KPI/KPI-PO/KPIPO";
import MetricInvoice from "../../../components/Metric/MetricInvoice/MetricInvoice";
import MetricPO from "../../../components/Metric/MetricPO/MetricPO";
import SalesFunnel from "../../../components/SalesFunnel/SalesFunnel";
import SalesKPI from "../../../components/SalesKPI/SalesKPI";
import PageTitle from "../../../components/Shared/PageTitle";
import "./SalesDashboard.css";

const SalesDashboard = () => {
  return (
    <>
      <PageTitle title='Sales Dashboard' />
      <div className='row'>
        {/* KPI table */}
        <div className='col-12 mx-auto my-4'>
          <SalesKPI />
        </div>

        {/* Chart section */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <RevenueChart />
            </div>
          </div>
        </div>

        {/* KPI PO section */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <KPIPO />
            </div>
          </div>
        </div>

        {/* KPI Invoice section */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <KPIInvoice />
            </div>
          </div>
        </div>

        {/* Metric PO section */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <MetricPO />
            </div>
          </div>
        </div>

        {/* Metric Invoice section */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <MetricInvoice />
            </div>
          </div>
        </div>

        {/*  */}
        <div className='col-12 my-4'>
          <div className='card'>
            <div className='card-body'>
              <SalesFunnel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
