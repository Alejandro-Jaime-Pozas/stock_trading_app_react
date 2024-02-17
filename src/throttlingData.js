import React, { useState, useEffect, useRef } from 'react';

const ThrottledList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState(15);
  const observer = useRef();

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 15);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreItems();
          }
        });
      },
      { threshold: 1 }
    );

    if (observer.current) {
      observer.current.observe(document.getElementById('end-of-list'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []); // Run only once on mount

  return (
    <div>
      <ul>
        {items.slice(0, visibleItems).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div id="end-of-list" style={{ height: '10px' }} />
    </div>
  );
};

// Example usage
const App = () => {
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  return <ThrottledList items={items} />;
};

export default App;
