import React,{useState,useEffect,useRef } from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MicSharpIcon from '@mui/icons-material/MicSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link,useNavigate } from 'react-router-dom';
import LogoImg from '../../Assets/newLogo.jpg'
import Login from '../Login/login';
import axios from 'axios';
const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
    const [navbarModal,setNavbarModal] = useState(false);
    const [login,setLogin] = useState(false);
    const [islogin,setIsLogin] = useState(false)
    const [userPic,setUserPic] = useState("https://th.bing.com/th/id/OIP.hA04LwcrDABDbCzqGof8iQHaHa?rs=1&pid=ImgDetMain")
    const modalRef = useRef();
    const navigate = useNavigate();
    const handleHambergerClick=()=>{
        setSideNavbarFunc(!sideNavbar);
    }
    const handleClickModal=()=>{
        setNavbarModal(!navbarModal);
    }

    const setLoginModal=(val)=>{
        setLogin(val);
    }

    const conclickOfPopUpOption=(button)=>{
        setNavbarModal(false);
        if(button==="Profile"){
            let id = localStorage.getItem("userId")
            navigate(`/user/${id}`);
        }else if(button==="Logout"){
            localStorage.clear();
            getLogOut();
            
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);
            
            
        }else{
            setLogin(true);
        }
    }
    const getLogOut = async()=>{
        await axios.post('http://localhost:8000/auth/logout',{},{ withCredentials: true}).then(resp=>{
            console.log(resp)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {

        let userPic = localStorage.getItem("user")
        
        setIsLogin(localStorage.getItem("login")!==null?localStorage.getItem("login"):false)
        if(userPic!==null){
            setUserPic(userPic)

        }
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setNavbarModal(false);
            }
        };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarModal]);

  
   return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="navbarHamberger" onClick={()=>handleHambergerClick()}>
                    <MenuIcon />

                </div>
                <Link to={'/'} className="navbar_youtubeImg">
                    <img src={LogoImg} className='navbar_logo_new'/>
                    <p style={{paddingLeft:30,fontSize:22}}>Stream Sphere</p>
                </Link>
            </div>
            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input placeholder="Search" type='text' className='navbar_searchBoxInput' />
                    <div className="navbar_searchIconBox"><SearchSharpIcon sx={{ fontSize: "28px" }}/></div>
                </div>
                <div className="navbar_mike">
                    <MicSharpIcon/>
                </div>
            </div>

            <div className="navbar-right">
                <Link to={`/${localStorage.getItem("userId")}/upload`}>
                    <VideoCallOutlinedIcon sx={{ fontSize: "30px",cursor:"pointer",color:"white" }} />

                </Link>
                 <NotificationsNoneSharpIcon sx={{ fontSize: "30px",cursor:"pointer" }} />
                 <img onClick={handleClickModal} className='navbar-right-logo' src={userPic} alt='Logo' />
                 {
                    navbarModal && <div className='navbar-modal' ref={modalRef}>
                    {islogin && <div className="navbar-modal-option" onClick={()=>conclickOfPopUpOption("Profile")}>Profile</div>}
                    {islogin &&  <div className='navbar-modal-option' onClick={()=>conclickOfPopUpOption("Logout")}>Logout</div>}
                    {!islogin && <div className='navbar-modal-option' onClick={()=>conclickOfPopUpOption("Login")}>Login</div>}
                    
                    </div>
                 }
            </div>
            {login && <Login setLoginModal={setLoginModal}/>}
        </div>
    )
}

export default Navbar