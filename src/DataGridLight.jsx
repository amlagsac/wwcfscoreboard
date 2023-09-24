import { React } from 'react';
import Box from '@mui/material/Box';
import {
    useGridApiRef,
  } from '@mui/x-data-grid-pro';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

function ExportToolbar() {
    return (
      <GridToolbarContainer>
        <Typography variant='h4' sx={{ fontFamily: "digital-7", fontWeight: 900, mr: "auto", ml: 1 }}>Light Players Stats</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
          <GridToolbarExport sx={{ ml: "auto" }} printOptions={{ disableToolbarButton: true }} />
        </Box>
      </GridToolbarContainer>
    );
  }

const DataGridLight = () => {

    const apiRef = useGridApiRef();

    const columns = [
        { 
            field: 'No', 
            headerName: 'No', 
            width: 70,
            type: 'number', 
            editable: true,
            align: 'center',
            headerAlign: 'center',
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 100,
          editable: true,
          align: 'left',
          headerAlign: 'left',
        },
        {
            field: 'Points',
            headerName: 'Points',
            width: 80,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Rebounds',
            headerName: 'Rebounds',
            width: 80,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Assists',
            headerName: 'Assists',
            width: 80,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Fouls',
            headerName: 'Fouls',
            width: 80,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
      ];
        
      const rows = [
        {
          id: 1,
          No: 1,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 2,
          No: 2,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 3,
          No: 3,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 4,
          No: 4,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 5,
          No: 5,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 6,
          No: 6,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 7,
          No: 7,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 8,
          No: 8,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 9,
          No: 9,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 10,
          No: 10,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
        {
          id: 11,
          No: 11,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },        {
          id: 12,
          No: 12,
          Name: "",
          Points: "",
          Rebounds: "",
          Assists: "",
          Fouls: ""
        },
      ]
      
    return (
        <>
            <Box sx={{ width: '100%', height: 285}}>
            <DataGrid
                apiRef={apiRef}
                columns={columns}
                rows={rows}
                editMode="row"
                slots={{
                    toolbar: ExportToolbar
                }}
            />
            </Box>
        </>
    )
}

export default DataGridLight;