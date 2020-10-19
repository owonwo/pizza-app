import React from 'react';
import styled from 'styled-components';

const _Preloader = ({ size }) => {
	return (
		<Preloader>
	    <div class="preloader-fill" 
	    	style={{ width: size, height: size }}>
        <div class="load">
        	<span />
        	<span />
        	<span />
        	<span />
        </div>
	    </div>
		</Preloader>
	);
}

const Preloader = styled.div`
	.preloader-fill {
	    display: inline-block;
	    max-height: 50px;
	    max-width: 50px;
	}

	.load {
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    position: relative;
	}

	.load span {
	    border: 0;
	    margin: 0;
	    width: 40%;
	    height: 40%;
	    box-shadow: 0 0 6px -3px currentColor;
	    position: absolute;
	    border-radius: 50%;
	    animation: spin 2s ease infinite;
	}

	.load :first-child {
	    background: ${a => a.theme.colors._7};
	    animation-delay: -1.5s;
	}

	.load :nth-child(2) {
	    background: ${a => a.theme.colors._5};
	    animation-delay: -1s;
	}

	.load :nth-child(3) {
	    background: ${a => a.theme.colors._4};
	    animation-delay: -0.5s;
	}

	.load :last-child {
	    background: indianred;
	}

	@keyframes spin {
	    0%,
	    100% {
	        transform: translate(0);
	    }

	    25% {
	        transform: translate(160%);
	    }

	    50% {
	        transform: translate(160%, 160%);
	    }

	    75% {
	        transform: translate(0, 160%);
	    }
	}
`

export default _Preloader;