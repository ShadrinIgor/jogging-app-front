import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class App extends Component {
    componentWillMount() {
        // this.props.getMainListActions();
    }

    render() {
        return <div>First start</div>
    }
}

export default connect(
    state => ({
        main_list: state.main,
        content: state.content
    }),
    dispatch => ({
/*        getMainListActions: () => {
            dispatch(getMainList());
        },
        getContentActions: (menu_id) => {
            dispatch(getContent(menu_id));
        },
        updateCards: (list)=> {
            dispatch(updateCards(list));
        }*/
    })
)(App);
