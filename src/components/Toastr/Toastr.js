import React, { Component, PropTypes } from 'react';
import classNames from 'classnames'
import { connect } from 'react-redux'

import '../../../public/css/toastr.css'

import * as actions from './actions'
import { EE } from './functions'
import ToastrBox from './ToastrBox'

class Toastr extends Component {
    static propTypes = {
        timeout: PropTypes.number,
        progress: PropTypes.bool,
        position: PropTypes.string,
        transitionIn: PropTypes.string,
        transitionOut: PropTypes.string
    }

    static defaultProps = {
        timeout: 3000,
        progress: false,
        position: 'top-right',
        transitionIn: 'bounceIn',
        transitionOut: 'bounceOut'
    }

    /**
     * 透過 EventEmitter 來完成對外公開API，
     * 可透過定義直接呼叫回 React Component 執行 dispatch
     */
    componentDidMount() {
        const { position, addToastr } = this.props
        const newestOnTop = (position === 'top-left') || (position === 'top-right')
        
        EE.on('add/toastr', (args) => {
            const [ type, title, message, options ] = args
            addToastr({
                type,
                title,
                message,
                options,
                newestOnTop
            })
        })
    }
    
    render() {
        return (
            <div id="toastr_container" className={ classNames('toastr_container', this.props.position) }>
                {
                    this.props.toastrs.map(toastr => {
                        return <ToastrBox key={ toastr.id } toastr={ toastr } { ...this.props } />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toastrs: state.toastrReducers.toastrs
    }
}

/**
 * 若不實做 mapDispatchToProps，
 * 直接傳入 ActionCreator，會自動實現 dispatch
 */
export default connect(mapStateToProps, actions)(Toastr);