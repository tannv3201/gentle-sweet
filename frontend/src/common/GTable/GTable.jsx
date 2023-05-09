import React from "react";
import MaterialTable from "material-table";

export default function GTable({
    data,
    title,
    columns,
    exportFileName,
    actions,
    ...props
}) {
    return (
        <MaterialTable
            {...props}
            title={title}
            columns={columns}
            data={data || []}
            options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: 5,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                showTextRowsSelected: false,
                // paginationPosition: "both",
                exportButton: true,
                exportAllData: true,
                actionsColumnIndex: -1,
                selection: true,
                columnsButton: true,
                rowStyle: (data, index) =>
                    index % 2 === 0 ? { background: "#f5f5f5" } : null,
                // headerStyle: { background: "#f44336", color: "#fff" },
            }}
            actions={actions}
        />
    );
}
