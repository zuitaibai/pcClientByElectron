import React, { Component } from 'react';

const events = window.require('events');
//const path = window.require('path');
//const fs = window.require('fs');

const electron = window.require('electron');
//const {ipcRenderer, shell} = electron;
const {dialog} = electron.remote;

const request = window.require('request');
require('request-debug')(request);

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

import '../../assets/css/app.css';
import './login.css';
import util from '../../util/index'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            open: false,
            Transition: null,
            msg: ''
        };
    }
    _reset(){ this.setState({ userName: '', password: '' }); }
    handleClose(){ this.setState({ open: false }); }
    txt1Change(e){ this.setState({ userName: e.target.value }); }
    txt2Change(e){ this.setState({ password: e.target.value }); }
    _login() {
        let options = {
            type: 'info',
            buttons: ['确定'],
            title: '登录',
            message: this.state.userName,
            defaultId: 0,
            cancelId: 0
        };
        /*dialog.showMessageBox(options, (response) => {
            if (response == 0) {
            }
        });*/
        let u = this.state.userName, p = this.state.password;
        if(!u || !p){
            this.setState({ msg:u?'请填写密码':'请填写用户名',open: true, Transition: propss => <Slide {...propss}  direction="left" /> });
            return;
        }
        request.post(util.api.login, {form:{
                cellPhone: '15220232302',
                password: '235231223',
                platId: 1,
                token: 'CharacterEncodingFilter',
                clientVersion: '3500',
                pcUniteSign: ''
            }}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        });
    }

    render() {
        const styles = {
            button: {
                color: '#fff',
                marginLeft: 20
            }
        };
        return (
            <div className="login-w">
                <div className="login">
                    <TextField
                        label="用户名"
                        placeholder="邮箱/手机"
                        margin="normal"
                        value={this.state.userName}
                        fullWidth
                        className="fs-f"
                        onChange={this.txt1Change.bind(this)}
                    />
                    <TextField
                        label="密码"
                        placeholder="密码"
                        type="password"
                        value={this.state.password}
                        margin="normal"
                        fullWidth
                        className="fs-f"
                        onChange={this.txt2Change.bind(this)}
                    />
                    <Snackbar
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        TransitionComponent={this.state.Transition}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={(
                            <span id="message-id">
                                {this.state.msg}
                            </span>
                        )}
                    />
                    <div className="login-foot">
                        <Button variant="contained" onClick={this._reset.bind(this)}>
                            重置
                        </Button>
                        <Button variant="contained" color="primary" style={styles.button} onClick={this._login.bind(this)}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


