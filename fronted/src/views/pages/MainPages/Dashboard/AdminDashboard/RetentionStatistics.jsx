
import React, { useEffect, useState } from "react";
import axios from "axios";
import Charts from "./charts";
import Reports from "./Reports";
import Statistics from "./statistics";
import InvoiceTable from "./invoiceTable";
import PaymentTable from "./paymentTable";
import ClientTable from "./clientTable";
import RecentTable from "./recentTable";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { base_url } from "../../../../../base_urls";
import RetentionStatisticsGraphs from "./RetentionStatisticsGraphs";

const RetentionStatistics = () => {
  const [users, setUsers] = useState([]);


  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <h3 className="page-title">Retention Statistics</h3>
<br />
<br />
          <RetentionStatisticsGraphs />
        </div>
      </div>
    </div>
  );
};

export default RetentionStatistics;

