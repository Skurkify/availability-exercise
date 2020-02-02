import React, { Component } from 'react';
import { fetchAvailability } from './services/fetchAvailability';
import { formatAvailabilitiesByAdvisor, AdvisorAvailability } from './formatters/availability';
import { formatAvailabilityDateTime } from './formatters/dates';

type Props = {}

type State = {
  today: string | undefined,
  availabilityByAdvisor: AdvisorAvailability[]
};

class App extends Component<Props, State> {
  state: State = {
    today: undefined,
    availabilityByAdvisor: []
  };

  componentDidMount() {
    this.fetchToday();
    this.fetchAvailability();
  }

  async fetchAvailability() {
    const availability = await fetchAvailability();
    const availabilityByAdvisor = formatAvailabilitiesByAdvisor(availability);
    this.setState({
      availabilityByAdvisor
    })
  }

  async fetchToday() {
    try {
      const res = await fetch("http://localhost:4433/today");
      const json = await res.json();
      this.setState({today: json.today});
    } catch (e) {
      console.error("Failed to fetch 'today' data", e);
    }
  }

  render() {
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <form id="name-form" className="col-md-6">
          <div className="form-group">
            <label htmlFor="name-field">Your Name</label>
            <input type="text" id="name-field" className="form-control" />
          </div>
        </form>

        <h2>Available Times</h2>
        <table className="advisors table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody>
            {this.state.availabilityByAdvisor.map((advisorAvailability) => {
              return (
                <tr key={advisorAvailability.advisorId}>
                  <td>{advisorAvailability.advisorId}</td>
                  <td>
                    <ul className="list-unstyled">
                      {advisorAvailability.availabilities.map((availability) => {
                        return (
                          <li key={availability.dateTime}>
                            <time dateTime={availability.dateTime} className="book-time">{formatAvailabilityDateTime(availability.dateTime)}</time>
                            <button className="book btn-small btn-primary">Book</button>
                          </li>
                        )
                      })}
                    </ul>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <h2>Booked Times</h2>
        <table className="bookings table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Student Name</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>36232</td>
              <td>John Smith</td>
              <td>
                <time dateTime="2019-04-03T10:00:00-04:00">4/3/2019 10:00 am</time>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
