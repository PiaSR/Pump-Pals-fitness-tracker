import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import ArrowLeftCarousel from '../Buttons/ArrowLeftCarousel';
import ArrowRightCarousel from '../Buttons/ArrowRightCarousel';
import CardGeneric from './CardGeneric';
import test from "/src/assets/images/test.jpg"

const RoutinesCarousel = ({bgColor}) => {
	const {favorites} = useExercise()
	console.log('Favorites in RoutinesCarousel:', favorites);


	const responsive = {
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 3.3,
		  slidesToSlide: 1, // optional, default to 1.
		  partialVisibilityGutter: 30
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 1.8,
		  slidesToSlide: 1, // optional, default to 1.
		  partialVisibilityGutter: 30
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1.2,
		  slidesToSlide: 1, // optional, default to 1.
		  partialVisibilityGutter: 30
		}
	  };

  return (
	<div className="w-full h-[35%]">
	<Carousel
		swipeable={true}
		draggable={false}
		showDots={false}
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
		
		itemClass="carousel-item-padding-30px carousel-item-gap-10px carousel-item-center carousel-justify-center carousel-item-no-transition "
		>
		{
			
		favorites.map(exercise => (
			<CardGeneric exerciseName={exercise.name} imgSrc={test} bgColor={bgColor}/>
		))}
		
	</Carousel>
	</div>
  )
}

export default RoutinesCarousel