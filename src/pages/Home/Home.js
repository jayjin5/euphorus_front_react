import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Badge, Jumbotron } from "reactstrap";
import heroimg from "../../assets/header-img.svg";
import "./Home.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Chart from "../../components/Chart/Chart";

function Home() {
  const [rowData, setRowData] = useState([]);

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Year", field: "year" },
  ];

  useEffect(() => {
    fetch("http://131.181.190.87:3000/rankings?year=2020")
      .then((res) => res.json())
      .then((rankings) =>
        rankings.map((ranking) => {
          return {
            rank: ranking.rank,
            country: ranking.country,
            score: ranking.score,
            year: ranking.year,
          };
        })
      )
      .then((happinessRankings) => setRowData(happinessRankings));
  }, []);

  // Charts

  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <h1>Country Happiness Rankings</h1>
              <p className="lead">
                Euphorus measures what matters - sustainable wellbeing for all.
                Browse the below data and view by country
              </p>
              <Button color="primary">Learn More</Button>
            </div>

            <div className="col-md-6">
              <img className="img-fluid" src={heroimg} alt="hero image"></img>
            </div>
          </div>
        </div>
      </Jumbotron>

      <div className="container">
        <div
          className="ag-theme-alpine mx-auto"
          style={{
            height: "800px",
            width: "800px",
          }}
        >
          <p>
            <Badge color="secondary text-md">{rowData.length}</Badge> Countries
            ranked
          </p>
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={40}
            // onRowClicked={(row) =>
            //   history.push(`/book?title=${row.data.title}`)
            // }
          />
        </div>
      </div>

      <Chart />
    </div>
  );
}

export default Home;