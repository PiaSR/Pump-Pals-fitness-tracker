import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import ArrowLeftCarousel from '../Buttons/ArrowLeftCarousel';
import ArrowRightCarousel from '../Buttons/ArrowRightCarousel';
import CardGeneric from './CardGeneric';
import test from "/src/assets/images/test.jpg"

const RoutinesCarousel = () => {
	const {favorites} = useExercise()

	const responsive = {
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 4,
		  slidesToSlide: 4 // optional, default to 1.
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 3,
		  slidesToSlide: 3 // optional, default to 1.
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 2,
		  slidesToSlide: 2 // optional, default to 1.
		}
	  };

  return (
	<div className="w-full h-auto  bg-red-400">
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
		itemWidth="60%"
		itemClass="carousel-item-padding-40-px carousel-item-center carousel-item-no-transition h-[30%]"
		>
		{
		favorites.map(exercise => (
			<CardGeneric exerciseName={exercise.name} imgSrc={test}/>
		))}
		
	</Carousel>
	</div>
  )
}

export default RoutinesCarousel