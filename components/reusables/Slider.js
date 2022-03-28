import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AppSlider({ children, settings, className }) {
    return (
        <Slider {...settings} className={className}>
            {children}
        </Slider>
    )
}
