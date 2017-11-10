import React, { Component } from "react";
class Page4 extends Component {
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
          dimensions: "ga:date",
          "start-date": "30daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          container: "chart-container",
          type: "BAR",
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
        <h1>X軸長條圖</h1>
        <h2>顯示每日登入人數</h2>
        <div id="chart-container" />
        <div id="view-selector-container" />
      </div>
    );
  }
}

export default Page4;
