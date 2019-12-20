import React from "react";
import DashboardView from './DashboardView'


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    var token = "";
    if (JSON.parse(localStorage.getItem('user_info'))) {
      token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
    }

    this.state = {
      token: token,
    };
  }

  componentDidMount() {
    this.fetchOverviewStatistic();
    this.fetchTotalSellingBillTrendStatistic();
    this.fetchPaidSellingBillTrendStatistic();
    this.fetchSpendImportBillTrendStatistic();
  }

  fetchOverviewStatistic() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
    };

    return fetch(process.env.REACT_APP_API_URL + `/statistic/overview`, requestOptions)
      .then(res => {
        return res.text().then(text => {
          const data = text && JSON.parse(text);
          if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
          }
          return data;
        })
      })
      .then(statistic => {
        this.setState({
          ...statistic
        }, ()=>{console.log(this.state)});
      });
  }

  fetchTotalSellingBillTrendStatistic() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
    };

    return fetch(process.env.REACT_APP_API_URL + `/statistic/total-selling-bill-trend`, requestOptions)
      .then(res => {
        return res.text().then(text => {
          const data = text && JSON.parse(text);
          if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
          }
          return data;
        })
      })
      .then(trendData => {
        let total_selling_bill_trend = {
          labels: [],  
          series: [[]],  
        };

        trendData.map(v => {
          total_selling_bill_trend.labels.push(v.date);
          total_selling_bill_trend.series[0].push(v.total);
        })
   
        this.setState({
          total_selling_bill_trend
        });
      });
  }

  fetchPaidSellingBillTrendStatistic() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
    };

    return fetch(process.env.REACT_APP_API_URL + `/statistic/paid-selling-bill-trend`, requestOptions)
      .then(res => {
        return res.text().then(text => {
          const data = text && JSON.parse(text);
          if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
          }
          return data;
        })
      })
      .then(trendData => {
        let total_paid_trend = {
          labels: [],  
          series: [[]],  
        };

        trendData.map(v => {
          total_paid_trend.labels.push(v.date);
          total_paid_trend.series[0].push(v.total_paid);
        })
   
        this.setState({
          total_paid_trend
        });
      });
  }

  fetchSpendImportBillTrendStatistic() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
    };

    return fetch(process.env.REACT_APP_API_URL + `/statistic/spend-import-bill-trend`, requestOptions)
      .then(res => {
        return res.text().then(text => {
          const data = text && JSON.parse(text);
          if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
          }
          return data;
        })
      })
      .then(trendData => {
        let total_spend_trend = {
          labels: [],  
          series: [[]],  
        };

        trendData.map(v => {
          total_spend_trend.labels.push(v.date);
          total_spend_trend.series[0].push(v.total_spend);
        })
   
        this.setState({
          total_spend_trend
        });
      });
  }
  
  render() {
    return (
      <DashboardView
        totalUser={this.state.total_user}
        totalSellingBill={this.state.total_selling_bill}
        totalSpend={this.state.total_spend}
        totalPaid={this.state.total_paid}

        totalSellingBillTrend={this.state.total_selling_bill_trend}
        totalPaidTrend={this.state.total_paid_trend}
        totalSpendTrend={this.state.total_spend_trend}
      />
    );
  }
}