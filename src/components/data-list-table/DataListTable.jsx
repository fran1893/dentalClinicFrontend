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
  className,

  pagination = null,
}) {
  return (
    <div className={className}>
      <MDBTable striped hover className="bg-info bg-gradient rounded-3 bg-opacity-25">
        <MDBTableHead>
          <tr colSpan={headers.length}>
            <th>
              <div className="tableTitle">{title}</div>
            </th>
          </tr>
          <tr>
            {headers.map((th, index) => (
              <th scope="col" key={index}>{th}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.map((d) => (
            <tr scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
              {attributes.map((attr, index) => (
                <td key={index}>{d[attr]}</td>
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
  );
}
