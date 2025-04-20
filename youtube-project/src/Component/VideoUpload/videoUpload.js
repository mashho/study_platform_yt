import React,{useState,useEffect} from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const VideoUpload = () => {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()
    const [videoInput,setVideoInput] = useState({"title":"","description":"","videoLink":"","thumbnail":"","videoType":""})
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    
    const uploadImage = async (e,type) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'you-clone'); // Replace 'your_upload_preset' with your actual upload preset

        setLoading(true);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/mashhuudanny/${type==="thumbnail"?'image':'video'}/upload`, // Replace 'your_cloud_name' with your actual cloud name
                data
            );
            
            setVideoInput({...videoInput,[type]:res.data.secure_url})
            
            setUploadedImageUrl(res.data.secure_url);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(localStorage.getItem("login")===false || localStorage.getItem("login")===null ){
            navigate('/')
        }
    },[])
    console.log(videoInput)

    const handleOnchange=(event,key)=>{
        setVideoInput({...videoInput,[key]:event.target.value})
    }
    const handleUpload=async()=>{
        setLoading(true);
        await axios.post("http://localhost:8000/api/video",videoInput,{ withCredentials: true} ).then((resp)=>{
            console.log(resp)
            setLoading(false)
            navigate('/')
        }).catch(err=>{
            setLoading(false)

            console.log(err)
        })
    }

    
  return (
    <div className='videoUpload'>
        <div className="uploadBox">
            <div className="uploadVideoTitle">
                <YouTubeIcon sx={{ fontSize: "54px",color:"red" }}  />
                Upload Video
            </div>
            <div className="uploadForm">
                <input type='text' value={videoInput.title} onChange={(e)=>{handleOnchange(e,"title")}} placeholder='Title of Video' className='uploadFormInputs' />
                <input type='text' value={videoInput.description} onChange={(e)=>{handleOnchange(e,"description")}} placeholder='Description' className='uploadFormInputs' />
                <input type='text' value={videoInput.videoType} onChange={(e)=>{handleOnchange(e,"videoType")}} placeholder='Category' className='uploadFormInputs' />
                <div>Thumbnail <input type='file' accept="image/*" onChange={(e)=>uploadImage(e,"thumbnail")} /></div>
                <div>Video <input type='file' accept="video/mp4, video/webm, video/*" onChange={(e)=>uploadImage(e,"videoLink")} /></div>
            
            </div>
            <div className="uploadBtns">
                <div className="uploadBtn-form" onClick={handleUpload} >
                    {loading?<Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" size={"22px"}/>
                    </Box>:"Upload"}
                </div>
                <Link to={'/'} className="uploadBtn-form">
                    Home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default VideoUpload