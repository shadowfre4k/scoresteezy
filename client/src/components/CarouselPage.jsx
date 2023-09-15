import Carousel from "react-bootstrap/Carousel";
import Arbok from '../assets/Arbok.png';
import Charizard from '../assets/Charizard.png';
import Darkrai from '../assets/Darkrai.png';
import Rayquaza from '../assets/Rayquaza.png';
import Typhlosion from '../assets/Typhlosion.png';
import Umbreon from '../assets/Umbreon.png';


function CarouselPage() {
    return (
        <div>
        <Carousel data-bs-theme="dark">
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Arbok}
                alt= 'First image'
            />
        <Carousel.Caption>
            <h3>Arboks!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Charizard}
                alt= 'Second image'
            />
        <Carousel.Caption>
            <h3>Charizards!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Darkrai}
                alt= 'Third Image'
            />
        <Carousel.Caption>
            <h3>Darkrai!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Rayquaza}
                alt= 'Fourth Image'
            />
        <Carousel.Caption>
            <h3>Rayquaza!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Typhlosion}
                alt= 'Fifth image'
            />
        <Carousel.Caption>
            <h3>Typhlosions!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block resize"
                src= {Umbreon}
                alt= 'Sixth image'
            />
        <Carousel.Caption>
            <h3>Umbreons!</h3>
        </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
      </div>
    )
}

export default CarouselPage;