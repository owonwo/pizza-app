import React from "react";
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Layout from './views/Layout';
import { Labelled } from "@wigxel/react-components/lib/form";
import { Alert } from "@wigxel/react-components/lib/alert";
import { Button } from "@wigxel/react-components/lib/buttons";
import { H2 } from "@wigxel/react-components/lib/typography";
import { log } from '@wigxel/utils'
import useAuth from './hooks/useAuth'

const HomePage = () => {
	const { register, getValues } = useForm()
	const { loginUser, signedIn, errors } = useAuth()

	const doLogin = () => {
		loginUser(getValues())
	}

  return (
  	<Layout>
	  	<div className="flex items-center justify-center">
	  		{(signedIn === true) && <Redirect to="/dashboard" />}
	  		<div className="grid grid-col-1 gap-4 max-w-md w-full py-10 px-8 rounded-lg">
		  		<H2 bold className="mb-3">Sign In</H2>
		  		{errors.signin && <Alert type="danger" message={errors.signin}/>}
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
		  		<div className="mt-5">
		  		<Button 
		  			primary
		  			fullwidth
		  			onClick={doLogin}>LOGIN</Button>
		  		</div>
	  		</div>
	  	</div>
  	</Layout>
  );
};

export default HomePage;
