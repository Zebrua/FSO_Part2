import { useEffect, useState } from 'react'
import axios from 'axios'

const getAll = () => {
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  return request.then(response => response.data)
}

const Filtering = (props) => {
  const filternames = (event) => {
    // console.log(event.target.value)
    props.setFilterName(event.target.value)
  }

  return(
    <form>
      <div>
        Find countries:<input
        value={props.filterName}
        onChange={filternames}/>
      </div>
    </form>
  )
}

const Display= (props) => {
  const filterred = props.countries.filter(({name}) => name.common.includes(props.filterName) === true)
  if (filterred.length >= 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if(filterred.length >> 1) {
    return(
      <div>
        {filterred.map((countrie) =>(
          <p key={countrie.cca2}>{countrie.name.common}</p>
        ))}
      </div>
    )
  }else if(filterred.length === 1) {
    const country = filterred[0]
    const lang = Object.values(country.languages)
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km^2</p>
        <h3>Speaking:</h3>
        <ul>
          {lang.map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />

      </div>
    )
  }
} 

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    getAll()
    .then(Countries =>{
      console.log(Countries[0].languages)
      setCountries(Countries)
    })
  }, [])
  

  return(
    <div>
      <h1>Find information about countries</h1>
      <div>
        <Filtering setFilterName={setFilterName} filter={filterName} />
      </div>  
      <div>
        <Display filterName={filterName} countries={countries} />
      </div>
    </div>
  )
}

export default App
