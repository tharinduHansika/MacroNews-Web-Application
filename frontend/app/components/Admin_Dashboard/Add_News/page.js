import { useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function page() {

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
        { id: 1, title: 'Snow', image: 'https://picsum.photos/200', category: 'Jon', description: 'lorum opergvermt ergtrytr', date: "2024/03/31", status: 'posted', },
    ];

    // -----------------------add news---------------------

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



    // --------------------------------

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        status: '',
        description: '',
        image: null,
    });

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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formDataToSend = new FormData();
        // formDataToSend.append('title', formData.title);
        // formDataToSend.append('category', formData.category);
        // formDataToSend.append('description', formData.description);
        // formDataToSend.append('status', formData.status);
        // formDataToSend.append('image', formData.image);

        try {
            const response = await axiosInstance.post('news', formData);
            console.log('Response from server:', response.data);
            alert(" Saved!")
            clearData()
            // Handle success response
        } catch (error) {
            alert("Failed to create!")
            console.error('Error sending data:', error);
            // Handle error
        }
    };



    return (

        <div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between mx-8 mt-8">
                    <h3 className="text-black font-semibold text-2xl">Add News</h3>
                    <div className="bg-slate-700 py-2 px-6 rounded-lg" role="button">Post</div>
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

                <button className="bg-slate-700 py-2 px-6 rounded-lg my-3 mx-8" type="submit">Submit</button>
            </form>

        </div>

    )
}
