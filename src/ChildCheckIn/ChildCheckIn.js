import React from 'react';
import RequestController from '../service/RequestController';
import {Row, Col} from 'react-flexbox-grid';
export default class ChildCheckIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: {
                h: '',
                m: ''
            },
            currentTime: {
                h: '',
                m: ''
            },
            hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            minutes: [0, 15, 30, 45],
        };
    }

    componentDidMount() {
        this.setMinutes();
    }

    setMinutes = () => {
        let currentH = this.state.date.getHours();
        if (this.state.date.getMinutes() <= 15) {
            this.setState({time: {m: 0, h: currentH}, currentTime: {m: 0, h: currentH}});
            return;
        }
        if (this.state.date.getMinutes() <= 30) {
            this.setState({time: {m: 15, h: currentH}, currentTime: {m: 15, h: currentH}});
            return;
        }
        if (this.state.date.getMinutes() <= 45) {
            this.setState({time: {m: 30, h: currentH}, currentTime: {m: 30, h: currentH}});
            return;
        }
        this.setState({time: {m: 45, h: currentH}, currentTime: {m: 45, h: currentH}});
    };

    checkIn = () => {
        let timeToSent = this.state.time.h + ":" + this.state.time.m;
        RequestController.checkIn(this.props.child.childId, timeToSent).then(response => {
                this.props.updateChildren();
                this.props.close();
        }).catch(error => {
            console.log(error);
            this.props.catchError();
            this.props.close();
        });

    };

    handleHourChange = (e) => {
        this.setState({time: {h: e.target.value, m: this.state.time.m}})
    };

    handleMinuteChange = (e) => {
        this.setState({time: {m: e.target.value, h: this.state.time.h}})
    };

    render() {
        return (
            <div className="checkIn">
                <Row>
                    <Col xs={12}  className="center">
                        <div><img className="children-card__avatar-photo" src={this.props.child.image.small}
                                  alt={this.props.child.name.fullName}/>
                            <h2>{this.props.child.name.fullName}</h2>
                            <p>Choose when {this.props.child.name.firstName} will be picked up: at {this.state.time.h} : {this.state.time.m}</p>
                        </div>

                    </Col>
                    <Col xs={12} className="center">
                        <div className="checkIn-selectBox">
                            <select value={this.state.time.h} onChange={this.handleHourChange} className="form-control">
                                {this.state.hours.map(option => {
                                    return <option value={option} key={option}
                                                   disabled={this.state.currentTime.h > option}>{option}</option>
                                })}
                            </select> :
                            <select value={this.state.time.m} onChange={this.handleMinuteChange} className="form-control">
                                {this.state.minutes.map(option => {
                                    return <option value={option} key={option}
                                                   disabled={(this.state.currentTime.h === this.state.time.h) && (this.state.currentTime.m > option)}>{option}</option>
                                })}
                            </select>
                        </div>
                    </Col>
                    <Col xs={6} md={6} className="center m-t-30">
                        <button className="button--green-border" onClick={this.props.close}>CANCEL</button>
                    </Col>
                    <Col xs={6} md={6} className="center m-t-30">
                        <button className="button--green-full" onClick={this.checkIn}>SIGN IN</button>
                    </Col>
                </Row>
            </div>
        )
    }
}