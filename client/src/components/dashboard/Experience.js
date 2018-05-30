import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component{

    onDeleteClick(id){
        this.props.deleteExperience(id); //removed this.props.history
    };

    render(){

        const experience = this.props.experience.map(exp=> (

            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                {/*<td>{exp.from} - {exp.to}</td>*/} {/* wiped out this line : using moment to format date*/}

                <td>
                    <Moment format ="MM/DD/YYYY">
                        {exp.from}
                    </Moment>
                    {' '} - {' '}
                    {exp.to === null ? ('Now'): <Moment format ="MM/DD/YYYY">{exp.to}</Moment>}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, exp._id)}
                        className='btn btn-danger'
                    >
                        Delete
                    </button>
                </td>
            </tr>

        ));

        return(
            <div>
                <h6 className='mb-4'>
                    Experience Credentials
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Years</th>

                            </tr>
                            {experience}
                        </thead>
                    </table>
                </h6>
            </div>
        )
    }
}

Experience.propTypes={
    deleteExperience: PropTypes.func.isRequired
};

//NOTE: since sub comp, do not need to mapState

export default connect(null, { deleteExperience })(Experience) //removed (withRouter(Experience)