import React, { Component } from 'react';
import { fetchAvailability, Availability } from './services/availability';
import { formatAvailabilitiesByAdvisor, AdvisorAvailability } from './formatters/availability';
import { formatAvailabilityDateTime } from './formatters/dates';
import { Booking, fetchBookings, createBooking } from './services/bookings';

type Props = {}

type State = {
  today: string | undefined,
  availabilityByAdvisor: AdvisorAvailability[],
  bookings: Booking[],
  name: string
};

class App extends Component<Props, State> {
  state: State = {
    today: undefined,
    availabilityByAdvisor: [],
    bookings: [],
    name: "",
  };

  componentDidMount() {
    this.fetchToday();
    this.fetchAvailability();
    this.fetchBookings();
  }

  async fetchAvailability() {
    const availability = await fetchAvailability();
    const availabilityByAdvisor = formatAvailabilitiesByAdvisor(availability);
    this.setState({
      availabilityByAdvisor
    })
  }

  async fetchBookings() {
    const bookings = await fetchBookings();
    this.setState({
      bookings
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

  createBooking = async (availability: Availability) => {
    const {name} = this.state;

    if (!name) {
      alert("Please Enter your name before booking");
    }

    try {
      await createBooking({
        studentName: name,
        advisorId: availability.advisorId,
        dateTime: availability.dateTime
      });
      this.fetchAvailability();
      this.fetchBookings();
    } catch (e) {
      alert("Failed to create booking");
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
            <input
              type="text"
              id="name-field"
              className="form-control"
              value={this.state.name}
              onChange ={(event) => {
                this.setState({
                  name: event.currentTarget.value
                })
              }}
            />
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
                            <button
                              className="book btn-small btn-primary"
                              onClick={() => {
                                this.createBooking(availability);
                              }}
                            >Book</button>
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
            {
              this.state.bookings.map((booking) => {
                return (
                  <tr key={booking.advisorId+booking.dateTime}>
                    <td>{booking.advisorId}</td>
                    <td>{booking.studentName}</td>
                    <td>
                      <time dateTime={booking.dateTime}>{formatAvailabilityDateTime(booking.dateTime)}</time>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
