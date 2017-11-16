import React, { Component } from "react";
class Page5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    gapi.analytics.ready(function() {
      var viewSelector = new gapi.analytics.ViewSelector({
        container: "view-selector-container"
      });

      viewSelector.execute();

      var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:country",
          "start-date": "30daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          container: "chart-container",
          type: "TABLE",
          options: {
            width: "100%"
          }
        }
      });
      viewSelector.on("change", function(ids) {
        dataChart
          .set({
            query: {
              ids: ids
            }
          })
          .execute();
      });
    });
  }
  render() {
    return (
      <div className="main">
        <h1>觀看地區人數</h1>
        <div id="chart-container" />
        <div id="view-selector-container" />
      </div>
    );
  }
}

export default Page5;
