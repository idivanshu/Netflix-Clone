import React from 'react';
import "./Home.scss";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


const apikey = "dc12a3fa4139aa93aa2df77b2b414cfc";

const url = "https://api.themoviedb.org/3/movie";

const upcoming = "upcoming";
const toprated = "top_rated";
const nowplaying = "now_playing";
const popular = "popular";

const imgurl = "https://image.tmdb.org/t/p/original";


const Card = ({ img }) => (
    <img className='card' src={img} alt="cover" />
)



const Row = ({ title, arr = [] }) => (

    <div className='row'>
        <h3>{title}</h3>

        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgurl}/${item.poster_path}`} />
                )

                )
            }


        </div>

    </div>
)

const Home = () => {

    const [upcomingmovies, setupcomingmovies] = useState([]);
    const [popularmovies, setpopularmovies] = useState([]);
    const [topratedmovies, settopmovies] = useState([]);
    const [nowmovies, setupnowmovies] = useState([]);
    const [genre, setgenre] = useState([]);


    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/${upcoming}/?api_key=${apikey}`);
            setupcomingmovies(results);
        };

        const fetchpopular = async () => {
            const { data: { results } } = await axios.get(`${url}/${popular}/?api_key=${apikey}`);
            setpopularmovies(results);
        };

        const fetchnow = async () => {
            const { data: { results } } = await axios.get(`${url}/${nowplaying}/?api_key=${apikey}`);
            setupnowmovies(results);
        };

        const fetchtop = async () => {
            const { data: { results } } = await axios.get(`${url}/${toprated}/?api_key=${apikey}`);
            settopmovies(results);
        };

        const getgenre = async () => {
            const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=dc12a3fa4139aa93aa2df77b2b414cfc&language=en-US`);
            setgenre(genres);
            // console.log()
        };



        fetchUpcoming();
        fetchnow();
        fetchpopular();
        fetchtop();
        getgenre();
    }, [])



    return (
        <section className='home'>
            <div className="banner"
                style={
                    {
                        backgroundImage: popularmovies[0]
                            ? `url(${`${imgurl}/${popularmovies[0].poster_path}`})`
                            : "rgb(16, 16, 16)",
                    }
                }
            >
                {popularmovies[0] && <h1>{popularmovies[0].original_title}</h1>}
                {popularmovies[0] && <p>{popularmovies[0].overview}</p>}


                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>


            </div>
            <Row title="Upcoming movies" arr={upcomingmovies} />
            <Row title="Top-Rated " arr={topratedmovies} />
            <Row title="Now-Playing" arr={nowmovies} />
            <Row title="Popular" arr={popularmovies} />

            <div className='genrelast'>
                {
                    genre.map(
                        (item) => (
                            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                        )
                    )
                }
            </div>


        </section>
    )
}

export default Home