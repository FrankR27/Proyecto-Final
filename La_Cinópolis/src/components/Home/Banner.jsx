import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import useFetchMovies from '../../hooks/useFetchMovies'
import FlexMovieItem from '../FlexMovieItem'

function Banner () {
  const { movies } = useFetchMovies('https://api.themoviedb.org/3/movie/now_playing?api_key=10ff9cb11e32e0fa831038949084b41e&language=en-US&page=1')

  return (
        <div className="relative w-full">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="w-full xl:h-96 bg-dry lg:h-64 h-48"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={`${movie.title}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 left-0 right-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                                {movie.title}
                            </h1>
                            <div className='flex gap-5 items-center text-dryGray'>
                                <FlexMovieItem movie={movie} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
  )
}

export default Banner
