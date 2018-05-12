import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom'


class Dashboard extends Component{

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    render() {

        const {user} = this.props.auth;
        const {profile, loading } = this.props.profile;

        let dashboardContent; //init this var for checking if profile == null

        //renders Loading....
        if(profile == null || loading){
            dashboardContent = <Spinner/>
        }
        else{
            //Check to see if the logged in user has profile data

            //is the obj empty?
            if(Object.keys(profile).length > 0){
                dashboardContent = <h4> TODO : DISPLAY A PROFILE </h4>
            }
            else{
                //here, the user is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className='lead text-muted'>Welcome {user.name}</p>

                        <p>You have not set up a profile, please add some info.</p>

                        <Link to= "/create-profile" className='btn btn-lg btn-info'>
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }

        return(
            <div className='dashboard'>
              <div className='container'>
                  <div className='row'>
                      <div className='col-md-12'>
                          <h1 className='display-4'>
                             <h1> Dashboard</h1>
                          </h1>

                          {dashboardContent}

                      </div>
                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    auth: state.auth,
    profile: state.profile,
});

Dashboard.propTypes = {

    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired
};


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)