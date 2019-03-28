import React from 'react';
import RequestController from '../service/RequestController';
import {Row, Col} from 'react-flexbox-grid';

export default class ChildCheckOut extends React.Component {
    checkOut = () => {
        RequestController.checkOut(this.props.child.childId).then(response => {
            this.props.updateChildren();
            this.props.close();
        }).catch(error => {
            console.log(error);
            this.props.catchError();
            this.props.close();
        });
    };

    render() {
        return (
            <div className="checkOut">
                <div className="checkOut-info">
                    <div className="checkOut-info-avatar">
                        <img className="children-card__avatar-photo" src={this.props.child.image.small}
                             alt={this.props.child.name.fullName}/>
                    </div>
                    <div className="checkOut-info-text">
                        <h2>{this.props.child.name.fullName}</h2>
                    </div>
                </div>
                <div>
                    <Row>
                        <Col xs={6} className="center">
                            <button className="button--blue-border" onClick={this.props.close}>CANCEL</button>
                        </Col>
                        <Col xs={6} className="center">
                            <button className="button--blue-full" onClick={this.checkOut}>SIGN OUT</button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}