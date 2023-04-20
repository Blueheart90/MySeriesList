import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper";
import SerieCard from "./SerieCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ data, card: Card }) => {
    return (
        <Swiper
            modules={[A11y, Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
                // when window width is >= 400px
                350: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                // when window width is >= 640px
                440: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                // when window width is >= 868px
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
            }}
        >
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                    {/* <SerieCard item={item} /> */}
                    {/* <Card item={{ name: "juan" }} /> */}
                    <Card item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
