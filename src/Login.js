import React from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Layout from './views/Layout';
import useAuth from './hooks/useAuth'
import { ButtonLoader } from './components/Buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Labelled } from "@wigxel/react-components/lib/form";
import { Alert } from "@wigxel/react-components/lib/alert";
import { Button } from "@wigxel/react-components/lib/buttons";
import { H2 } from "@wigxel/react-components/lib/typography";
import { useErrors } from './components/FormHelpers';
import { loginSchema } from './libs/validators';

const Login = () => {
	const history = useHistory();
	const { register, getValues, errors: formErrors } = useForm({
		mode: 'onChange',
		resolver: yupResolver(loginSchema),
	});
	const { loginUser, loading, hasToken, signedIn, errors } = useAuth()
	const showErrMessageIfAny = useErrors(formErrors);

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
		  			message={showErrMessageIfAny('email')}
		  			fullwidth
		  			onBlur={() => {}} />
		  		<Labelled.Input 
		  			ref={register} 
		  			name="password" 
		  			type="password" 
		  			label="Password" 
		  			fullwidth 
		  			message={showErrMessageIfAny('password')}
		  			onBlur={() => {}} />
		  		<div className="" />
		  		<ButtonLoader
		  			Button={Button}
		  			loading={loading}
		  			primary
		  			fullwidth
		  			onClick={doLogin}>
		  			<span className="text-base tracking-widest">LOGIN</span>
		  		</ButtonLoader>
		  		</div>
	  		</div>
  	</Layout>
  );
};

export default Login;
