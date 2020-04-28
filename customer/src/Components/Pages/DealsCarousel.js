import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

class DealsCarousel extends React.Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    render(){
    	return(
    		<Carousel className = "DealsCarousel">
			  <Carousel.Item>
			  <a href = '#'>
			    <img
			      className="d-block w-100"
			      src="https://www.bkpakistan.com/home/img/main-slider/Whopper-Fest-Web-new.jpg"
			      alt="First slide"
			    />
			    </a>
			    <Carousel.Caption>
			      <h3>Deal 1</h3>
			      <p>Buy 1 get 0 free.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			  <a href = '#'>
			    <img
			      className="d-block w-100"
			      src="https://www.bkpakistan.com/home/img/main-slider/kings-sreat-749-slider.jpg"
			      alt="Second slide"
			    />
			    </a>
			    <Carousel.Caption>
			      <h3>My Ass</h3>
			      <p>I really want this thing to be the best.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			  	<a href = '#'>
			    <img
			      className="d-block w-100"
			      src="https://www.whopper.ie/wp-content/uploads/2018/09/%E2%80%A21800x760-BK-BKI-2x6-web-asset-F.jpg"
			      alt="Third slide"
			    />
			    </a>
			    <Carousel.Caption>
			      <h3>Filth Frank</h3>
			      <p>Please can we figure out how to deploy.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>
    	)
    }
}

export default DealsCarousel