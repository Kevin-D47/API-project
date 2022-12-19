import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { thunkCreateSpot, thunkGetAllSpots } from "../../store/spots";
import "./NewSpotFormPage.css"


const NewSpotFormPage = () => {

    const user = useSelector(state => state.session.user)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();

    const history = useHistory()

    useEffect(() => {
        const errors = [];

        if (!name) errors.push("Please provide a name")
        if (!address.length) errors.push("Please provide an address");
        if (!city.length) errors.push("Please provide a city");
        if (!state.length) errors.push("Please provide a state")
        if (!country.length) errors.push("Please provide a country")
        if (lat < -90 || lat > 90 || !lat) errors.push("Please provide a valid latitude between -90 to 90")
        if (lng < -180 || lng > 180 || !lng) errors.push("Please provide a valid longitude between -180 to 180")
        if (!price || price <= 0) errors.push("Please set a valid price");
        if (!url) errors.push("Please provide a image");
        if (!description) errors.push("Please provide a description")

        return setErrors(errors);

    }, [name, address, city, state, country, lat, lng, price, url, description])

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    if (user === null) {
        alert("You must be logged in to Become a Host")
        return history.push('/')
    }

    async function onSubmit(e) {
        e.preventDefault();

        setIsSubmitted(true);

        if (!user) {
            return alert('Must be login to create a listing')
        }

        const payload = {
            name, address, city, state, country, lng, lat, price, previewImage: true, url, description
        }

        function isImg(url) {
            return url;
        }
        if (isImg(url)) {
            dispatch(thunkCreateSpot(payload)).then(() => dispatch(thunkGetAllSpots()))
            history.push('/')
        }
    }

    const errorList = errors.map((error) => (
        <p className="each-error" key={error}>{error}</p>
    ))

    return (
        <div>
            <div className="host-page-container">
                <div className="host-page-left-conatiner">
                    <h1 className="welcome-message">What kind of place will you host?</h1>
                </div>
            </div>
            <div className="host-page-right-container">
                <div className="form-el-container">
                    <div className="create-spot-title-container">
                        <h3 className="create-spot-title">Host your Stay!</h3>
                    </div>
                    <div className="create-errors-container">
                        {isSubmitted && errorList}
                    </div>
                    <form className="new-spot-form" onSubmit={onSubmit}>
                        <div className="create-spot-input-wrapper">
                            <input
                                className="form-input first create"
                                type="text"
                                placeholder="Name of Stay"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="number"
                                placeholder="Latitude"
                                step="0.01"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="number"
                                placeholder="Longitude"
                                step="0.01"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <input
                                className="form-input middle create"
                                type="url"
                                name="preview-image"
                                placeholder="Image URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <input
                                className="form-input last desc create"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            className="create-submit-button"
                            type="submit"
                            disabled={isSubmitted && errors.length > 0}
                        >
                            Create Spot
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewSpotFormPage
