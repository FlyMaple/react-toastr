import React, { Component } from 'react';
import classNames from 'classnames'
import CSSCore from 'fbjs/lib/CSSCore';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

import '../../../plugins/animate.css'

/**
 * 因 Toastr 渲染 ToastrBox 時將 { ...this.props } 全數傳入，
 * 所以 ToastrBox 擁有 react-redux connect 所連結過的 this.props.dispatch
 * 
 * Toastr 採用非重複渲染的做法，直接對 vDOM 做操作，所以不實做 this.state
 */
class ToastrBox extends Component {
    constructor (props) {
        super(props)
        this.toastr = props.toastr
        this.options = this.validOptions(props.toastr.options)
        this.timeoutId = null
    }

    /**
     * ToastrBox 渲染完畢後綁定 transition 結束事件，並設定消失事件
     */
    componentDidMount() {
        const { box } = this.refs
        
        this.onTransitionEnd(box, this.onAnimateComplete)
        this.setBoxTimeoutHide()
    }

    /**
     * 綁定 transition 結束後的動作
     * @param { object } node - 透過 this.refs 來的 vDOM
     * @param { function } callback - transition 執行完畢後的 callback
     */
    onTransitionEnd = (node, callback) => {
        ReactTransitionEvents.removeEndEventListener(node, callback)
        ReactTransitionEvents.addEndEventListener(node, callback)
    }

    /**
     * transition 結束後的 callback
     * ToastrBox 上擁有兩種類型的 event: animationend、transitionend
     * 這邊要針對 animationend(animate.css) 去作邏輯處理
     * transitionend 是 css 作一般特效所用
     * 
     * ToastrBox 顯示後，開始執行進度條倒數
     * ToastrBox 消失後，執行 redux 的 remove 動作
     */
    onAnimateComplete = (e) => {
        if (e.type === 'animationend') {
            if (this.timeoutId) {
                CSSCore.removeClass(this.refs.box, this.options.transitionIn)

                this.startReciprocal()
            } else {
                this.props.removeToastr(this.toastr)
            }
        }
    }

    /**
     * 設定 ToastrBox 多久執行消失動作
     * 1. 套用 animate.css 的消失動作
     * 2. 綁定 animate 結束後的動作
     */
    setBoxTimeoutHide = () => {
        const { box } = this.refs

        this.timeoutId = setTimeout(() => {
            this.setBoxHide()
            this.onTransitionEnd(box, this.onAnimateComplete)
        }, this.options.timeout)
    }

    /**
     * 套用 animate.css 的消失動作
     */
    setBoxHide = () => {
        this.timeoutId = null
        CSSCore.addClass(this.refs.box, this.options.transitionOut)
    }

    /**
     * Toastr 全域設定 整併 單一 ToastrBox 設定
     */
    validOptions = (options = {}) => {
        return {
            progress: options.progress || this.props.progress,
            timeout: options.timeout || this.props.timeout,
            transitionIn: options.transitionIn || this.props.transitionIn,
            transitionOut: options.transitionOut || this.props.transitionOut
        }
    }

    /**
     * 滑鼠移入，重設進度條倒數，並停止消失時間動作
     */
    onMouseEnter = () => {
        this.resetProgress()
        clearTimeout(this.timeoutId)
    }

    /**
     * 滑鼠移出，執行進度條倒數，並重設消失時間動作
     */
    onMouseLeave = () => {
        this.startReciprocal()
        this.setBoxTimeoutHide()
    }

    /**
     * 重設進度條
     */
    resetProgress = () => {
        const { progress } = this.refs

        if (progress) {
            progress.style.transition = 'inherit'
            progress.style.width = '100%'
        }
    }

    /**
     * 進度條倒數
     */
    startReciprocal = () => {
        const { progress } = this.refs

        if (progress) {
            progress.style.transition = `all ${ this.options.timeout / 1000 }s linear`
            progress.style.width = '0%'
        }
    }

    /**
     * 關閉按鈕事件
     */
    handleBoxClose = () => {
        const { box } = this.refs
        
        this.setBoxHide()
        this.onTransitionEnd(box, this.onAnimateComplete)
    }

    /**
     * 樣式
     */
    getBoxStyle = () => {
        const { toastr } = this

        return classNames('toastr_box', toastr.type, 'animated', this.options.transitionIn)
    }
    
    render() {
        const { toastr } = this

        return (
            <div ref="box" 
                    className={ this.getBoxStyle() }
                    onMouseEnter={ this.onMouseEnter }
                    onMouseLeave={ this.onMouseLeave }>

                <i className="material-icons toastr_close" onClick={ this.handleBoxClose }>close</i>
                {
                    toastr.title ?
                    <div className="toastr_title">{ toastr.title }</div> :
                    null
                }
                <div className="toastr_content">{ toastr.message }</div>
                {
                    this.options.progress ?
                    <div ref="progress" className="toastr_progress"></div> :
                    null
                }
            </div>
        );
    }
}

export default ToastrBox;