import React from "react";
import { Header, SideBar } from "../../../../../layout";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import InvoiceAddEdit from "./invoiceAddEdit";

const EditInvoice = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Edit Invoice"
            title="Dashboard"
            subtitle="Edit Invoice"
          />
          <InvoiceAddEdit />
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
