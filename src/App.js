import { useEffect, useState } from "react";
import { fetchAPI } from "./utils/api";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [data, setData] = useState([]);
  const [dark, setDark] = useState(false);
  const [region, setRegion] = useState("");

  const UseDark = () => {
    localStorage.setItem("theme", "dark");

    document.documentElement.setAttribute("data-theme", "dark");
  };

  const UseLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);
  if (defaultDark) {
    UseDark();
  }

  const handleThem = () => {
    if (dark) {
      setDark(false);
      UseDark();
    } else {
      setDark(true);
      UseLight();
    }
  };

  useEffect(() => {
    if (!data.length || (region.length && !data.length)) {
      fetchAPI("all").then((data) =>
        setData(
          data.sort(function (a, b) {
            var na = a.name.common.toLowerCase();
            var nb = b.name.common.toLowerCase();

            if (na < nb) return -1;
            else if (na > nb) return 1;
            return 0;
          })
        )
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar_container">
          <Link to="/">
            <h4 className="h4">Where in the world</h4>
          </Link>
          <div className="themSwitcher" onClick={handleThem}>
            <ion-icon name={dark ? "moon-outline" : "moon"}></ion-icon>
            <p className="p">Dark Mode</p>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Countries
                region={region}
                setRegion={setRegion}
                data={data}
                setData={setData}
              />
            }
          />
          <Route
            path="/search/:searchTerm"
            element={
              <Countries
                region={region}
                setRegion={setRegion}
                data={data}
                setData={setData}
              />
            }
          />
          <Route
            path="/country/:id"
            element={<CountryDetail country={data} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
