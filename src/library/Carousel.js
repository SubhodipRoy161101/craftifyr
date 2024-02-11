import React, { useState, useEffect } from "react";

import "./Carousel.css";

const Carousel = () => {
  const [items, setItems] = useState([
    {
      text: "Hello this is div one",
      imageUrl:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      text: "This is a div",
      imageUrl:
        "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      text: "This is a div two",
      imageUrl:
        "https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      text: "Hello this is div last",
      imageUrl:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      text: "Hello this is div last",
      imageUrl:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      text: "Hello this is div last",
      imageUrl:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]);
  const [containerPosition, setContainerPosition] = useState(0);
  const [middleDivIndex, setMiddleDivIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle the scroll event to improve performance
      clearTimeout(throttleTimer);
      throttleTimer = setTimeout(() => {
        const container = document.querySelector(".carousel-container");
        if (container) {
          const newPosition = container.scrollLeft;
          setContainerPosition(newPosition);

          // Calculate the midpoint of the viewport
          const viewportMidpoint = window.innerWidth / 2 + newPosition;

          // Find the index of the div closest to the midpoint
          let closestIndex = null;
          let minDistance = Infinity;
          items.forEach((item, index) => {
            const div = document.querySelector(`.carousel-div-${index}`);
            if (div) {
              const divLeft = div.offsetLeft;
              const divWidth = div.offsetWidth;
              const divMidpoint = divLeft + divWidth / 2;
              const distance = Math.abs(viewportMidpoint - divMidpoint);
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
              }

              // Calculate the width based on distance from the center
              const maxDivWidth = 350; // Maximum width in rem
              const distanceFromCenter = Math.abs(
                viewportMidpoint - divMidpoint
              );
              const scaleFactor = 0.2; // Adjust this scale factor as needed
              const scaledWidth =
                maxDivWidth - distanceFromCenter * scaleFactor;
              const clampedWidth = Math.max(0, scaledWidth); // Ensure width doesn't go below zero
              div.style.minWidth = `${clampedWidth}px`;
            }
          });

          // Update state with the index of the middle div
          setMiddleDivIndex(closestIndex);
        }
      }, 30); // Adjust the throttle time as needed
    };

    let throttleTimer = null;
    const container = document.querySelector(".carousel-container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  useEffect(() => {
    // Throttle the scroll event to improve performance
    const container = document.querySelector(".carousel-container");
    if (container) {
      const newPosition = container.scrollLeft;
      setContainerPosition(newPosition);

      // Calculate the midpoint of the viewport
      const viewportMidpoint = window.innerWidth / 2 + newPosition;

      // Find the index of the div closest to the midpoint
      let closestIndex = null;
      let minDistance = Infinity;
      items.forEach((item, index) => {
        const div = document.querySelector(`.carousel-div-${index}`);
        if (div) {
          const divLeft = div.offsetLeft;
          const divWidth = div.offsetWidth;
          const divMidpoint = divLeft + divWidth / 2;
          const distance = Math.abs(viewportMidpoint - divMidpoint);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }

          // Calculate the width based on distance from the center
          const maxDivWidth = 350; // Maximum width in rem
          const distanceFromCenter = Math.abs(viewportMidpoint - divMidpoint);
          const scaleFactor = 0.2; // Adjust this scale factor as needed
          const scaledWidth = maxDivWidth - distanceFromCenter * scaleFactor;
          const clampedWidth = Math.max(0, scaledWidth); // Ensure width doesn't go below zero
          div.style.minWidth = `${clampedWidth}px`;
        }
      });

      // Update state with the index of the middle div
      setMiddleDivIndex(closestIndex);
    }
    // Adjust the throttle time as needed
  }, []);

  return (
    <div className="carousel-container">
      {items.map((item, index) => (
        <div
          key={index}
          className={`carousel-div carousel-div-${index}`}
          style={{
            backgroundImage: `url("${item.imageUrl}")`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
