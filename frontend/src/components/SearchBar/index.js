import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import './searchBar.css'


const SearchBar = () => {

    const history = useHistory()

    const allSpots = useSelector(state => state.search)

    const [filteredSpots, setFilteredSpots] = useState([])
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const spotSearch = e.target.value

        setSearch(spotSearch)

        const findSpot = Object.values(allSpots).filter((spot) => {
            return (
                spot.name.toLowerCase().includes(spotSearch.toLowerCase()) ||
                spot.city.toLowerCase().includes(spotSearch.toLowerCase()) ||
                spot.state.toLowerCase().includes(spotSearch.toLowerCase())
            )
        })

        spotSearch === "" ? setFilteredSpots([]) : setFilteredSpots(findSpot)
    }

    const handleSubmit = () => {
        history.push(`/spots/${filteredSpots[0].id}`)

        setFilteredSpots([])
        setSearch('')
    }

    const clearSearch = () => {
        setFilteredSpots([])
        setSearch('')
    }

    const onClick = (e) => {
        e.preventDefault()

        handleSubmit()
    }

    console.log('SPOTS-------', filteredSpots)


    return (
        <div className='search-container'>
            <div className='search-bar-conatainer'>
                <form onSubmit={handleSubmit}>
                    <input
                        className='search-bar-input'
                        type='text'
                        placeholder='Search Anywhere'
                        value={search}
                        onChange={handleSearch}
                    />
                </form>
                <div >
                    {search.length !== 0 ? (<button className='clear-search-button' onClick={clearSearch}>X</button>) : ('')}
                </div>
            </div>
            <div className='search-res-container'>
                {filteredSpots.slice(0, 6).map((spot, idx) => (
                    <NavLink to={`/spots/${spot.id}`}>
                        <div key={idx} onClick={clearSearch}>
                            <div className='search-single-spot-res'>
                                <img className='search-spot-image' src={spot.previewImage}></img>
                                <div>
                                    <div>{spot.name}</div>
                                    <div>{spot.city}</div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
