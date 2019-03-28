import React from 'react';
import ChildItem from '../ChildItem/ChildItem';
import {Row, Grid} from 'react-flexbox-grid';
import RequestController from "../service/RequestController";

export default class ChildrenList extends React.Component {
    constructor() {
        super();
        this.state = {
            children: [],
            error: false
        };
    }

    componentDidMount() {
        this.getChildren();
    }

    getChildren = () => {
        RequestController.getChildren().then(response => {
            this.setState({
                children: response
            })
        }).catch(error => {
            console.log(error);
            this.setState({error: true});
        });
    };
    render() {
        let childrenList = this.state.children.map(child => <ChildItem key={child.childId} child={child}
                                                                       updateChildren={this.getChildren}> {child.name.fullName}</ChildItem>);
        return (
            <div>

                <Grid fluid>
                    <Row>
                        {childrenList}
                    </Row>
                </Grid>
                {this.state.error &&
                <h2 className="errorMsg">Sorry sth went wrong :( </h2>}
            </div>
        )
    }
}