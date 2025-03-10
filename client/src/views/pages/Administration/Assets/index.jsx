import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import Breadcrumbs from "../../../../components/Breadcrumbs";

import AssetsSearchFilter from "./AssetsSearchFilter";
import AssetsTable from "./AssetsTable";
import AddAssetpopup from "../../../../components/Modals/Assets/AddAssetpopup";
import EditAssetpopup from "../../../../components/Modals/Assets/EditAssetpopup";
import DeleteModal from "../../../../components/Modals/deletePopup";

const Assets = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Assets"
          title="Dashboard"
          subtitle="Assets"
          modal="#add_asset"
          name="Add Asset"
        />
        <AssetsSearchFilter />
        <AssetsTable />
        <AddAssetpopup />
        <EditAssetpopup />
        <DeleteModal Name="Delete Asset" />
      </div>
    </div>
  );
};

export default Assets;
