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
          <img src="/images/IO.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/min.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/q.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/IO.jpg" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/images/min.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default NowPlaying;
