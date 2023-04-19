/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Autoplay, Navigation } from 'swiper'
import useFetchMovies from '../../hooks/useFetchMovies'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import Starts from '../Starts'

function TopRated () {
  const { movies } = useFetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=10ff9cb11e32e0fa831038949084b41e&language=en-US&page=1')
  console.log(movies)
  return (
        <div className='my-16'>
            <Titles title='Top Rated Movies' Icon={BsBookmarkStarFill} />
            <div className='mt-10'>
                <Swiper slidesPerView={4} spaceBetween={40} autoplay={true} speed={1000} loop={true} modules={[Navigation, Autoplay]}>
                    {
                        movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className='p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div className='px-4 hoveres flex-colo gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 bottom-0 right-0'>
                                    <button className='w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                                        <FaHeart />
                                    </button>
                                    <Link className='font-semibold text-lg truncate line-clamp-2' to={`/movie/${movie.id}`}>
                                        {movie.title}
                                    </Link>
                                    <div className='flex gap-2 text-start'>
                                        <Starts value={movie.vote_average / 2} />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))

                    }
                </Swiper>
            </div>
        </div>
  )
}

export default TopRated
