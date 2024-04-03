import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosInstance from '@/app/utils/axiosInstance';


export default function page() {

    //to open the model
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [categoryCounts, setCategoryCounts] = useState({});
    // const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpenDelete = ({ _id }) => {
        console.log("id", _id);
        setSelectedId(_id)
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const clearData = () => {
        setFormData({
            title: '',
            category: '',
            status: '',
            description: '',
            image: null,
        })
        setSelectedImage(null); // Clear the selected image
    }


    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // Set the preview image URL

                // Extract contentType and filename
                const contentType = file.type;
                const filename = file.name;

                setFormData({
                    ...formData,
                    image: {
                        data: reader.result.split(',')[1], // Extract base64 string from data URL
                        contentType: contentType,
                        name: filename
                    }
                });
            };
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    // -----------------------dashbord---------------------

    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        category: '',
        status: '',
        description: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // const formDataToSend = new FormData();
    //     // formDataToSend.append('title', formData.title);
    //     // formDataToSend.append('category', formData.category);
    //     // formDataToSend.append('description', formData.description);
    //     // formDataToSend.append('status', formData.status);
    //     // formDataToSend.append('image', formData.image);

    //     try {
    //         const response = await axiosInstance.post('news', formData);
    //         console.log('Response from server:', response.data);
    //         alert(" Saved!")
    //         clearData()
    //         // Handle success response
    //     } catch (error) {
    //         alert("Failed to create!")
    //         console.error('Error sending data:', error);
    //         // Handle error
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Determine whether it's a new news item or an update
            const endpoint = formData._id ? `news/update/${formData._id}` : 'news';
            // Make the request to the backend API
            const response = await axiosInstance.post(endpoint, formData);
            console.log('Response from server:', response.data);
            alert("Saved!");

            // Clear the form data after successful submission
            clearData();
            setOpenEdit(false); // Close the modal after submission
            fetchCardData(); // Refresh news data if needed
        } catch (error) {
            console.log(error);
            alert("Failed to save!");
            console.error('Error sending data:', error);
        }
    };


    const handleOpenEdit = (rowData) => {
        setOpenEdit(true);
        console.log(rowData);
        // Set the form data with the values of the selected news item
        setFormData({
            _id: rowData._id,
            title: rowData.title,
            category: rowData.category,
            status: rowData.status,
            description: rowData.description,
            image: rowData.image, // You may need to adjust this depending on how you handle image data
        });
        setSelectedImage(rowData.image.data); // Set the preview image URL

    };


    const handleDeleteNews = async () => {
        try {
            const response = await axiosInstance.post(`news/delete/${selectedId}`);
            console.log('Response from server:', response.data);
            alert("Deleted!")
            setOpenDelete(false);

            fetchCardData(); // Refresh news data after deletion
        } catch (error) {
            setOpenDelete(false);
            alert("failed")
            console.error('Error deleting news:', error);
        }
    };

    const columns = [
        { field: 'title', headerName: 'TITLE', width: 300 },
        {
            field: 'image',
            headerName: 'IMAGE',
            width: 150,
            renderCell: (params) => (
                <img src={params.row.image.data} alt="Image" style={{ width: 100, height: 100 }} />
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
                <div className='flex flex-row' >
                    <button onClick={() => handleOpenEdit(params.row)} className="flex flex-row items-center  justify-center mr-2 bg-neutral-500 px-3 mt-2 h-8 text-white rounded-lg hover:shadow-lg">Edit</button>
                    <button onClick={() => handleClickOpenDelete(params.row)} className="flex flex-row items-center justify-center mr-2 bg-red-700 px-3 mt-2 h-8 text-white rounded-lg hover:shadow-lg">Delete</button>

                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className='w-screen h-screen overflow-scroll'
                    >
                        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-3/4 overflow-scroll bg-white shadow-lg p-4'>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-row justify-between mx-8 mt-8">
                                    <h3 className="text-black font-semibold text-2xl">Add News</h3>
                                </div>


                                <div className="mx-8">
                                    <h3 className="text-black mb-4">Title</h3>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="News Title" className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"></input>
                                </div>


                                <div className="grid grid-cols-2 grid-rows-2 gap-0 m-8">
                                    <div className=''>
                                        <InputLabel id="demo-simple-select-label">Catergory</InputLabel>
                                        <Select
                                            className='w-72'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category" value={formData.category} onChange={handleInputChange}
                                        >
                                            <MenuItem value='Social'>Social</MenuItem>
                                            <MenuItem value='Foriegn'>Foriegn</MenuItem>
                                            <MenuItem value='Sports'>Sports</MenuItem>
                                            <MenuItem value='Business'>Business</MenuItem>
                                            <MenuItem value='Weather'>Weather</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="col-start-1 row-start-2 ">
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            className='w-72'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="status" value={formData.status} onChange={handleInputChange}
                                        >
                                            <MenuItem value='Breaking'>Breaking News</MenuItem>
                                            <MenuItem value='Normal'>Normal News</MenuItem>
                                        </Select>
                                    </div>

                                    <div className="row-span-2 col-start-2 row-start-1 ">
                                        <label htmlFor="file-upload" className="relative flex flex-col items-center justify-center gap-1 border-slate-300 border-2 border-dashed h-48 mx-8 rounded-lg cursor-pointer">
                                            {selectedImage ? (
                                                <img src={selectedImage} alt="Selected Image" className="absolute inset-0 w-auto h-48 object-cover rounded-lg" />
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon className="text-slate-500 text-6xl" icon={faUpload}></FontAwesomeIcon>
                                                    <h3 className="text-slate-500">Select Image</h3>
                                                </>
                                            )}
                                            <input id="file-upload" type="file" onChange={handleFileSelect} className="hidden" accept="image/*" />
                                        </label>
                                    </div>
                                </div>


                                <div className="flex flex-col  justify-center gap-1 my-4 mx-8 rounded-lg" role="button">
                                    <h3 className="text-black mb-4">Description</h3>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full h-64 border-2 border-slate-300 rounded-lg p-2 text-black" placeholder="Start Writing..."> </textarea>
                                </div>

                                <button className="bg-slate-700 py-2 px-6 rounded-lg my-3 mx-8" type="submit">Update</button>
                            </form>
                        </Box>
                    </Modal>


                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete News?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this news?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteNews}>Yes</Button>
                            <Button onClick={handleCloseDelete} autoFocus>No</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ),
        },
    ];

    const [rows, setRows] = useState([]);
    // const [latestData, setLatestData] = useState([]);

    // get all
    const fetchCardData = async () => {
        try {
            const response = await axiosInstance.get('news/all');
            setRows(response.data); // Assuming response data is an array of objects
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useEffect(() => {

        fetchCategoryCounts();
        fetchCardData();
    }, []);

    const fetchCategoryCounts = async () => {
        try {
            // Make a GET request to the backend endpoint
            const response = await axiosInstance.get('news/category-count');

            // Extract category counts from the response data
            const categoryCounts = response.data;

            setCategoryCounts(categoryCounts)
            // Log or process the category counts as needed
            console.log('Category Counts:', categoryCounts);

            return categoryCounts;
        } catch (error) {
            console.error('Error fetching category counts:', error);
            // Handle error
            return null;
        }
    };

    // Call the function to fetch category counts



    // const rows = [
    //     { id: 1, title: 'Snow',image: 'https://picsum.photos/200', category: 'Jon', description: 'lorum opergvermt ergtrytr', date: "2024/03/31", status: 'posted',    },
    // ];





    return (
        <div>
            <div className=" w-full h-auto flex flex-row items-center justify-center mb-4 py-4">
                {/* <div className="bg-white h-40 w-full mr-8 flex flex-col items-center justify-center rounded-lg">
                    <h3 className="text-black font-bold text-2xl">5</h3>
                    <h3 className="text-black">Total News</h3>
                </div>

                <div className="bg-white h-40 w-full mr-8 flex flex-col items-center justify-center rounded-lg">
                    <h3 className="text-black font-bold text-2xl">5</h3>
                    <h3 className="text-black">Total News</h3>
                </div>

                <div className="bg-white h-40 w-full mr-8 flex flex-col items-center justify-center rounded-lg">
                    <h3 className="text-black font-bold text-2xl">5</h3>
                    <h3 className="text-black">Total News</h3>
                </div>

                <div className="bg-white h-40 w-full mr-8 flex flex-col items-center justify-center">
                    <h3 className="text-black font-bold text-2xl">5</h3>
                    <h3 className="text-black">Total News</h3>
                </div> */}
                {Object.keys(categoryCounts).map((category, index) => (
                    <div key={index} className="bg-white h-40 w-full mr-8 flex flex-col items-center justify-center rounded-lg">
                        <h3 className="text-black font-bold text-2xl">{categoryCounts[category]}</h3>
                        <h3 className="text-black">Total {category} News</h3>
                    </div>
                ))}
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
