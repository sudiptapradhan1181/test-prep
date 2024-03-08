import "./styles.css";
import { useState, useRef } from "react";

const data = [
  "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702771200&semt=sph",
  "https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg",
  "https://t3.ftcdn.net/jpg/05/73/95/90/360_F_573959050_BXeecXwfgIlMFGdOfHRiSdedBealWU5Q.jpg",
  "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
  "https://t3.ftcdn.net/jpg/05/04/21/08/360_F_504210856_atjaINEICHOThP14bNnCFq2LNXqu1Plx.jpg",
];

export default function App() {
  const [imgIdx, setImgIdx] = useState(0);

  const handlePrevClick = () => {
    setImgIdx(imgIdx === 0 ? data.length - 1 : imgIdx - 1);
  };

  const handleNextClick = () => {
    setImgIdx(imgIdx === data.length - 1 ? 0 : imgIdx + 1);
  };
  return (
    <div className="App">
      <div className="carouselContainer">
        <button className="button" onClick={handlePrevClick}>
          Previous
        </button>
        {data.map((url, idx) => {
          return (
            <img
              src={url}
              alt="Wallpaper"
              className="imgStyle"
              style={
                idx === imgIdx
                  ? {
                      display: "block",
                    }
                  : {
                      display: "none",
                    }
              }
            />
          );
        })}
        <button className="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}
