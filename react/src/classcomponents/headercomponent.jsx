import React, { Component } from 'react'


class HeaderComponent extends Component {
    constructor(props)  {
        super(props);
        this.state = {};
    }

    render()    {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header" style={{'font-weight': 'bold'}}>
                    <a className="navbar-brand" href="#">{this.props.name}: </a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar" style={{'font-weight': 'bold'}}>
                    {/* <ul className="nav navbar-nav navbar-right">
                        <li><a href="about.php"><span className="glyphicon glyphicon-tag"></span> About Us</a></li>
                        <li><a href="signup.php"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                        <li><a href="login.php"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul> */}
                </div>
            </div>
        </nav>
        );
    }
}

export default HeaderComponent;