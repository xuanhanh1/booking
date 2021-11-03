import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import doctor from '../../assets/images/doctorlogin.png';
import loginbackground from '../../assets/images/loginbackground.png';
import background from '../../assets/images/wave.png';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();

        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    onHandleLogin = async (event) => {
        // event.preventDefault()
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.maloi !== 0) {
                this.setState({
                    errMessage: data.thongbao
                })
            }
            if (data && data.maloi === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.thongbao
                    })
                }
            }

        }
    }
    render() {
        return (
            <div>
                <img className="wave" src={background} />
                <div className="container">
                    <div className="img">
                        <img src={loginbackground} />
                    </div>
                    <div className="login-content">
                        <img src={doctor} />
                        <h2 className="title">Login</h2>
                        <div className="input-div one">

                            <div className="div">
                                <h5>Username:</h5>
                                <input type="text" className="input"
                                    value={this.state.username}
                                    onChange={(event) => { this.onChangeUsername(event) }}
                                />
                            </div>
                        </div>
                        <div className="input-div pass">

                            <div className="div">
                                <h5>Password:</h5>
                                <input type={this.state.isShowPassword ? "password" : "text"} className="input"
                                    value={this.state.password}
                                    onChange={(event) => { this.onChangePassword(event) }}
                                />
                                {this.state.isShowPassword ?
                                    <i class="fas fa-eye-slash" onClick={() => { this.onShowPassword() }}></i> :
                                    <i class="fas fa-eye" onClick={() => { this.onShowPassword() }}></i>}

                            </div>
                        </div>
                        <div className="error">
                            <span>{this.state.errMessage}</span>
                        </div>
                        <a href="#">Forgot Password?</a>
                        <button className="btn-header"
                            onClick={(event) => { this.onHandleLogin(event) }}
                        >Login</button>



                        <div className="login-with-fa">
                            <i className="fab fa-facebook icon-fa"></i>
                            <i className="fab fa-google-plus-g icon-go"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userinInfo) => dispatch(actions.userLoginSuccess(userinInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
