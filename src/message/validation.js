export default {
    email: {
        notEmpty: 'Please enter email address.',
        format: 'The email address you entered is invalid. Make sure that it is typed correctly.',
        len: ' Email address length cannot exceed more than 50 characters',
    },
    password: {
        notEmpty: 'Please provide password.',
        pattern: 'Password should contain one capital and one numeric or special character. ',
        length: 'Password should be between 8 and 15 characters.',
    },
    username: {
        type: 'name should start with a letter.',
        length: 'name should be between 3 and 60 characters.',
        notEmpty: 'Please enter name.',
        required: 'name is required',
    },
    string: {
        type: ' should start with a letter.',
        required: ' is required.',
    },
    int: {
        empty: ' is required and must be valid.',
    },
    bool: {
        type: ' must be a boolean.',
        required: ' is required.',
    },
    id: {
        empty: 'Please provide valid ID.',
    },
    upload: {
        type: 'File data should be in string type.',
        notEmpty: 'empty file data',
        required: ' file data is required',
    },
    fileType: {
        type: 'fileType is required',
        enum: 'Invalid file type.',
    },
    fromWeb: {
        type: 'From web must be a boolean.',
    },
};
