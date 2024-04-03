import { DataGrid } from '@mui/x-data-grid';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function page() {

    // -----------------------News Filter---------------------

    const columns = [
        { field: 'title', headerName: 'TITLE', width: 300 },
        { 
            field: 'image', 
            headerName: 'IMAGE', 
            width: 150,
            renderCell: (params) => (
                <img src={params.value} alt="Image" style={{ width: 100, height: 100 }} />
            )
        },
        { field: 'category', headerName: 'CATEGORY', width: 150 },
        { field: 'description', headerName: 'DESCRIPTION', width: 500 },
        { field: 'date', headerName: 'DATE', width: 150 },
        { field: 'status', headerName: 'STATUS', width: 150 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 200,
            renderCell: (params) => (
                <div>
                    <button className="mr-2">Edit</button>
                    <button className="mr-2">Delete</button>
                </div>
            ),
        },
    ];
  
    const rows = [
        { id: 1, title: 'Snow',image: 'https://picsum.photos/200', category: 'Jon', description: 'lorum opergvermt ergtrytr', date: "2024/03/31", status: 'posted',    },
    ];


    return (
        <div>
            <div className=" w-full h-auto flex flex-row  mb-4 py-4">
                <div className=''>
                        <InputLabel id="demo-simple-select-label">Catergory</InputLabel>
                        <Select 
                        className='w-72'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Catergory"
                        >
                        <MenuItem value='Social'>Social</MenuItem>
                        <MenuItem value='Foriegn'>Foriegn</MenuItem>
                        <MenuItem value='Sports'>Sports</MenuItem>
                        <MenuItem value='Business'>Business</MenuItem>
                        <MenuItem value='Weather'>Weather</MenuItem>
                        </Select>
                    </div>
            </div>


            <div className="bg-slate-100 h-44 mr-8">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}
