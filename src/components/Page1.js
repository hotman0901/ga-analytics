import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectBook } from "../actions/book";
import uuid from "uuid";
import { uniqueId } from "lodash";
class Page1 extends Component {
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
      var viewSelector1 = new gapi.analytics.ViewSelector({
        container: "view-selector-container-1"
      });

      var viewSelector2 = new gapi.analytics.ViewSelector({
        container: "view-selector-container-2"
      });

      // var viewSelector3 = new gapi.analytics.ViewSelector({
      //     container: 'view-selector-container-3'
      // });

      // Render the view selector to the page.
      viewSelector1.execute();
      viewSelector2.execute();
      // viewSelector3.execute();

      /**
             * Create a new DataChart instance with the given query parameters
             * and Google chart options. It will be rendered inside an element
             * with the id "chart-container".
             */

      // 設定圖表顯示資料參數
      // 可以顯示不同維度的資料
      // dimensions => ga:date 、 ga:country
      // 可以選擇起始結束日期
      var dataChart1 = new gapi.analytics.googleCharts.DataChart({
        // query: {
        //     metrics: 'ga:sessions',
        //     dimensions: 'ga:date',
        //     'start-date': '30daysAgo',
        //     'end-date': 'yesterday'
        // },
        // chart: {
        //     container: 'chart-container-1',
        //     type: 'LINE',
        //     options: {
        //         width: '100%'
        //     }
        // }
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:browser",
          "start-date": "30daysAgo",
          "end-date": "yesterday",
          "max-results": 6,
          sort: "-ga:sessions"
        },
        chart: {
          container: "chart-container-1",
          type: "PIE",
          options: {
            width: "100%",
            pieHole: 4 / 9
          }
        }
      });

      // 圓餅圖
      var dataChart2 = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:country",
          "start-date": "30daysAgo",
          "end-date": "yesterday",
          "max-results": 6,
          sort: "-ga:sessions"
        },
        chart: {
          container: "chart-container-2",
          type: "PIE",
          options: {
            width: "100%",
            pieHole: 4 / 9
          }
        }
      });

      // 選擇瀏覽器
      // var mainChart3 = new gapi.analytics.googleCharts.DataChart({
      //     query: {
      //         'dimensions': 'ga:browser',
      //         'metrics': 'ga:sessions',
      //         'sort': '-ga:sessions',
      //         'max-results': '6'
      //     },
      //     chart: {
      //         type: 'TABLE',
      //         container: 'main-chart-container-3',
      //         options: {
      //             width: '100%'
      //         }
      //     }
      // });

      // 圖表顯示
      // var breakdownChart3 = new gapi.analytics.googleCharts.DataChart({
      //     query: {
      //         'dimensions': 'ga:date',
      //         'metrics': 'ga:sessions',
      //         'start-date': '7daysAgo',
      //         'end-date': 'yesterday'
      //     },
      //     chart: {
      //         type: 'LINE',
      //         container: 'breakdown-chart-container-3',
      //         options: {
      //             width: '100%'
      //         }
      //     }
      //     // query: {
      //     //     metrics: 'ga:sessions',
      //     //     dimensions: 'ga:browser',
      //     //     'start-date': '30daysAgo',
      //     //     'end-date': 'yesterday',
      //     //     'max-results': 6,
      //     //     sort: '-ga:sessions'
      //     // },
      //     // chart: {
      //     //     container: 'breakdown-chart-container-3',
      //     //     type: 'PIE',
      //     //     options: {
      //     //         width: '100%',
      //     //         pieHole: 4 / 9
      //     //     }
      //     // }
      // });

      /**
             * 畫圖表
             * Render the dataChart on the page whenever a new view is selected.
             */
      viewSelector1.on("change", function(ids) {
        dataChart1
          .set({
            query: {
              ids: ids
            }
          })
          .execute();
      });

      viewSelector2.on("change", function(ids) {
        dataChart2
          .set({
            query: {
              ids: ids
            }
          })
          .execute();
      });

      // /**
      //  * Store a refernce to the row click listener variable so it can be
      //  * removed later to prevent leaking memory when the chart instance is
      //  * replaced.
      //  */
      // var mainChartRowClickListener3;

      // /**
      //  * Update both charts whenever the selected view changes.
      //  */
      // viewSelector3.on('change', function (ids) {
      //     var options = {
      //         query: {
      //             ids: ids
      //         }
      //     };

      //     // Clean up any event listeners registered on the main chart before
      //     // rendering a new one.
      //     if (mainChartRowClickListener3) {
      //         google.visualization.events.removeListener(mainChartRowClickListener3);
      //     }

      //     mainChart3.set(options).execute();
      //     breakdownChart3.set(options);

      //     // Only render the breakdown chart if a browser filter has been set.
      //     if (breakdownChart3.get().query.filters) breakdownChart3.execute();
      // });

      // /**
      //  * Each time the main chart is rendered, add an event listener to it so
      //  * that when the user clicks on a row, the line chart is updated with
      //  * the data from the browser in the clicked row.
      //  */
      // mainChart3.on('success', function (response) {

      //     var chart = response.chart;
      //     var dataTable = response.dataTable;

      //     // Store a reference to this listener so it can be cleaned up later.
      //     mainChartRowClickListener3 = google.visualization.events
      //         .addListener(chart, 'select', function (event) {

      //             // When you unselect a row, the "select" event still fires
      //             // but the selection is empty. Ignore that case.
      //             if (!chart.getSelection().length) return;

      //             var row = chart.getSelection()[0].row;
      //             var browser = dataTable.getValue(row, 0);
      //             var options = {
      //                 query: {
      //                     filters: 'ga:browser==' + browser
      //                 },
      //                 chart: {
      //                     options: {
      //                         title: browser
      //                     }
      //                 }
      //             };

      //             breakdownChart3.set(options).execute();
      //         });
      // });
    });
  }
  render() {
    return (
      <div className="main">
        <h1>圓餅圖</h1>
        <h2>Browser</h2>
        <div id="chart-container-1" />
        <div id="view-selector-container-1" />

        <h2>Country</h2>
        <div id="chart-container-2" />
        <div id="view-selector-container-2" />

        {/* <div id="main-chart-container-3"></div>
                <div id="breakdown-chart-container-3"></div>
                <div id="view-selector-container-3"></div> */}
      </div>
    );
  }
}
function mapStateToProps({ book }) {
  // console.log(book)
  return { book };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1);
