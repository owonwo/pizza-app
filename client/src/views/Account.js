import React from 'react';
import { LogOut } from 'react-feather';
import { useHistory } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import Layout from "./Layout";
import  useAuth from '../hooks/useAuth';
import  { useStore as useAuthStore } from '../stores/AuthStore';
import { H3, H4 } from '@wigxel/react-components/lib/typography';
import { Button } from '@wigxel/react-components/lib/buttons';
import { Stack } from '@wigxel/react-components/lib/layout';

const Account = () => {
	const history = useHistory();
	const { user } = useAuthStore();
	const { hasToken, logoutUser } = useAuth();

	React.useEffect(() => {
		if (!hasToken()) {
			history.replace('/login');
		}
	}, [hasToken, history])

	return <Layout>
		<div className="py-4 md:py-12 px-4">
			{!user ?
				(<div>Loading...</div>)
			: (<Stack>
					<div className="flex flex-col md:flex-row md:justify-between md:items-center">
						<div className="mb-4 md:mb-0">
							<H3>Hello, <b>{user.name.split(' ')[0]}</b></H3>
						</div>
						<Button outline primary className="px-2"
							onClick={() => logoutUser().then(() => history.replace('/login'))}>
							<LogOut /> 
							<span className="font-bold pl-2">Logout</span>
						</Button>
					</div>

					<section>
						<H4 className="mb-2" bold>Account Information</H4>
						{['name', 'email'].map((bioProp) => {
							return <div key={bioProp} className="w-full flex py-1 max-w-sm">
								<b className="w-1/5">{capitalize(bioProp)}</b> &#x2014; 
								<span className="ml-4">{user[bioProp]}</span>
							</div>
						})}
					</section>

					<H4 bold>Order History - 30</H4>
				</Stack>)
			}
		</div>
	</Layout>
}

export default Account;