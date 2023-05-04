import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          "@1.75": {
            slidesPerView: 3
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper flex justify-center"
      >
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://assets-es.imgfoot.com/media/cache/1200x1200/lionel-messi-2223-4.jpg" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Lucas Silva</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://depor.com/resizer/hyToKvwkOK6_C6580kgPwwt-SFk=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/WE52IKZFTNEC3CBTLYQCR3QHKQ.jpg" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Thiago Chiesa</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1223%2Fr1109950_2_1296x729_16-9.jpg" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Bruno Buonassisa</p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
