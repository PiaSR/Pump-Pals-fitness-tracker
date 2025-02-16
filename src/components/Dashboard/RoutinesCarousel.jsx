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


	const responsive = {
		largeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3.1,
			slidesToSlide: 1, // optional, default to 1.
		  },
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 2.3,
		  slidesToSlide: 1, // optional, default to 1.
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 1.5,
		  slidesToSlide: 1, // optional, default to 1.
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1.2,
		  slidesToSlide: 1, // optional, default to 1.
		  
		}
	  };

  return (
	
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
		removeArrowOnDeviceType={["tablet", "mobile"]}
		customRightArrow={<ArrowRightCarousel />}
		customLeftArrow={<ArrowLeftCarousel />}


		// deviceType={this.props.deviceType}
		dotListClass="custom-dot-list-style"
		
		itemClass="max-h-[200px] w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mr-3"
		>
		{
			
		favorites.map(exercise => (
			<CardGeneric 
				exerciseName={exercise.name} 
				primMuscle={exercise.primaryMuscles}
				secMuscle={exercise.secondaryMuscles}
				imgSrc={test} 
				bgColor={bgColor}/>
		))}
		
	</Carousel>

  )
}

export default RoutinesCarousel