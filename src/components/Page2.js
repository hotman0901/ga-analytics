import React, { Component } from "react";
class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    gapi.analytics.ready(function() {
      /**
       * Create a new ViewSelector instance to be rendered inside of an
       * element with the id "view-selector-container".
       */
      var viewSelector = new gapi.analytics.ViewSelector({
        container: "view-selector-container"
      });

      var viewSelector3 = new gapi.analytics.ViewSelector({
        container: "view-selector-container-3"
      });

      // Render the view selector to the page.
      viewSelector.execute();

      viewSelector3.execute();

      /**
       * Create a new DataChart instance with the given query parameters
       * and Google chart options. It will be rendered inside an element
       * with the id "chart-container".
       */
      var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:date",
          "start-date": "30daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          container: "chart-container",
          type: "LINE",
          options: {
            width: "100%"
          }
        }
      });

      // 選擇瀏覽器
      var mainChart3 = new gapi.analytics.googleCharts.DataChart({
        query: {
          dimensions: "ga:browser",
          metrics: "ga:sessions",
          sort: "-ga:sessions",
          "max-results": "6"
        },
        chart: {
          type: "TABLE",
          container: "main-chart-container-3",
          options: {
            width: "100%"
          }
        }
      });

      // 圖表顯示
      var breakdownChart3 = new gapi.analytics.googleCharts.DataChart({
        query: {
          dimensions: "ga:date",
          metrics: "ga:sessions",
          "start-date": "7daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          type: "LINE",
          container: "breakdown-chart-container-3",
          options: {
            width: "100%"
          }
        }
      });

      /**
       * Render the dataChart on the page whenever a new view is selected.
       */
      viewSelector.on("change", function(ids) {
        dataChart
          .set({
            query: {
              ids: ids
            }
          })
          .execute();
      });

      /**
       * Store a refernce to the row click listener variable so it can be
        * removed later to prevent leaking memory when the chart instance is
        * replaced.
        */
      var mainChartRowClickListener3;

      /**
       * Update both charts whenever the selected view changes.
       */
      viewSelector3.on("change", function(ids) {
        var options = {
          query: {
            ids: ids
          }
        };

        // Clean up any event listeners registered on the main chart before
        // rendering a new one.
        if (mainChartRowClickListener3) {
          google.visualization.events.removeListener(
            mainChartRowClickListener3
          );
        }

        mainChart3.set(options).execute();
        breakdownChart3.set(options);

        // Only render the breakdown chart if a browser filter has been set.
        if (breakdownChart3.get().query.filters) breakdownChart3.execute();
      });

      /**
       * Each time the main chart is rendered, add an event listener to it so
       * that when the user clicks on a row, the line chart is updated with
       * the data from the browser in the clicked row.
       */
      mainChart3.on("success", function(response) {
        var chart = response.chart;
        var dataTable = response.dataTable;

        // Store a reference to this listener so it can be cleaned up later.
        mainChartRowClickListener3 = google.visualization.events.addListener(
          chart,
          "select",
          function(event) {
            // When you unselect a row, the "select" event still fires
            // but the selection is empty. Ignore that case.
            if (!chart.getSelection().length) return;

            var row = chart.getSelection()[0].row;
            var browser = dataTable.getValue(row, 0);
            var options = {
              query: {
                filters: "ga:browser==" + browser
              },
              chart: {
                options: {
                  title: browser
                }
              }
            };

            breakdownChart3.set(options).execute();
          }
        );
      });
    });
  }
  render() {
    return (
      <div className="main">
        <h1>折線圖 / 30天</h1>
        <h2>每日登入人數數量</h2>
        <div id="chart-container" />
        <div id="view-selector-container" />

        <h2>瀏覽器登入數量</h2>
        <div id="main-chart-container-3" />
        <div id="breakdown-chart-container-3" />
        <div id="view-selector-container-3" />
      </div>
    );
  }
}

export default Page2;
