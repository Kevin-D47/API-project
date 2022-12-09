import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import magnifyGlassIcon from './icons/search-icon.png'

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
                <div>
                    <img className='search-bttn' src={magnifyGlassIcon} onClick={onClick}></img>
                </div>
            </div>
            <div className='search-res-container'>
                {filteredSpots.length === 0 && search ?
                    <div className='search-res-no-data-container'>
                        <div className='search-res-no-data-info'>No results found</div>
                    </div> :
                    filteredSpots.slice(0, 6).map((spot, idx) => (
                        <NavLink className='search-spot-container' to={`/spots/${spot.id}`}>
                            <div key={idx} onClick={clearSearch}>
                                <div className='search-single-spot-res'>
                                    <img className='search-spot-image' src={spot.previewImage}></img>
                                    <div className='search-spot-info'>
                                        <div>{spot.name}</div>
                                        <div className='search-spot-city-state'>
                                            <div>{spot.city}, </div><div>{spot.state}</div>
                                        </div>

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
