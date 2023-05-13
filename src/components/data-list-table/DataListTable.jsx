import React from "react";
import "./DataListTable.scss";
import { TablePagination } from "../../components";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export default function DataListTable({
  data,
  title = "Data",
  headers,
  attributes,
  onChange,

  pagination = null,
}) {
  return (
    <div className="DataListTable">
      <div style={{ overflowX: "auto" }}>
        <div className="mobileTableTitle">{title}</div>
        <MDBTable
          striped
          hover
          className="bg-success bg-gradient rounded-3 bg-opacity-25"
        >
          <MDBTableHead>
            <tr colSpan={headers.length}>
              <th>
                <div className="tableTitle">{title}</div>
              </th>
            </tr>
            <tr>
              {headers.map((th, index) => (
                <th scope="col" key={index}>
                  {th}
                </th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((d) => (
              <tr scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
                {attributes.map((attr, index) => (
                  <td data-label={headers[index]} key={index}>
                    {d[attr] ? d[attr] : "No definido"}
                  </td>
                ))}
              </tr>
            ))}
          </MDBTableBody>
          {pagination && (
            <tfoot>
              <tr>
                <td colSpan={headers.length}>
                  <TablePagination
                    page={pagination.page}
                    count={pagination.count}
                    totalPages={pagination.totalPages}
                    limit={data.length}
                    onChange={onChange}
                  />
                </td>
              </tr>
            </tfoot>
          )}
        </MDBTable>
      </div>
    </div>
  );
}
