import React,{useState} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import './sideNavbar.css';
const SideNavbar = ({sideNavbar}) => {

    const [activeLinik,setActiveLink] = useState("Home");

    return (
        <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"} >
            <div className="home_sideNavbarTop">
                <div className={`home_sideNavbarTopOption ${activeLinik === "Home" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Home")}>
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle" >Home</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Shorts" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Shorts")}>
                    <VideoCallSharpIcon />
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Subscription" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Subscription")}>
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>

            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ArrowForwardIosSharpIcon sx={{ fontSize: "16px" }} />

                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Your channel" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your channel")}>
                    <RecentActorsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your channel</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "History" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("History")}>
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Playlists" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Playlists")}>
                    <PlaylistPlayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlists</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Your Videos" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your Videos")}>
                    <SmartDisplayOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your videos</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Watch later" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Watch Later")}>
                    <WatchLaterOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch later</div>
                </div>

                <div className={`home_sideNavbarTopOption ${activeLinik === "Liked videos" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Liked videos")}>
                    <ThumbUpAltOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div>
                <div className={`home_sideNavbarTopOption ${activeLinik === "Your clips" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your Clips")}>
                    <ContentCutIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your clips</div>
                </div>

            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>

                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://th.bing.com/th/id/R.bce6ed4af85677ce3b6908ac7e8e631b?rik=DFwXRhY0pZxYIg&pid=ImgRaw&r=0' />
                    <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://th.bing.com/th/id/OIP.Ptvb889e_arCEj1IgCROgAHaHa?rs=1&pid=ImgDetMain' />
                    <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
                </div>

            </div>
        </div>
    )
}

export default SideNavbar