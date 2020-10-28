import React from 'react';
import { LogOut } from 'react-feather';
import capitalize from 'lodash/capitalize';
import { useHistory } from 'react-router-dom';

import Layout from "./Layout";
import  useAuth from '../hooks/useAuth';
import  useOrders from '../hooks/useOrders';
import { ChevronDown } from 'react-feather';
import LinearLoader from '../components/LinearLoader';
import { Stack } from '@wigxel/react-components/lib/layout';
import  { useStore as useAuthStore } from '../stores/AuthStore';
import { H3, H4 } from '@wigxel/react-components/lib/typography';
import { Collapsible } from '@wigxel/react-components/lib/lists';

const Account = () => {
	const history = useHistory();
	const { user } = useAuthStore();
	const { data = [], loading, response } = useOrders();

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
			: (<Stack large className="select-none">
					<div className="flex justify-between items-center">
						<H3>Hello, <b>{user.name.split(' ')[0]}</b></H3>
						<button
							className="border-mix rounded-lg border flex py-2 px-4"
							onClick={() => logoutUser().then(() => history.replace('/login'))}>
							<LogOut /> 
							<span className="font-bold pl-2">Logout</span>
						</button>
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
					<LinearLoader>
						<H4 bold>Order History - {data?.length || 0}</H4>
						{loading && <LinearLoader.Loader />}
						<div className="mt-4">
							{(!loading && data.length === 0) 
								&& <span className="italic opacity-75">You haven't place any order yet. All recent order information should appear here.</span>}
							{response.ok && data.map((e, idx) => <RenderHistory key={idx} {...e} />)}
						</div>
					</LinearLoader>
				</Stack>)
			}
		</div>
	</Layout>
}

const RenderHistory = (e) => {
	const [state, setState] = React.useState(false);
	const setAngleClass = a => a ? 'rotate-180' : 'rotate-0';

	return (
		<li className="block border-mix py-2 border-b border-mix mb-0 max-w-sm">
			<div className="flex justify-between w-full items-start">
				<span className="whitespace-no-wrap">Delivery To:</span>
				<div className="text-right">
					<span className="block text-blue-400 text-xs">{e.status}</span>
					<span className="block text-xs opacity-75">{e.toNow()}</span>
				</div>
			</div>
			<section className="flex flex-col mb-4">
				<div className="text-lg font-bold">{e.name}</div>
				<div>{e.email}</div>
			</section>
			<section>
				<Collapsible open={state}>
					{(e.products || []).map((e, idx) => (
						<li key={idx} className="py-1 flex items-start">
							{console.log(e)}
							<img 
								src={e.product.image}
								className="w-16 h-16 object-cover rounded-lg overflow-hidden mx-2"
								alt={e.product.name} />
							<span className="mx-2 py-2">{e.quantity || 1}x {e.product.name}</span>
						</li>
					))}
				</Collapsible>
				<button className="border-mix border py-1 bg-black text-white py-2 w-full mt-2 rounded-lg" onClick={() => setState(!state)}>
					Review Order <ChevronDown className={`transform inline-block transition-transform duration-150 ease-in-out ${setAngleClass(state)}`} />
				</button>
			</section>
		</li>
	);
}

export default Account;