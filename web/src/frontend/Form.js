import React, {Component} from 'react';

import axios from 'axios';

import "./Form.css"

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: '',
      positionY: '',
      points: '',
      radius: '',
      height: '',
      size: '',
      laps: ''
    }
  }

  execPhotogrammetry(event) {
    console.log('hola');
    axios.post(
      'http://192.168.241.1:3001/api/excPhotogrammetry',
      {
        iDFile: "ImagesDron"
      }
    )
    .then(function (response) {
      // if(response.data.status == 'OK')
        // Alert.alert('Process completed.');
      // else 
        // Alert.alert('Process not completed.');
    })
    .catch(function (error) {
      console.log(error);
    })
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    const {
      positionX,
      positionY,
      points,
      radius,
      height,
      size,
      laps
    } = this.state;
    alert(`${positionX}, ${positionY}, ${points}, ${radius}, ${height}, ${size}, ${laps}`);
    event.preventDefault();
  }

  render() {
    const {
      positionX,
      positionY,
      points,
      radius,
      height,
      size,
      laps
    } = this.state;
    return (
      <div className="containerBody">
        <form className="containerForm">
          <div className="input">
            <label className="label">Position X:
            </label>
            <input className="inputContent" type="number" name="positionX"
              value={positionX}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Position Y:
            </label>
            <input className="inputContent" type="number" name="positionY"
              value={positionY}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Points:
            </label>
            <input className="inputContent" type="number" name="points"
              value={points}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Radius:
            </label>
            <input className="inputContent" type="number" name="radius"
              value={radius}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Height:
            </label>
            <input className="inputContent" type="number" name="height"
              value={height}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Size:
            </label>
            <input className="inputContent" type="number" name="size"
              value={size}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <div className="input">
            <label className="label">Laps:
            </label>
            <input className="inputContent" type="number" name="laps"
              value={laps}
              onChange={
                this.handleChange.bind(this)
              }/>
          </div>
          <button className="button" type="submit">Send parameters</button>
          <button className="button" onClick={this.execPhotogrammetry.bind(this)}>Execute photogrammetry</button>
        </form>
        
      </div>
    )
  }
}

export default Form;
