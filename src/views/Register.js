import React from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from './Layout';
import { Labelled } from "@wigxel/react-components/lib/form";
import { Alert } from "@wigxel/react-components/lib/alert";
import { Button } from "@wigxel/react-components/lib/buttons";
import { H2 } from "@wigxel/react-components/lib/typography";
import useAuth from '../hooks/useAuth'
import { registerSchema } from '../libs/validators';
import { ButtonLoader } from '../components/Buttons';
import { useErrors } from '../components/FormHelpers';


const Register = () => {
	const history = useHistory();
	const { register, handleSubmit, errors: formErrors } = useForm({
		mode: "onChange",
		resolver: yupResolver(registerSchema)
	});
	const showErrMessageIfAny = useErrors(formErrors);
	const { registerUser, hasToken, signedIn, errors, loading } = useAuth()

	React.useEffect(() => {
		// redirect to `/account` if user is authenticated.
		if (hasToken()) {
			history.replace('/account');
		}
	}, [hasToken, history])

	const doRegister = (formData) => {
		registerUser(formData)
			.then(() => history.replace('/account'))
			.catch((err) => console.error(err.message))
	};

  return (
  	<Layout>
	  	<div className="flex items-center justify-center">
	  		{(signedIn === true) && <Redirect to="/dashboard" />}
	  		<form className="grid grid-col-1 gap-4 max-w-md w-full py-10 px-8 rounded-lg"
	  			onSubmit={handleSubmit(doRegister)}>
	  			<hgroup>
			  		<H2 bold>Create An Account.</H2>
			  		<p className="text-sm mb-4 mt-0">Already have an Account ?{" "} 
			  			<Link to="/login" className="underline">Sign In</Link>
			  		</p>
		  		</hgroup>

		  		{errors.register && <Alert type="danger" message={errors.register}/>}

		  		{fields.map(({ label, type, name }) => (
		  			<Labelled.Input 
			  			key={name}
			  			ref={register} 
			  			name={name} 
			  			type={type} 
			  			label={label} 
			  			message={showErrMessageIfAny(name)}
			  			fullwidth
			  			onBlur={() => {}} />
		  		))}
		  		<div />
		  		<ButtonLoader
		  			Button={Button}
		  			loading={loading}
		  			type="submit"
		  			primary
		  			fullwidth>
		  			REGISTER
		  		</ButtonLoader>
		  	</form>
	  	</div>
  	</Layout>
  );
};

const fields = [
	{
		name: "name",
		type: "text",
		label: "Full Name"
	},
	{
		name: "email",
		type: "text",
		label: "Email Address"
	},
	{
		name: "password",
		type: "password",
		label: "Password" 
	},
	{
		name: "password_confirmation",
		type: "password" ,
		label: "Confirm Password" ,
	},
	{
		name: "phone",
		type: "text",
		label: "Phone Number"
	}
];

export default Register;
