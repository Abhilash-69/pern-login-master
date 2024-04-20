import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { MovieCard } from './MovieCard';

const url = "http://localhost:5000/auth/"

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState({})

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    axios.get(`${url}`, {
      headers: { token: localStorage.getItem('token') }
    }).then((response) => {
      setName(response.data)
    })
  }

  const logOut = () => {
    if (name) {
      localStorage.clear("token")
      setAuth(false)
      toast.success("LogOut Successful")
    }
  }
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(null);
  const [movieName, setMovieName] = useState();
  useEffect(() => {
    const searchBar = setTimeout(() => {
      if (movieName.length === 0) {
        setSearchResult(null);
      }
      else {
        console.log(movieName);
        axios.get("http://127.0.0.1:5000/api/search/" + movieName).then((res) => {
          console.log(res.data);
          setSearchResult(res.data);
        })
      }
    }, [300])
    return () => clearTimeout(searchBar)
  }, [movieName])
  const handleMovieClick = (movieName) => {
    navigate(`/m/${movieName}`);
  };
  return (
    // <main className='container' style={{ maxWidth: '100vw',minHeight: '100vh',backgroundColor: 'rgba(0,0,0,0.9)'}}>
    //   <h2>Welcome {name.user_name}</h2>
    //   <div className='top' style={{ display: 'flex',justifyContent: 'center',position: 'sticky',top: '4px'}}>
    //     <div className="pad" style={{ width: '50%',paddingLeft: '3rem',paddingRight: '3rem',display: 'flex'}}>
    //       <input type="text" onChange={(e) => setMovieName(e.target.value)} className="search-box" style={{  width: '100%',backgroundColor: 'rgba(255,255,255,0.25)',backdropFilter: 'blur(40px)',padding: '1.5rem',borderRadius: '0.5rem 0 0 0.5rem',fontSize: '1.25rem',outline: 'none',color: '#fff'}} placeholder="Search by movies" />
    //       <button className="search-btn" style={{ paddingLeft: '1.5rem',paddingRight: '1.5rem',paddingTop: '0.5rem',paddingBottom: '0.5rem',borderRadius: '0 0.5rem 0.5rem 0',backgroundColor: '#dc2626',color: '#fff',fontSize: '1.125rem'}}>Search</button>
    //       <button onClick={logOut} className='logout-btn' style={{ paddingLeft: '1.5rem',paddingRight: '1.5rem',paddingTop: '0.5rem',paddingBottom: '0.5rem',borderRadius: '0 0.5rem 0.5rem 0',backgroundColor: '#dc2626',color: '#fff',fontSize: '1.125rem'}}>LogOut</button>
    //     </div>
    //   </div>
    //   <div className="srch" style={{ width: '100%',paddingTop: '3rem',paddingBottom: '3rem',paddingLeft: '6rem',paddingRight: '6rem',top: '6rem'}}>
    //     {
    //       searchResult != null ?
    //         <div className="">
    //           <ul className="st" style={{ display: 'flex',flexDirection: 'column',gap: '2.5rem',columnGap: '2rem',flexWrap: 'wrap'}}>
    //             {searchResult.map((val, ind) => (
    //               <li className="flex" style={{ display: 'flex' }}>
    //                 <a href={`/m/${val.movieLink}`} >
    //                   <MovieCard image={val.movieImage} name={val.movieTitle} />
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //         : null
    //     }
    //   </div>
    // </main>
    <main className='max-w-screen min-h-screen bg-[rgb(0,0,0,0.9)] '>
            <h2>Welcome {name.user_name}</h2>
            <div className='flex justify-center sticky top-4'>
                <div className="w-1/2 px-12 flex ">
                    <input type="text" onChange={(e) => setMovieName(e.target.value)} className="w-full bg-[rgba(255,255,255,0.25)] backdrop-blur-xl p-6 rounded-l-lg text-xl outline-none text-white" placeholder="Search by movies" />
                    <button className=" px-6 py-2 rounded-r-lg bg-red-700 text-white text-lg">Search</button>
                </div>
            </div>
            <div className="w-[100%] py-12 px-24 top-24  ">
                {
                    searchResult != null ?
                        <div className="">
                            <ul className="flex gap-y-10 gap-x-8 flex-wrap">
                                {searchResult.map((val, ind) => (
                                    <li className="flex" >
                                        <a href={`/m/${val.movieLink}`} >
                                            <MovieCard image={val.movieImage} name={val.movieTitle} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        : null
                }
            </div>
        </main>
  )
  // return (
  //   <div>
  //     <h1 className="mt-5">Dashboard</h1>
  //     <h2>Welcome {name.user_name}</h2>
  //     <button onClick={logOut} className='btn btn-primary'>LogOut</button>
  //   </div>
  // )
}

export default Dashboard