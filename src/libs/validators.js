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
  zipcode: yup.number()
  	.min(6)
  	.required("Please enter a valid ZIP code."),
  delivery_address: yup.string().required("You didn't provide a delivery address.")
});

export const registerSchema = yup.object().shape({
	...userInfoSchema,
	password: yup.string().required('Password field is required'),
	// TODO: MUST MATCH PASSWORD field
	password_confirmation: yup.string().required('Please confirm your password'),
})
