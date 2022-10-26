import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";

const CountryDetail = ({ country }) => {
  const [data, setData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const border = (item) => {
    const bora = country.filter((e) => {
      return e.cca3 === item;
    });
    return bora[0]?.name?.common;
  };

  const language = (item) => {
    const lag = Object.values(item);
    return lag.toLocaleString().replace(",", ", ");
  };

  const currencies = (item) => {
    const lag = Object.values(item);
    return Object.values(lag.map((i) => i.name))
      .toLocaleString()
      .replace(",", ", ");
  };

  const nativeName = (item) => {
    const lag = Object.values(item);
    const lTo = lag?.length - 1;
    return Object.values(lag[lTo])[0].common;
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (country.length > 0) {
      setData(
        country.filter((e) => {
          return e.name.common === id;
        })
      );
    } else {
      fetchAPI(`name/${id}?fullText=true`).then((data) => setData(data));
    }
  }, [id]);

  return (
    <div className="countryDetail">
      <div className="countryDetail_back-btn">
        <button onClick={handleBack}>
          <ion-icon name="arrow-back-outline"></ion-icon> Back
        </button>
      </div>
      {data?.map((item, index) => (
        <div key={index} className="countryDetail_content">
          <div className="content-flag">
            <img src={item?.flags?.svg} alt={`flag of  ${item?.name.common}`} />
          </div>
          <div className="country-details">
            <h4 className="nameOfCou">{item?.name.common}</h4>
            <div className="details-parts">
              <p>
                Native Name:&nbsp;<span>{nativeName(item?.name)}</span>
              </p>
              <p>
                Population:&nbsp;<span>{item?.population}</span>{" "}
              </p>
              <p>
                Region:&nbsp;<span>{item?.region}</span>
              </p>
              <p>
                Sub Region:&nbsp;<span>{item?.subregion}</span>
              </p>
              <p>
                Capital:&nbsp;<span>{item?.capital}</span>
              </p>
              <br className="mob" />
              <p>
                Top Level Domain:&nbsp;<span>{Object.values(item?.tld)}</span>
              </p>
              <p>
                Currencies:&nbsp;<span>{currencies(item?.currencies)}</span>
              </p>
              <p>
                Language: &nbsp;<span>{language(item?.languages)}</span>
              </p>
            </div>
            <div className="borderCountries">
              <p>Border Countries:</p>
              <div className="borderCounties_btn">
                {item?.borders?.map((item, index) => (
                  <Link to={`/country/${border(item)}`} key={index}>
                    <button>{border(item)}</button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryDetail;
