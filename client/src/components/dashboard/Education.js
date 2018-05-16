import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component{

    onDeleteClick(id){
        this.props.deleteEducation(id); //removed this.props.history
    };

    render(){

        const education = this.props.education.map(edu=> (

            <tr tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                {/*<td>{exp.from} - {exp.to}</td>*/} {/* wiped out this line : using moment to format date*/}

                <td>
                    <Moment format ="MM/DD/YYYY">
                        {edu.from}
                    </Moment>
                    {' '} - {' '}
                    {edu.to === null ? ('Now'): <Moment format ="MM/DD/YYYY">{edu.to}</Moment>}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, edu._id)}
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
                    Education Credentials
                    <table className='table'>
                        <thread>
                            <tr>
                                <th>School</th>
                                <th>Degree</th>
                                <th>Years</th>
                            </tr>
                            {education}
                        </thread>
                    </table>
                </h6>
            </div>
        )
    }
}

Education.propTypes={
    deleteEducation: PropTypes.func.isRequired
};

//NOTE: since sub comp, do not need to mapState

export default connect(null, { deleteEducation })(Education)