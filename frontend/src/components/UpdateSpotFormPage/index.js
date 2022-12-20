import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot, thunkGetAllSpots } from "../../store/spots";
import './UpdateSpotFormPage.css'

const TYPES = [
  'House',
  'Condo',
  'Apartment',
  'Cabin',
  'Mansion',
  'Other'
]

function UpdateSpotForm({ setShowUpdate, spotId }) {

  const user = useSelector(state => state.session.user)

  // const { spotId } = useParams()

  const formInfo = useSelector(state => state.spots[spotId])

  const [name, setName] = useState(formInfo.name)
  const [address, setAddress] = useState(formInfo.address)
  const [city, setCity] = useState(formInfo.city)
  const [state, setState] = useState(formInfo.state)
  const [country, setCountry] = useState(formInfo.country)
  const [lat, setLat] = useState(formInfo.lat)
  const [lng, setLng] = useState(formInfo.lng)
  const [price, setPrice] = useState(formInfo.price)
  const [type, setType] = useState(formInfo.type)
  const [description, setDescription] = useState(formInfo.description)
  const [url, setUrl] = useState(formInfo.Images[0]?.url)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState([])

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    const errors = []
    if (!name) errors.push("Please provide an name")
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state")
    if (!country.length) errors.push("Please provide a country")
    if (lat < -90 || lat > 90 || !lat) errors.push("Please provide a valid latitude between -90 to 90")
    if (lng < -180 || lng > 180 || !lng) errors.push("Please provide a valid longitude between -180 to 180")
    if (!price || price <= 0) errors.push("Please set a valid price");
    if (!url) errors.push("Please provide a image");
    if (!description) errors.push("Please provide a description")
    if (!type) errors.push("Please provide a propery type")

    return setErrors(errors)

  }, [name, address, city, state, country, lat, lng, price, url, type, description])


  async function onSubmit(e) {
    e.preventDefault()

    setIsSubmitted(true)

    if (errors.length > 0) return alert('invalid submission')

    const updatedSpot = {
      id: spotId,
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      price,
      url,
      imageId: formInfo.Images[0].id,
      type,
      description
    }

    const isImg = (url) => url;

    if (isImg(url)) {
      dispatch(thunkEditSpot(updatedSpot))
        .then(() => dispatch(thunkGetAllSpots()))
        .then(() => setShowUpdate(false))
    }
  }

  if (user === null) {
    alert("must be logged in to edit a spot")
    return history.push('/')
  }

  const errorList = errors.map((error) => (
    <ul className="errors-list" key={error}>{error}</ul>
  ))

  return (
    <form className="edit-form-container" onSubmit={onSubmit}>
      <div className="edit-form-wrapper">
        <div className="edit-title-container">
          <h3 id='edit-title'>Update My Spot</h3>
        </div>
        <div className="edit-form-input">
          <input
            className="form-input first update"
            type="text"
            placeholder='Name'
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
            step="0.01"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="number"
            placeholder="Longitude"
            step="0.01"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="form-input middle update"
            type="url"
            name="preview-image"
            placeholder="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select
            className="form-input middle update"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option selected disabled value="">
              Select a Property Type
            </option>
            {TYPES.map(type => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
          <textarea
            className="form-input last desc update-description-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="edit-form-errors">
            {isSubmitted && errorList}
          </div>
        </div>
      </div>
      <button
        className="edit-submit-button"
        type="submit"
        disabled={isSubmitted && errors.length > 0}
      >
        Update Spot
      </button>
    </form>
  )
}

export default UpdateSpotForm
