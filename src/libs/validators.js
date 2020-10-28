import * as yup from "yup";

const userInfoSchema = {
	name: yup.string().min(2).required('Name is a required'),
  email: yup.string()
  	.email('Please provide a valid email address')
  	.lowercase()
  	.required('Email Address is required'),
  phone: yup.string()
  	.min(7)
  	.required("Phone number field is required."),
}

export const deliverySchema = yup.object().shape({
  ...userInfoSchema,
  zipcode: yup.string()
  	.min(4)
  	.required("Please enter a valid ZIP code."),
  delivery_address: yup.string().min(8, "Address is too short.").required("You didn't provide a delivery address.")
});

export const loginSchema = yup.object().shape({
	email: yup.string()
  	.email('Please provide a valid email address')
  	.lowercase()
  	.required('Email Address is required'),
	password: yup.string().required('Password field is required'),
})

export const registerSchema = yup.object().shape({
	...userInfoSchema,
	password: yup.string().required('Password field is required'),
	// TODO: MUST MATCH PASSWORD field
	password_confirmation: yup.string().required('Please confirm your password'),
})
