import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlantDirectory = () => {
  const [plants, setPlants] = useState([]);               //all plants from the backend
  const [filteredPlants, setFilteredPlants] = useState([]); //filtered list based on search
  const [query, setQuery] = useState('');                 //search input value
  const [sortBy, setSortBy] = useState('common_name');   //sorting field

  //initial fetch and re-sort on sort key change
  useEffect(() => {
    fetch('/plants')
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(sortPlants(data, sortBy));
      });
  }, [sortBy]);

  //sort helper function
  const sortPlants = (plantList, key) => {
    return [...plantList].sort((a, b) => a[key].localeCompare(b[key]));
  };

  //handle dynamic search
  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val === '') {
      //empty search input returns full, sorted list
      setFilteredPlants(sortPlants(plants, sortBy));
    } else {
      //API search for matches
      fetch(`/plants/search?query=${val}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((results) => {
          setFilteredPlants(sortPlants(results, sortBy));
        });
    }
  };

  //handle sort button click
  const handleSort = (key) => {
    setSortBy(key);
    setFilteredPlants(sortPlants(filteredPlants, key));
  };

  return (
    <div className="container mt-4">
      <h2>Healing Plants Materia Medica</h2>

      <div className="mb-4 d-flex flex-column flex-sm-row align-items-start search-bar">
        {/* 
        Experimenting with different ways to search - here I'm using onChange to call handleSearch
        with every keystroke so results are fetched dynamically as user types (still leaving search
        button for the visual appeal but it also triggers manual search) 
        For RecipeList.js I just used manual search 
        */}
        <input
          className="form-control custom-input me-sm-2 mb-2 mb-sm-0 search-input"
          type="text"
          placeholder="Search by common or scientific name..."
          value={query}
          onChange={handleSearch}
        />
        {/* 
        Note: Currently handleSearch runs both on typing input and on button click,
        which I thought might cause duplicate requests but actually caused another bug - if the plant
        is not found, or if the user clicks on the search button with the entered text still in the
        input field, it returns a full list of plants, I think it's because e.target.value is expecting 
        input and reading the button click as an empty field, but I need to debug further. This is just for 
        experimentation during dev and I would choose one or the other for production. Hard choice 
        though, I like the way dynamic search is so responsive but also like the visual appeal of a 
        search button.
        */}
        <button onClick={handleSearch} className="btn custom-btn">
          Search
        </button>
      </div>

      {/* sorting buttons */}
      <div className="btn-group mb-3" role="group">
        <button className="btn btn-outline-teal me-2" onClick={() => handleSort('common_name')}>
          Sort A-Z by Common Name
        </button>
        <button className="btn btn-outline-secondary" onClick={() => handleSort('scientific_name')}>
          Sort A-Z by Scientific Name
        </button>
      </div>

      {/* render each plant card */}
      <div className="row">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {plant.photo_url && (
                <img
                  src={plant.photo_url}
                  className="card-img-top plant-card-image"
                  alt={plant.common_name}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{plant.common_name}</h5>
                <p className="card-text">
                  <em>{plant.scientific_name}</em>
                </p>

                {/* badge showing free or subscription */}
                <div className="mb-1">
                  <span className="badge custom-badge">
                    {plant.is_sample ? 'Free' : 'Requires Subscription'}
                  </span>
                </div>

                <Link to={`/plants/${plant.id}`} className="btn btn-sm custom-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantDirectory;

