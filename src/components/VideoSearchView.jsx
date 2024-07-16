import React, { useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import GoBackCom from "./GoBackCom";
import { useNavigate } from "react-router-dom";
const VideoSearchView = ({ currentVideos }) => {
  const { setVideoData } = useGlobalContext();
  const navigate = useNavigate();
  const handleVideoClicked = (data) => {
    setVideoData({ videoData: data });
    navigate("/Videos/Video-Player");
  };
  return (
    <div className=" papaDiv">
      VideoSearchView
      <div className="row">
        {currentVideos?.map((item, idx) => (
          <div className="col-12 col-md-3 mb-3" key={idx}>
            <div
              className="card Subject"
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                borderRadius: "10px",
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${item.link}/hqdefault.jpg`}
                alt="YouTube Thumbnail"
                onClick={() => handleVideoClicked(item)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
            </div>
            <p
              className="text-start"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              {item.title}
            </p>
            <p className="text-start" style={{ fontSize: "12px" }}>
              Views: {item.views} Likes: {item.likes}
            </p>
          </div>
        ))}

        <hr />
      </div>
    </div>
  );
};
export default VideoSearchView;
