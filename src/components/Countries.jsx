import { useEffect, useState } from "react";
import { Country } from "./Country";
import { useNavigate, useParams } from "react-router-dom";

const Countries = ({ setRegion, region, data, setData }) => {
  const [arrow, setArrow] = useState(false);
  const [search, setSearch] = useState("");
  const [countryData, setCountryData] = useState([]);

  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const handleChange = (e) => {
    setRegion(e.target.innerText);
    setArrow(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search/${search}`);
      setSearch("");
      setRegion("");
    }
  };

  useEffect(() => {
    if (data) {   
      setCountryData (data)
    }
    if (searchTerm) {
      const filteredData = data?.filter((e) => {
        if (e?.name?.common) {
          return e?.name?.common?.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.area) {
          return e?.area.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.capital) {
          return e?.capital.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.car?.side) {
          return e?.car?.side.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.cca2) {
          return e?.cca2.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.cca3) {
          return e?.cca3.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.ccn3) {
          return e?.ccn3.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.cioc) {
          return e?.cioc.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.continents[0]) {
          return e?.continents[0].toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.fifa) {
          return e?.fifa.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.flag) {
          return e?.flag.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.idd?.root) {
          return e?.idd?.root.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.idd?.root?.suffixes[0]) {
          return (
            e?.idd?.root?.suffixes[0].toLowerCase() === searchTerm.toLowerCase()
          );
        }
        if (e?.population) {
          return e?.population.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.postalCode?.formate) {
          return (
            e?.postalCode?.formate.toLowerCase() === searchTerm.toLowerCase()
          );
        }
        if (e?.postalCode?.regex) {
          return (
            e?.postalCode?.regex.toLowerCase() === searchTerm.toLowerCase()
          );
        }
        if (e?.region) {
          return e?.region.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.startOfWeek) {
          return e?.startOfWeek.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.timezones) {
          return e?.timezones.toLowerCase() === searchTerm.toLowerCase();
        }
        if (e?.subregion) {
          return e?.subregion.toLowerCase() === searchTerm.toLowerCase();
        }
      });

      return setCountryData(filteredData);
    }

    if (region && data) {
      const dat = data?.filter((e) => {
        return e?.region.toLowerCase() === region.toLowerCase();
      });

      setCountryData(dat);
    } else setCountryData(data);
  }, [searchTerm, region, data]);

  return (
    <div className="homeContainer">
      <div className="countries-Top">
        <form className="top-search" onSubmit={handleSubmit}>
          <ion-icon name="search-outline" />
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <div className="top-selector">
          <span onClick={() => setArrow(!arrow)}>
            {region || "Filter by Region"}
            <ion-icon name={`chevron-${arrow ? "down" : "up"}`} />
          </span>
          {arrow && (
            <div className="list_options">
              <li onClick={handleChange}>Africa</li>
              <li onClick={handleChange}>Americas</li>
              <li onClick={handleChange}>Asia</li>
              <li onClick={handleChange}>Europe</li>
              <li onClick={handleChange}>Oceania</li>
            </div>
          )}
        </div>
      </div>

      <div className="countriesHome">
        <div className="grid">
          {countryData.map((item, index) => (
            <Country key={index} country={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
