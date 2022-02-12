import axios from 'axios'

export const api = {
  getCountries: async () => {
    let response = await axios.get('https://restcountries.com/v3.1/all')
    return response.data
  },
  getCountry: async (name: string) => {
    let response = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`,
    )
    return response.data
  },
}
