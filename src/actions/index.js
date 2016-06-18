let nextClassGroupId = 0;

export const addClassGroup = (name) => {
    return {
        type: 'ADD_CLASSGROUP',
        id: nextClassGroupId++,
        name
    };
};