import React from "react";
import MaterialTable from "material-table";

export default function ProductList() {
    const { useState } = React;
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <MaterialTable
            title="Selected Row Styling Preview"
            columns={[
                { title: "Tên sản phẩm", field: "name" },
                { title: "Mô tả", field: "description" },
                { title: "Giá tiền", field: "price", type: "numeric" },
            ]}
            data={[
                {
                    name: "Dũa móng tay",
                    description: "Duỗi móng tay làm từ inox không gỉ",
                    price: 30000,
                },
                {
                    name: "Đèn sấy",
                    description: "Đèn sấy bằng tia hồng ngoại",
                    price: 20000,
                },
            ]}
            onRowClick={(evt, selectedRow) =>
                setSelectedRow(selectedRow.tableData.id)
            }
            options={{
                rowStyle: (rowData) => ({
                    backgroundColor:
                        selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
                }),
                paging: false,
                search: false,
                toolbar: false,
                draggable: false,
                sorting: false,
                selection: true,
            }}
        />
    );
}
