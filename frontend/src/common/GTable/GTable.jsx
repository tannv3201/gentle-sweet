import React from "react";
import MaterialTable from "material-table";

export default function GTable({
    data,
    title,
    columns,
    exportFileName,
    actions,
    pagesize,
    ...props
}) {
    return (
        <MaterialTable
            {...props}
            style={{ boxShadow: "unset !important" }}
            title={title}
            columns={columns}
            data={data || []}
            tol
            localization={{
                pagination: {
                    labelDisplayedRows: "{from}-{to} of {count}",
                    labelRowsPerPage: "Số hàng mỗi trang",
                    labelRowsSelect: "Trang",
                    nextTooltip: "Trang tiếp theo",
                    previousTooltip: "Trang trước",
                },
                toolbar: {
                    exportCSVName: "Xuất File CSV",
                    showColumnsTitle: "Ẩn/hiện cột",
                    addRemoveColumns: "Ẩn/hiện cột",
                    searchTooltip: "Tìm kiếm",
                    searchPlaceholder: "Nhập từ khóa...",
                },
            }}
            options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: pagesize ? pagesize : 5,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                showTextRowsSelected: false,
                // paginationPosition: "both",
                exportButton: {
                    csv: true,
                    pdf: false,
                },
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
