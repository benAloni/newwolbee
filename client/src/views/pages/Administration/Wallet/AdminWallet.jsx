import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Charts from "../../MainPages/Dashboards/Admin/charts";
import Statistics from "../../MainPages/Dashboards/Admin/statistics";


const AdminWallet = () => {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs maintitle="Wallet" title="Dashboard" />
          {/* /Page Header */}
          <div className="row">
            <Statistics />
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWallet;
