import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./NowPlaying.scss";

const NowPlaying = () => {
  return (
    <div className="text-center">
      <h6 className="text-sm text-gray-500">Watch New Movies</h6>
      <h1 className="text-5xl font-bold">Movies Now Playing</h1>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={30}
      >
        <SwiperSlide>
          <div className="movie-card">
            <img
              src="/images/IO.jpg"
              alt="The Fifth Day"
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="genre">Comedy / 180 Mins</h5>
              <h3 className="movie-title">The Fifth Day</h3>
              <button className="ticket-button">Get Ticket</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img
              src="/images/min.jpg"
              alt="Another Movie"
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="genre">Drama / 120 Mins</h5>
              <h3 className="movie-title">Another Movie</h3>
              <button className="ticket-button">Get Ticket</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img
              src="/images/q.jpg"
              alt="Movie Title 3"
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="genre">Action / 140 Mins</h5>
              <h3 className="movie-title">Movie Title 3</h3>
              <button className="ticket-button">Get Ticket</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img
              src="/images/IO.jpg"
              alt="Movie Title 4"
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="genre">Sci-Fi / 130 Mins</h5>
              <h3 className="movie-title">Movie Title 4</h3>
              <button className="ticket-button">Get Ticket</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img
              src="/images/min.jpg"
              alt="Movie Title 5"
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="genre">Horror / 110 Mins</h5>
              <h3 className="movie-title">Movie Title 5</h3>
              <button className="ticket-button">Get Ticket</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default NowPlaying;
