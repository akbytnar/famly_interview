import React from 'react';
import Modal from 'react-modal';
import ChildCheckIn from '../ChildCheckIn/ChildCheckIn';
import ChildCheckOut from '../ChildCheckOut/ChildCheckOut';
import puzzleIn from '../images/puzzle_in.png';
import puzzleOut from '../images/puzzle_out.png';
import {Col} from 'react-flexbox-grid';

export default class ChildrenItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalError: false,
            showModalIn: false,
            showModalOut: false
        };
    }

    handleOpenModal = () => {
        this.props.child.checkedIn ? this.setState({showModalOut: true}) : this.setState({showModalIn: true});
    };

    handleCloseModal = () => {
        this.props.child.checkedIn ? this.setState({showModalOut: false}) : this.setState({showModalIn: false});
    };
    catchError = () => {
      this.setState({showModalError: true});
    };
    closeError = () => {
        this.setState({showModalError: false});
    };

    render() {
        return (
            <Col xs={6} md={3}>
                <div className="children-card">
                    <div className="children-card__avatar" onClick={this.handleOpenModal}>
                        <img className="children-card__avatar-icon"
                             src={this.props.child.checkedIn ? puzzleIn : puzzleOut}
                             alt={this.props.child.name.firstName}/>
                        <img className="children-card__avatar-photo" src={this.props.child.image.small}
                             alt={this.props.child.name.fullName}/>
                    </div>
                    <div className="children-card__text">
                        <h2 className={this.props.child.checkedIn ? "color-green" : "color-blue"}>{this.props.child.name.firstName}</h2>
                        <h2 className={this.props.child.checkedIn ? "color-green" : "color-blue"}>{this.props.child.name.lastName}</h2>
                    </div>
                </div>
                <Modal ariaHideApp={false} isOpen={this.state.showModalIn} onRequestClose={this.handleCloseModal}
                       child={this.props.child}  className="Modal modal-in" overlayClassName="Overlay">
                    <ChildCheckIn child={this.props.child} close={this.handleCloseModal}
                                  updateChildren={this.props.updateChildren} catchError={this.catchError}/>
                </Modal>
                <Modal ariaHideApp={false} isOpen={this.state.showModalOut} onRequestClose={this.handleCloseModal}
                       child={this.props.child} className="Modal modal-out" overlayClassName="Overlay">
                    <ChildCheckOut catchError={this.catchError} child={this.props.child} updateChildren={this.props.updateChildren}
                                   close={this.handleCloseModal}/>
                </Modal>
                <Modal ariaHideApp={false} isOpen={this.state.showModalError}
                       className="Modal modal-error center" overlayClassName="Overlay">
                    <h2>Sorry sth went wrong :( </h2>
                        <button className="m-t-30 button--red-border" onClick={this.closeError}>CLOSE</button>
                </Modal>
            </Col>
        )
    }
}