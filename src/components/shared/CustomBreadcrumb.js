import React from "react";
import PropTypes from "prop-types";

export const CustomBreadcrumb = ({ title, children = [] }) => {
  return (
    <div className="container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-6">
            <h3>{title}</h3>
            <ol className="breadcrumb">
              {children.map((child, index) => (
                <li className="breadcrumb-item">
                  <a href={child.url}>{child.title}</a>
                </li>
              ))}

              {children.length > 0 && (
                <li className="breadcrumb-item active">{title}</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomBreadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
};
