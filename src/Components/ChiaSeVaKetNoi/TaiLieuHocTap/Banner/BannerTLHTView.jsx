import React from 'react'
import PropTypes from 'prop-types'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function BannerTLHTView(props) {
  return (
    <Carousel
      className="rounded-md"
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      swipeable={true}
      animationHandler="fade"
    >
      <div className="rounded-md">
        <img
          className="rounded-md"
          src="https://cdn.chotot.com/admincentre/5Wq91YVcIIoC3h7F47KsZCpiAIxFT879ACKKf1JYZ7M/preset:raw/plain/5f767e3b69210c6ec47f5bd8f284c6d8-2861346244174089155.jpg"
        />
      </div>
      <div className="rounded-md">
        <img
          className="rounded-md"
          src="https://cdn.chotot.com/admincentre/7RD7tjiOUOmTf6EhjaPHCPzAzEBKRm341mfChVDy0KM/preset:raw/plain/093d74596e39d0b90f042a26d5325014-2856943825870710768.jpg"
        />
      </div>
      <div className="rounded-md">
        <img
          className="rounded-md"
          src="https://cdn.chotot.com/admincentre/0odgtMFjCffU4SJiWEzbJPkJrPguFCoJ8O_8lXrt3VE/preset:raw/plain/2129acb6bb763d48f78a98d8b9dcd44e-2870318523805270898.jpg"
        />
      </div>
      <div className="rounded-md">
        <img
          className="rounded-md"
          src="https://cdn.chotot.com/admincentre/ohIMAFIX9-8rCWt-vMuT0MOTayyZJI6yIhJnJD-VY5k/preset:raw/plain/ca8540e723a5dee6d33069a763ee0b9a-2868438735120187412.jpg"
        />
      </div>
      <div className="rounded-md">
        <img
          className="rounded-md"
          src="https://cdn.chotot.com/admincentre/n7qtGDKACkBUcIBngZ8k6UTViVhsvmUdNsUnxzxGZGU/preset:raw/plain/535ac1ee75274be158be148cdae80735-2862504091815441220.jpg"
        />
      </div>
    </Carousel>
  )
}

BannerTLHTView.propTypes = {}

export default BannerTLHTView
