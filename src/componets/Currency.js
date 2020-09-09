import React, { Component } from "react";
import axios from "axios";
import  '../css/currency.css'
class Currency extends Component {
  constructor(props) {
    super(props);
    this.selectFrom = this.selectFrom.bind(this);
    this.selectTo = this.selectTo.bind(this);
    this.calculate = this.calculate.bind(this);

    this.state = {
      currencyinfo: [],
      fromSelect: "",
      toSelect: "",
      amount: "",
      finalAmount: "",
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  getCurrency() {
    axios
      .get("http://localhost:3000/getExchngeCurrencies")
      .then((result) => {
        this.setState({ currencyinfo: result.data });
      })
      .catch((err) => {});
  }
  selectFrom(e) {
    this.setState({ fromSelect: e.target.value });
  }

  selectTo(e) {
    this.setState({ toSelect: e.target.value });
  }
  calculate(e) {
    let final;
    this.state.currencyinfo.map((lp) => {
      if (lp.currency === this.state.fromSelect) {
        final = lp[this.state.toSelect];
      }
    });
    this.setState({ finalAmount: (final * e.target.value).toFixed(2) });
  }

  render() {
    const selection = this.state.currencyinfo.map((res) => {
      return (
        <option key={res._id} value={res.currency}>
          {res.description}
        </option>
      );
    });

    return (
      <div className='col-6 cur'>
          <h1>Currency Converter</h1>
          <div className='form-group'>
          <select className='form-control' onChange={this.selectFrom}>{selection}</select>

          </div>
          <div className='form-group'>
          <select className='form-control' onChange={this.selectTo}>{selection}</select>

          </div>
          <div className='form-group'>
          <input  className='form-control' type="number" placeholder='Enter Amount' onChange={this.calculate} />

          </div>

        <span className='form-group'>
          Amount from {this.state.fromSelect} is {this.state.finalAmount}{" "}
          {this.state.toSelect}
        </span>
      </div>
    );
  }
}

export default Currency;
