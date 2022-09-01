import { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'
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
    const [previewImage, setPreviewImage] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        const errors = [];

        if (name.length < 1 || name.length > 49) errors.push("Name length must be between 1 and 49 characters")
        if (!address.length) errors.push("Please provide an address");
        if (!city.length) errors.push("Please provide a city");
        if (!state.length) errors.push("Please provide a state")
        if (!country.length) errors.push("Please provide a country")
        if (!lat) errors.push("Please provide a lat")
        if (!lng) errors.push("Please provide a lng")
        if (price <= 0) errors.push("Please set a valid price");
        if (!previewImage) errors.push("Please provide a image");
        if (!description) errors.push("Please provide a description")

        return setErrors(errors);

    }, [name, address, city, state, country, lat, lng, price, previewImage, description])


    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])


    if (user === null) {
        alert("You must be logged in to Become a Host")
        return <Redirect to='/' />
    }


    async function onSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);

        // if (errors.length) return alert("No inputs, cannot submit")

        if (errors.length > 0) {
             return alert("invalid submission")
        
        }

        const payload = {
            name, address, city, state, country, lng, lat, price, previewImage, description
        }

        await dispatch(thunkCreateSpot(payload))
        history.push('/')
    }

    return (
        <div className="host-page-container">
            <div className="host-page-left-conatiner">
                <h1 className="welcome-message">Welcome back!</h1>
            </div>
            <div className="host-page-right-container">
                <div className="create-errors-container">
                    {hasSubmitted && errors.length > 0 && (
                        <ul className="errors-list">
                            {errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <form
                    onSubmit={onSubmit}
                    className="new-spot-form"
                >
                    <div className="create-spot-title-container">
                        <h3 className="create-spot-title">Host your Spot!</h3>
                    </div>

                    <div className="create-spot-input-wrapper">
                        <input
                            className="form-input first create"
                            type="text"
                            placeholder="Name of Spot"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="number"
                            placeholder="Latitude"
                            step='0.01'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="number"
                            placeholder="Logitude"
                            step='0.01'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="number"
                            placeholder="Price"
                            step='0.01'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <input
                            className="form-input middle create"
                            type="url"
                            name="preview-image"
                            placeholder="Image URL"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                        />
                        <textarea
                            className="form-input last desc create"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className="create submit-button" type="submit">Create Spot</button>
                </form>
            </div>
        </div>
    )
}

export default NewSpotFormPage
