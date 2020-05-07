import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Axios from 'axios'
import Api from '../../api/api'

class DealsCarousel extends React.Component {


    constructor() {
        super()
        this.state = {
            pictures: [
                {
                    title:"Deal", 
                    description: "Best Deal in the world",
                    photo_url:"https://www.bkpakistan.com/home/img/main-slider/Whopper-Fest-Web-new.jpg"

                }, 
            ],
            loading: true
        }
    }

    componentWillMount(){
        this.setState({loading: true}, () =>
                Axios.get(Api.carousel)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.data.data.pictures)
                        this.setState({
                            //Hardcoded here
                            //pictures: [
                            //    {id:1,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                            //    {id:2,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}
                            //]
                            pictures:response.data.data
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            pictures: [
                                {
                                    title:"Deal", 
                                    description: "Best Deal in the world",
                                    photo_url:"https://www.bkpakistan.com/home/img/main-slider/Whopper-Fest-Web-new.jpg"

                                }, 
                                {
                                    title:"Deal2", 
                                    description: "Second Best Deal in the world",
                                    photo_url:"https://www.bkpakistan.com/home/img/main-slider/kings-sreat-749-slider.jpg"

                                }, 
                            ]//response.data
                        }, () => this.setState({
                            loading: false
                        }))
                    })
        )

    }


    createCarousel = () => this.state.pictures.map((picture, iter) => {
        return (
            <Carousel.Item>
			  <a href = '#'>
			    <img
			      className="d-block w-100"
			      src={picture.photo_url}
			      alt={iter.toString() + "slide"}
			    />
			    </a>
			    <Carousel.Caption>
			      <h3 className = "CarouselCaptionTitle">{picture.title}</h3>
			      <p>{picture.description}</p>
			    </Carousel.Caption>
			  </Carousel.Item>

        )
    })
     

    createLoading = () => {
        return (
            <div className="LoadingScreen">
                <img src ="https://mld0meypxmny.i.optimole.com/fhQWhw-lm_DIc1p/w:auto/h:auto/q:55/https://www.folkswagon.com/wp-content/uploads/2020/02/SmokeGrill-logo.jpg" />
            </div>
        )
    }

    render() {

        console.log(this.state)
        const pictures = this.createCarousel()
        const loading = this.createLoading()
    	return(
    		<Carousel className = "DealsCarousel">
              {pictures}
            {/* <Carousel.Item>
			  <a href = '#'>
			    <img
			      className="d-block w-100"
			      src="https://www.bkpakistan.com/home/img/main-slider/Whopper-Fest-Web-new.jpg"
			      alt="First slide"
			    />
			    </a>
			    <Carousel.Caption>
			      <h3 className = "CarouselCaptionTitle">Deal 1</h3>
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
			      <h3 className = "CarouselCaptionTitle">My Ass</h3>
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
			      <h3 className = "CarouselCaptionTitle">Filth Frank</h3>
			      <p>Please can we figure out how to deploy.</p>
			    </Carousel.Caption>
			  </Carousel.Item>*/}
			</Carousel>
    	)
    }
}

export default DealsCarousel
