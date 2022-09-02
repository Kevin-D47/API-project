import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkGetSpotById, thunkEditSpot } from "../../store/spots";
import './UpdateSpotFormPage.css'

function UpdateSpotForm({ setShowUpdate }) {

  const user = useSelector(state => state.session.user)

  const { spotId } = useParams()

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
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()
  useEffect(() => {
    const errors = []
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

    return setErrors(errors)

  }, [name, address, city, state, country, lat, lng, price, previewImage, description])

  if (user === null) {
    alert("must be logged in to edit a spot")
    return <Redirect to="/" />
  }

  async function onSubmit(e) {
    e.preventDefault()

    setHasSubmitted(true)
    if (errors.length > 0) return alert('cant submit')

    const updatedSpot = {
      id: spotId, name, address, city, state, country, lat, lng, price, previewImage, description
    }

    await dispatch(thunkEditSpot(updatedSpot))
    await dispatch(thunkGetSpotById(spotId))
    setShowUpdate(false)
    history.push(`/spots/${spotId}`)
  }
  return (
    <form className="edit-form-container" onSubmit={onSubmit} >
      <div className="edit-form-wrapper">
        <div className="edit-title-container">
          <h3 id='edit-title'>Update My Spot</h3>
        </div>
        <div className="edit-form-input">
          <input
            className="form-input first update"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="number"
            placeholder="Latitude"
            min='-90'
            max='90'
            step="0.01"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="number"
            placeholder="Longitude"
            min='-180'
            max='180'
            step="0.01"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
          <input
            className="form-input middle update"
            type="number"
            placeholder="Price"
            min="0.00"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="form-input middle update"
            name="preview-image"
            type="url"
            placeholder="Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          <input
            className="form-input last desc update"
            type="text"
            placeholder="Description"
            maxLength='50'
            minLength='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="edit-form-errors">
            {hasSubmitted && errors.length > 0 && (
              <ul>
                {errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <button className="submit-button" type="submit">Update Spot</button>
    </form>
  )
}

export default UpdateSpotForm
