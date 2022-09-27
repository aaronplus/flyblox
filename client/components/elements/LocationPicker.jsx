import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

class LocationPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: props.value ? formatAddress(props.value) : '' }
  }
  handleChange = address => {
    this.setState({ address })
    this.props.onChange({
      address: '',
      suburb: address,
      postalCode: '',
      state: '',
      country: '',
      lat: 0,
      long: 0
    })
  }
  componentWillReceiveProps({ isAutoFocus }) {}
  handleSelect = async address => {
    this.setState({ address })
    const results = await geocodeByAddress(address)
    const first = results[0]
    const latlong = await getLatLng(results[0])
    const streetNumber = first.address_components.find(
      c => c.types.indexOf('street_number') >= 0
    )
    const route = first.address_components.find(
      c => c.types.indexOf('route') >= 0
    )
    const city = first.address_components.find(
      c => c.types.indexOf('locality') >= 0
    )
    const postalCode = first.address_components.find(
      c => c.types.indexOf('postal_code') >= 0
    )
    const state = first.address_components.find(
      c => c.types.indexOf('administrative_area_level_1') >= 0
    )
    const country = first.address_components.find(
      c => c.types.indexOf('country') >= 0
    )
    this.props.onChange({
      address:
        streetNumber && route
          ? `${streetNumber.long_name} ${route.long_name}`
          : route && route.long_name,
      suburb: city && city.long_name,
      postalCode: postalCode && postalCode.long_name,
      state: state && state.short_name,
      country: country && country.long_name,
      lat: latlong.lat,
      long: latlong.lng
    })
  }
  render() {
    const { value, onChange, ...inputProps } = this.props.input
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{
          componentRestrictions: { country: ['au', 'nz'] }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='autocomplete-wrapper'>
            <input
              autoComplete='nope'
              type='search'
              autoFocus={`${this.props.isAutoFocus ? 'autofocus' : ''}`}
              {...getInputProps(inputProps)}
              placeholder={
                this.props.home ? 'Location, Landmark or Address' : 'Address'
              }
              className='location-search-input'
              style={{ height: '43px' }}
            />
            <div className='autocomplete-dropdown-container'>
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                const chunks = suggestion.matchedSubstrings
                  .map(m => m.offset)
                  .concat(
                    suggestion.matchedSubstrings.map(m => m.offset + m.length)
                  )
                  .sort((a, b) => a - b)
                const strings = chunks.reduce(
                  (acc, current, i, array) => {
                    return [
                      ...acc,
                      suggestion.formattedSuggestion.mainText.slice(
                        array[i],
                        array[i + 1]
                      )
                    ]
                  },
                  [suggestion.formattedSuggestion.mainText.slice(0, chunks[0])]
                )
                const mainText = strings.map((s, i) =>
                  i % 2 === 1 ? <strong>{s}</strong> : <span>{s}</span>
                )
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                  >
                    <img
                      className='autocomplete__suggestion-icon'
                      src='/img/icons/geolocation.svg'
                      alt=''
                    />
                    <span>
                      <span className='autocomplete__main-text'>
                        {mainText}
                      </span>
                      &nbsp;
                      <span className='autocomplete__secondary-text'>
                        {suggestion.formattedSuggestion.secondaryText}
                      </span>
                    </span>
                  </div>
                )
              })}
              {suggestions.length ? (
                <div className='autocomplete__dropdown-footer'>
                  <img
                    className='autocomplete__dropdown-footer-image'
                    src='/img/powered_by_google.png'
                    alt=''
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}
export default LocationPicker
