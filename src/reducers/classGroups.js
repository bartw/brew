const classGroup = (state, action) => {
    switch (action.type) {
        case 'ADD_CLASSGROUP':
            return {
                id: action.id,
                name: action.name
            };
        default:
            return state;
    }
};

const classGroups = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CLASSGROUP':
            return [
                ...state,
                classGroup(undefined, action)
            ];
        default:
            return state;
    }
};

export default classGroups;