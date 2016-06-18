import { connect } from 'react-redux';
import ClassGroups from '../components/ClassGroups';

const mapStateToProps = (state) => {
    return {
        classGroups: state.classGroups
    };
};

const ClassGroupList = connect(
    mapStateToProps
)(ClassGroups);

export default ClassGroupList;