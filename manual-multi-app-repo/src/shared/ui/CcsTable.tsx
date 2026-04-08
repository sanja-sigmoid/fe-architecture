import { Typography } from "@mui/material";
import { DataGrid, type DataGridProps, type GridColDef } from "@mui/x-data-grid";
import type { FC } from "react";

const PAGE_SIZE_OPTIONS = [8, 10, 20, 50];
const INITIAL_STATE = {
  pagination: {
    paginationModel: { page: 0, pageSize: 8 }
  }
};

export const DEFAULT_HEADER_DEF: Partial<GridColDef> = {
  editable: false,
  headerAlign: "left",
  align: "left",
  type: "string",
  renderHeader: (data) => <Typography fontWeight={"bold"}>{data.colDef.headerName}</Typography>,
  flex: 1
};

const CcsTable: FC<DataGridProps> = (props) => {
  return (
    <DataGrid
      sx={{
        border: "none",
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "background.light",
          fontWeight: "bold"
        }
      }}
      rowHeight={46}
      paginationMode="client"
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      disableRowSelectionOnClick
      initialState={INITIAL_STATE}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      {...props}
    />
  );
};

export default CcsTable;
