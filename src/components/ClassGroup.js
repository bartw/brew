import React, { PropTypes } from 'react';

const ClassGroup = ({ name }) => (
    <li>
        {name}
    </li>
);

ClassGroup.propTypes = {
    name: PropTypes.string.isRequired
};

export default ClassGroup;