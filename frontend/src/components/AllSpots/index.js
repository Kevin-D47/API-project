import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'

import starIcon from './icons/starIcon.png'
import githubIcon from './icons/github-icon.png'
import linkedinIcon from './icons/linkedin-icon.png'
import filterIcon from './icons/filter-icon.png'
import houseIcon from './icons/house-icon.png'
import condoIcon from './icons/condo-icon.png'
import apartmentIcon from './icons/apartment-icon.png'
import cabinIcon from './icons/cabin-icon.png'
import mansionIcon from './icons/mansion-icon.png'
import otherIcon from './icons/other-icon.png'

import './AllSpots.css'


const GetAllSpots = () => {

    const allSpots = useSelector(state => state.spots)
    const allSpotsArr = Object.values(allSpots)

    const [isLoaded, setIsLoaded] = useState(false)
    const [filterType, setFilterType] = useState('allResultsType')

    let typeSpotArr;

    if (filterType !== 'allResultsType') {
        typeSpotArr = allSpotsArr.filter((spot) => spot.type == filterType)
    } else {
        typeSpotArr = allSpotsArr
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSpots()).then(setIsLoaded(true));
    }, [dispatch])

    if (!allSpotsArr.length) {
        return null
    }

    return (
        isLoaded && (
            <div className='spots-container'>
                <div className='filter-type-container'>
                    <div className='filter-type-options'>
                        <div className={filterType === 'House' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('House')}>
                            <img className='house-icon' src={houseIcon}></img>
                            <div>House</div>
                        </div>
                        <div className={filterType === 'Condo' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Condo')}>
                            <img className='condo-icon' src={condoIcon}></img>
                            <div>Condo</div>
                        </div>
                        <div className={filterType === 'Apartment' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Apartment')}>
                            <img className='apartment-icon' src={apartmentIcon}></img>
                            <div>Apartment</div>
                        </div>
                        <div className={filterType === 'Cabin' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Cabin')}>
                            <img className='cabin-icon' src={cabinIcon}></img>
                            <div>Cabin</div>
                        </div>
                        <div className={filterType === 'Mansion' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Mansion')}>
                            <img className='mansion-icon' src={mansionIcon}></img>
                            <div>Mansion</div>
                        </div>
                        <div className={filterType === 'Other' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Other')}>
                            <img className='other-icon' src={otherIcon}></img>
                            <div>Other</div>
                        </div>
                    </div>
                    <div className={filterType === 'allResultsType' ? "clear-filter-buttons-inactive" : "clear-filter-buttons-active"} onClick={() => setFilterType('allResultsType')}>
                        <img className='filter-icon' src={filterIcon}></img>
                        <div className='clear-filter-buttons-text'>clear filter</div>
                    </div>
                </div>
                <div className='spots-cards-container'>
                    {typeSpotArr.map((spot) => (
                        <div key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <img className='spot-img' src={spot.previewImage} alt=''></img>
                            </NavLink>
                            <div className='spot-info-container'>
                                <div className='spot-info-left'>
                                    <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                        {spot.name}
                                    </div>
                                    <div style={{ fontSize: '14px', color: 'grey' }}>
                                        {spot.city}, {spot.state}
                                    </div>
                                    <div className='price-container'>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                            ${spot.price}
                                        </div>
                                        &nbsp; <div style={{ fontSize: '14px' }}>
                                            night
                                        </div>
                                    </div>
                                </div>
                                <div className='spot-info-right'>
                                    <div style={{ fontSize: '14px' }}>
                                        <img className='star-icon' src={starIcon} alt='' />
                                        {Number(spot.avgRating).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hompage-footer-container">
                    <div className='copyright-container'>
                        <div> © 2022 Staybnb, Inc.</div>
                        {/* <NavLink>Developer Page</NavLink> */}
                    </div>
                    <div className='footer-links-container'>
                        <a className="footer-link" href="https://github.com/Kevin-D47/Staybnb" target="_blank">
                            <img className='footer-icon' src={githubIcon}></img>
                            <div>Staybnb Github Repository</div>
                        </a>
                        <div className="developer-footer-container">
                            <div className='developer-name-container'>
                                <div style={{ fontWeight: 'bold' }}>Developer: </div>
                                <div style={{ fontWeight: '500' }}>Kevin Duong</div>
                            </div>
                            <div className='kevin-links'>
                                <a className="footer-link" href="https://www.linkedin.com/in/kevin-duong-513341216/" target="_blank">
                                    <img className='footer-icon' src={linkedinIcon}></img>
                                    <div>LinkedIn</div>
                                </a>
                                <a className="footer-link" href="https://github.com/Kevin-D47" target="_blank">
                                    <img className='footer-icon' src={githubIcon}></img>
                                    <div>Github</div>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default GetAllSpots
