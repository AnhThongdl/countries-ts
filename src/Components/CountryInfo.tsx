import React from 'react'
import { Card, Col } from 'react-bootstrap'

interface CountryInfo {
  common: string
  official: string
  capital: string
  flags: string
}

const CountryInfo: React.FC<CountryInfo> = ({
  common,
  official,
  capital,
  flags,
}) => {
  return (
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Body>
          <Card.Title>
            <img src={flags} alt="flag" width="100%" height="150px" />
          </Card.Title>
          <Card.Title>{official}</Card.Title>
          <Card.Text>{common}</Card.Text>
          <Card.Subtitle>{capital}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CountryInfo
