export const signUpFeilds = [
    {
        label: 'First Name',
        name: 'firstName',
        value: '',
        placeholder: 'Enter your First Name',
        type: 'text',
        isRequired: true,
        formType: ['Add', 'Edit', 'Signup', 'admin'],
        validations: {required: 'This field is required', minLength:{value:3, message:'Minimum 3 characters required'}, maxLength: {value:20, message:'Maximum 20 characters'}}
    },
    {
        label: 'Last Name',
        name: 'lastName',
        value: '',
        placeholder: 'Enter your Last Name',
        type: 'text',
        isRequired: true,
        formType: ['Add', 'Edit', 'Signup', 'admin'],
        validations: {required: 'This field is required', minLength:{value:3, message:'Minimum 3 characters required'}, maxLength: {value:20, message:'Maximum 20 characters'}}
    },
    {
        label: 'Email',
        name: 'email',
        value: '',
        placeholder: 'Enter your email',
        type: 'text',
        isRequired: true,
        formType: ['Add', 'Edit', 'Signup', 'admin'],
        validations: {required: 'This field is required', pattern:{value: /\S+@\S+\.\S+/, message: 'This is not a valid email'}}
    },
    {
        label: 'Phone',
        name: 'phone',
        value: '',
        placeholder: 'Enter your phone number',
        type: 'text',
        isRequired: true,
        formType: ['Add', 'Edit', 'Signup', 'admin'],
        validations: {required: 'This field is required', pattern: {value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, message:'This field is invalid'}, maxLength: {value:12, message:'Maximum 12 characters'}}
    },
    {
        label: 'Password',
        name: 'password',
        value: '',
        type: 'password',
        placeholder: 'Set your password',
        isRequired: true,
        formType: ['Add', 'Signup'],
        validations: {required: 'This field is required',minLength:{value:8, message:'Minimum 8 characters required'}, maxLength: {value:20, message:'Maximum 20 characters'}}
    },
    {
        label: 'Confirm Password',
        name: 'cpwd',
        value: '',
        type: 'text',
        formType: ['Add', 'Signup'],
        placeholder: 'Confirm Password',
        isRequired: true,
        validations: {
            required: 'This field is required',
            validate: (val, watch) => {
                if (watch.password != val) {
                    return "Your passwords do no match";
                }
            },
        }
    },
    {
        label: 'What best describes you?',
        name: 'role',
        value: '',
        type: 'select',
        formType: ['Add', 'Edit', 'Signup', 'admin'],
        options:[{label: 'Job Seeker', value: 'jobSeeker'}, {label: 'Employer', value: 'employer'}],
        placeholder: 'Select',
        isRequired: false,
        validations: {}
    },
    
]