import React, { PropTypes } from 'react';
import ClassGroup from './ClassGroup';

const ClassGroups = ({ classGroups }) => (
    <ul>
        {classGroups.map(classGroup =>
            <ClassGroup
                key={classGroup.id}
                {...classGroup}
                />
        ) }
    </ul>
);

ClassGroups.propTypes = {
    classGroups: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ClassGroups;