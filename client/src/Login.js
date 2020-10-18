import React from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Layout from './views/Layout';
import { Labelled } from "@wigxel/react-components/lib/form";
import { Alert } from "@wigxel/react-components/lib/alert";
import { Button } from "@wigxel/react-components/lib/buttons";
import { H2 } from "@wigxel/react-components/lib/typography";
import useAuth from './hooks/useAuth'

const Login = () => {
	const history = useHistory();
	const { register, getValues } = useForm();
	const { loginUser, hasToken, signedIn, errors } = useAuth()

	React.useEffect(() => {
		// redirect to `/account` if user is authenticated.
		if (hasToken()) {
			history.replace('/account');
		}
	}, [hasToken, history])

	const doLogin = () => {
		loginUser(getValues())
			.then(() => history.replace('/account'))
			.catch((err) => console.error(err.message))
	};

  return (
  	<Layout>
	  	<div className="flex items-center justify-center">
	  		{(signedIn === true) && <Redirect to="/dashboard" />}
	  		<div className="grid grid-col-1 gap-4 max-w-md w-full py-10 px-8 rounded-lg">
	  			<hgroup>
			  		<H2 bold>Sign In.</H2>
			  		<p className="text-sm mb-4 mt-0">Don't have an Account ?{" "} 
			  			<Link to="/register" className="underline">Sign Up</Link>
			  		</p>
		  		</hgroup>
		  		{errors.login && <Alert type="danger" message={errors.login}/>}
		  		<Labelled.Input 
		  			ref={register} 
		  			name="email" 
		  			type="text" 
		  			label="Email Address" 
		  			fullwidth
		  			onBlur={() => {}} />
		  		<Labelled.Input 
		  			ref={register} 
		  			name="password" 
		  			type="password" 
		  			label="Password" 
		  			fullwidth 
		  			onBlur={() => {}} />
		  		<div className="" />
		  		<Button 
		  			primary
		  			fullwidth
		  			onClick={doLogin}>LOGIN</Button>
		  		</div>
	  		</div>
  	</Layout>
  );
};

export default Login;
