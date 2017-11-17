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
    });
  }
  render() {
    return (
      <div className="main">
        <h1>圓餅圖 / 30天</h1>
        <h2>瀏覽器數量百分比</h2>
        <div id="chart-container-1" />
        <div id="view-selector-container-1" />

        <h2>觀看地區數量百分比</h2>
        <div id="chart-container-2" />
        <div id="view-selector-container-2" />
      </div>
    );
  }
}
function mapStateToProps({ book }) {
  return { book };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1);
