import React from 'react';
import { connect } from 'react-redux';
import { addClassGroup } from '../actions';

let AddClassGroup = ({ dispatch }) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addClassGroup(input.value))
                input.value = ''
            } }>
                <input ref={node => {
                    input = node
                } } />
                <button type="submit">
                    Add Class Group
                </button>
            </form>
        </div>
    );
};

AddClassGroup = connect()(AddClassGroup);

export default AddClassGroup;