import { Link } from "react-router-dom";

export const Country = ({ country }) => {
  return (
    <div className="one-country">
      <Link to={`/country/${country?.name?.common}`}>
        <div className="flagContainer">
          <img
            src={country?.flags?.svg}
            alt={`flag of${country?.name?.common}`}
          />
        </div>
        <div className="one-country-detail">
          <h4>{country?.name?.common}</h4>
          <p>Population: {country?.population}</p>
          <p>Region: {country?.region}</p>
          <p>Capital: {country?.capital}</p>
        </div>
      </Link>
    </div>
  );
};
