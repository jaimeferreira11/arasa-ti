import React from "react";
import { CustomBreadcrumb } from "../shared/CustomBreadcrumb";
import { Footer } from "../shared/Footer";
import { Navbar } from "../shared/Navbar";
import { Sidebar } from "../shared/Sidebar";
import { TableComponent } from "../table/Table";

export const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="page-body-wrapper horizontal-menu">
        <Sidebar />
        <div className="page-body">
          <CustomBreadcrumb
            title="Lista de usuarios"
            children={[
              {
                title: "Inicio",
                url: "/",
              },
            ]}
          />

          <TableComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
};
