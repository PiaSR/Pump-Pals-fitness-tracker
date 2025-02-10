import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingScreen = () => {
  return (
	<div className='flex items-center justify-center'>
    <DotLottieReact
	className='w-80'
	src="https://lottie.host/1ed8ae97-c80d-4f01-b555-3c75802f9d3d/cwVCxLm5oz.lottie"
	loop
      autoplay
	  
    />
	</div>
  );
};

export default LoadingScreen


