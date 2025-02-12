import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import ArrowLeftCarousel from '../Buttons/ArrowLeftCarousel';
import ArrowRightCarousel from '../Buttons/ArrowRightCarousel';
import CardGeneric from './CardGeneric';

const RoutinesCarousel = () => {
	const {favorites} = useExercise()

	const responsive = {
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 3,
		  slidesToSlide: 3 // optional, default to 1.
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 2,
		  slidesToSlide: 2 // optional, default to 1.
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1,
		  slidesToSlide: 1 // optional, default to 1.
		}
	  };

  return (
	<div className="w-full h-auto relative bg-red-400">
	<Carousel
		swipeable={true}
		draggable={false}
		showDots={true}
		responsive={responsive}
		ssr={true} 
		infinite={false}
		// autoPlay={this.props.deviceType !== "mobile" ? true : false}
		autoPlaySpeed={1000}
		keyBoardControl={true}
		customTransition="all .5"
		transitionDuration={500}
		containerClass="carousel-container"
		// removeArrowOnDeviceType={["tablet", "mobile"]}
		customRightArrow={<ArrowRightCarousel />}
		customLeftArrow={<ArrowLeftCarousel />}


		// deviceType={this.props.deviceType}
		dotListClass="custom-dot-list-style"
		// itemClass="carousel-item-padding-40-px"
		>
		{
		favorites.map(exercise => (
			<CardGeneric exerciseName={exercise.name} />
		))}
		{/* <div className='bg-red-500 h-32 w-32'>Item 1</div>
		<div className='bg-red-500 h-32 w-32'>Item 2</div>
		<div className='bg-red-500 h-32 w-32'>Item 3</div>
		<div className='bg-red-500 h-32 w-32'>Item 4</div> */}
	</Carousel>
	</div>
  )
}

export default RoutinesCarousel