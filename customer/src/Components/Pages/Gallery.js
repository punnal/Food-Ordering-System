import React from 'react'
import Axios from 'axios'
import Api from '../../api/api'
import GalleryItem from './GalleryItem'


class Gallery extends React.Component {

    constructor() {
        super()
        this.state = {
            pictures: [],
            loading: true
        }
    }

    componentWillMount(){
        this.setState({loading: true}, () =>
                Axios.get(Api.gallery)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.data.data.pictures)
                        this.setState({
                            //Hardcoded here
                            //pictures: [
                            //    {id:1,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                            //    {id:2,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}
                            //]
                            pictures:response.data.data.pictures
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            pictures: [
                                {id:1,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                                {id:3,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                                {id:4,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                                {id:2,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}
                            ]//response.data
                        }, () => this.setState({
                            loading: false
                        }))
                    })
        )

    }


    createGallery = () => this.state.pictures.map((picture) => {
        return (
            <GalleryItem picture={picture}/>
        )
    })
     

    createLoading = () => {
        return (
            <div>Loading...</div>
        )
    }

    render() {

        console.log(this.state)
        const pictures = this.createGallery()
        const loading = this.createLoading()
        return(
            <div>
                {this.state.loading?loading:pictures}
            </div>
        )
    }

}

export default Gallery
