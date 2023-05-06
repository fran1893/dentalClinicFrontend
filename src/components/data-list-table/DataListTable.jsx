import React from "react";
import "./DataListTable.scss";
import { TablePagination } from "../../components";
import { dateFormat } from "../../_utils/utils";

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
      <table>
        <thead>
          <tr colSpan={headers.length}>
            <th>
              <div className="tableTitle">{title}</div>
            </th>
          </tr>
          <tr>
            {headers.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr data-user-id={d.id} onClick={onChange} key={d.id}>
              {attributes.map((attr, index) => (
                <td key={index}>{d[attr]}</td>
              ))}
            </tr>
          ))}
        </tbody>
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
      </table>
    </div>
  );
}
