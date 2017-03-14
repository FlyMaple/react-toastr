import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/styles';
import Toastr, { toastr } from './Toastr'

const initState = {

}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = initState
    }
    
    handleSuccess = () => {
        toastr.success('Success Title', 'This is Success Content!')
    }
    
    handleInfo = () => {
        toastr.info('Info Title', 'This is Info Content!')
    }
    
    handleWarn = () => {
        toastr.warn('Warn Title', 'This is Warn Content!')
    }
    
    handleError = () => {
        toastr.error('Error Title', 'This is Error Content!')
    }
    
    handleLight = () => {
        toastr.light('Light Title', 'This is Light Content!')
    }

    render() {
        return (
            <div id="app">
                <Toastr />

                <SyntaxHighlighter language="javascript" style={obsidian}>{
`/**
 * @param { string } title - Toastr title
 * @param { message } message - Toastr message
 * @param { object } options - Toastr options
 */`
                }</SyntaxHighlighter>

                <div className="sample">
                    <button onClick={ this.handleSuccess }>toastr.success( ... )</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.success('Success Title', 'This is Success Content!')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ this.handleInfo }>toastr.info( ... )</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.info('Info Title', 'This is Info Content!')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ this.handleWarn }>toastr.warn( ... )</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.warn('Warn Title', 'This is Warn Content!')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ this.handleError }>toastr.error( ... )</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.error('Error Title', 'This is Error Content!')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ this.handleLight }>toastr.light( ... )</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.light('Light Title', 'This is Light Content!')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                     <button onClick={ () => {
                        toastr.success()
                    } }>without params</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.success()`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ () => {
                        toastr.success('Message...')
                    } }>without title</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
`toastr.success('Message...')`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ () => {
                        toastr.success('Message...', { progress: true })
                    } }>with progress</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
                    `toastr.success('Message...', { progress: true })`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ () => {
                        toastr.success('Message...', { progress: true, timeout: 5000 })
                    } }>with timeout</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
                    `toastr.success('Message...', { progress: true, timeout: 5000 })`
                    }</SyntaxHighlighter>
                </div>

                <div className="sample">
                    <button onClick={ () => {
                        toastr.success('Title', 'Message...', { progress: true, timeout: 5000 })
                    } }>all param</button>
                    <SyntaxHighlighter language="javascript" style={obsidian}>{
                    `toastr.success('Title', 'Message...', { progress: true, timeout: 5000 })`
                    }</SyntaxHighlighter>
                </div>
            </div>
        );
    }
}

export default App;