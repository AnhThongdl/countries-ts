import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDebounce } from 'use-debounce'
import {
  Container,
  Row,
  Form,
  FormControl,
  Button,
  Navbar,
} from 'react-bootstrap'
import CountryInfo from './CountryInfo'

interface Country {
  name: {
    common: string
    official: string
  }
  capital: string
  flags: { svg: string }
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [debounceValue] = useDebounce<string>(searchText, 500)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    const getCountriesData = async () => {
      const url = `https://restcountries.com/v3.1/all`
      const res = await axios.get(url)

      setCountries(res.data)
    }

    getCountriesData()
  }, [])

  useEffect(() => {
    if (debounceValue) setSearchText(debounceValue)
    console.log('debounceValue', debounceValue)

    const filter = countries.filter((country) =>
      country.name.official.toLowerCase().includes(debounceValue),
    )
    console.log('filter', filter)
    setCountries(filter)
  }, [debounceValue])

  return (
    <Container>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Row>
            <Navbar.Brand className="fs-2">
              World Countries Infomation
            </Navbar.Brand>
          </Row>
          <Row>
            <Form className="d-flex my-3">
              {isSearching ? (
                <>
                  <FormControl
                    type="search"
                    placeholder="Find country..."
                    className="me-2"
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button
                    onClick={() => setIsSearching(!isSearching)}
                    className="mr-3"
                    variant="outline-success"
                  >
                    Search
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsSearching(!isSearching)}
                  className="mr-3"
                  variant="outline-success"
                >
                  Search
                </Button>
              )}
            </Form>
          </Row>
        </Container>
      </Navbar>

      <Row className="mt-5 pt-5">
        {countries.map((country, i) => {
          const {
            name: { common, official },
            capital,
            flags: { svg },
          } = country
          return (
            <CountryInfo
              key={i}
              common={common}
              official={official}
              capital={capital}
              flags={svg}
            />
          )
        })}
      </Row>
    </Container>
  )
}

export default Countries
