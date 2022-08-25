import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { thunkCreateSpot, thunkGetAllSpots } from "../../store/spots";
import "./NewSpotFormPage.css"


const NewSpotFormPage = () => {

    const history = useHistory()

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


    async function onSubmit(e) {
        e.preventDefault();

        setHasSubmitted(true);

        if (errors.length) return alert("No inputs, cannot submit")

        if (errors.length > 0) {
            history.push('/spots/create');
            return
        }

        const payload = {
            name, address, city, state, country, lng, lat, price, previewImage, description
        }

        await dispatch(thunkCreateSpot(payload))
        history.push('/')
    }


    return (
        <form
            onSubmit={onSubmit}>
            {hasSubmitted && errors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}

                />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="state">State:</label>
                <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lat">Latitude:</label>
                <input
                    id="lat"
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lng">Longitude:</label>
                <input
                    id="lng"
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="previewImage">Image:</label>
                <input
                    id="previewImage"
                    type="url"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button>Submit</button>

        </form>
    )
}

export default NewSpotFormPage
