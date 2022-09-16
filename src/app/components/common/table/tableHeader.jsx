import React from "react";
import PropTypes from "prop-types";

const TableHeader = (columns) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column}>{columns[column].name}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object
};

export default TableHeader;
