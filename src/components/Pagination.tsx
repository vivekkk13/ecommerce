import React, { useEffect, useState } from "react";

interface Iprops {
  showPerPage: number;
  onPaginationChange: any;
  total: any;
}
const Pagination = ({ showPerPage, onPaginationChange, total }: Iprops) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButoons] = useState(Math.ceil(100 / 10));
  const [isSubscribed, setIsSubscribed] = useState(false);

  /**********useEffect********************** */
  useEffect(() => {
    let value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
    console.log("numberOfButtons", numberOfButtons);
    console.log(total, "total===>");
    console.log(showPerPage);
    console.log("counter", counter);
  }, [counter]);
  const onButtonClick = (type: any) => {
    if (type == "prev") {
      if (counter == 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type == "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  const handleChange = (event: any) => {
    setIsSubscribed(event.target.checked);
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => onButtonClick("prev")}>
              Previous
            </a>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
              className={`page-item ${index + 1 === counter ? "active" : null}`}
            >
              <a
                className="page-link"
                onClick={() => setCounter(index + 1)}
                onChange={handleChange}
                defaultChecked={isSubscribed}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" onClick={() => onButtonClick("next")}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

{
  /* <div className="prev_page">
  <button
    type="button"
    className="btn btn-outline-secondary custom_btn"
    onClick={() => onButtonClick("prev")}
  >
    Prev
  </button>
</div>
<div className="Next_page">
  <button
    type="button"
    className="btn btn-outline-secondary custom_btn"
    onClick={() => onButtonClick("next")}
  >
    Next
  </button>
</div> */
}
export default Pagination;
