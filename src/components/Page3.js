import React, { Component } from "react";
class Page3 extends Component {
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
          metrics: "ga:bounceRate",
          dimensions: "ga:date",
          "start-date": "30daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          container: "chart-container",
          type: "COLUMN",
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
        <h1>Y軸長條圖 / 30天</h1>
        <h2>跳出率</h2>
        <div id="chart-container" />
        <div id="view-selector-container" />
      </div>
    );
  }
}

export default Page3;
