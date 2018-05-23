import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from "../../validation/is-empty";


class ProfileAbout extends Component{
    render(){

        //de-structure from the props we passed via parent (< Profile />)
        const { profile} = this.props;

        //              GET  FIRST NAME :
        // trim used to get rid of any spaces :
        // split from the space between first && last name
        // [0] == firstname

        const firstName = profile.user.name.trim().split(' ')[0];


        //              GET Skills ARRAY
        const skills = profile.skills.map((skill, index)=>(
           <div key={index} className='p-3'>
              <i key={index} className='fa fa-check'/>
               {skill}
           </div>
        ));


        return(
            <div className="row">
                <div className="col-md-12">

                    <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">{firstName}'s Bio</h3>

                        {/*Bio Stuff goes here*/}
                        {/*check to see if user made a bio*/}
                        <p className="lead">
                            {isEmpty(profile.bio) ? (<span>{firstName} does not have a bio.</span>): (<span>{profile.bio}</span>)}
                        </p>
                        <hr />


                        <h3 className="text-center text-info">Skill Set</h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                               {skills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ProfileAbout.propTypes={
    profile: PropTypes.object.isRequired
};

export default ProfileAbout