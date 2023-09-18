import Carousel from "react-bootstrap/Carousel";
import Arbok from '../assets/pokemon-2.svg';
import Charizard from '../assets/pokemon-3.svg';
import Darkrai from '../assets/pokemon-7.svg';
import Rayquaza from '../assets/pokemon-10.svg';
import Typhlosion from '../assets/pokemon-16.svg';
import Umbreon from '../assets/pokemon-19.svg';


function CarouselPage() {
    return (
        <div>
        <Carousel data-bs-theme="dark">
        <Carousel.Item>
            <img
                className=" resize d-flex justify-content-center align-items-center"
                src= {Arbok}
                alt= 'First image'
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-flex justify-content-center align-items-center resize"
                src= {Charizard}
                alt= 'Second image'
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-flex justify-content-center align-items-center resize"
                src= {Darkrai}
                alt= 'Third Image'
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="resize d-flex justify-content-center align-items-center"
                src= {Rayquaza}
                alt= 'Fourth Image'
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-flex justify-content-center align-items-center resize"
                src= {Typhlosion}
                alt= 'Fifth image'
            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-flex justify-content-center align-items-center resize"
                src= {Umbreon}
                alt= 'Sixth image'
            />

        </Carousel.Item>
        </Carousel>
      </div>
    )
}

export default CarouselPage;