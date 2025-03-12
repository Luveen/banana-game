import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Fetching Data From the image {Question and Solution}
function FetchGameData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); //Show the Question and Solution data
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1 className="greetings">Good morning, Luveen</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center">
              <div className="card-body">
                <h1 className="card-title">Game</h1>
                <img
                  src={data.question}
                  alt="Banana question"
                  className="card-img-top"
                  style={{ objectFit: "cover" }}
                />

                <div className="mt-3">
                  {[...Array(9)].map((_, index) => (
                    <button key={index + 1} className="btn btn-primary m-1">
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FetchGameData;
