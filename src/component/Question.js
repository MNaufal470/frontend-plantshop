import React, { useState } from "react";

const Question = () => {
  const [selected, setSelected] = useState(null);
  const data = [
    {
      question: "My flowers are falling off or dying?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 1,
    },
    {
      question: "How do i choose a plant?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 2,
    },
    {
      question: "Why are gnats flying around my plant?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 3,
    },
    {
      question: "What causes leaves to become pale?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 4,
    },
    {
      question: "My flowers are falling off or dying?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 5,
    },
    {
      question: "How do i choose a plant?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
      id: 6,
    },
  ];
  const toggleAccor = (i) => {
    if (selected === i) {
      return setSelected(null);
    } else {
      return setSelected(i);
    }
  };
  return (
    <section className="questions section" id="faqs">
      <h2 className="section__title-center questions__title container">
        Some common questions <br />
        were often asked
      </h2>
      <div className="questions__container container grid">
        <div className="questions__group">
          {data.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`questions__item ${
                selected === item.id ? "accordion-open" : ""
              }`}
            >
              <header
                className="questions__header"
                onClick={() => toggleAccor(item.id)}
              >
                <i className="ri-add-line questions__icon"></i>
                <h3 className="questions__item-title">{item.question}</h3>
              </header>
              <div
                className="questions__content"
                style={{ height: selected === item.id ? "100px" : "0px" }}
              >
                <p className="questions__description">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="questions__group">
          {data.slice(3, 6).map((item) => (
            <div
              key={item.id}
              className={`questions__item ${
                selected === item.id ? "accordion-open" : ""
              }`}
            >
              <header
                className="questions__header"
                onClick={() => toggleAccor(item.id)}
              >
                <i className="ri-add-line questions__icon"></i>
                <h3 className="questions__item-title">{item.question}</h3>
              </header>
              <div
                className="questions__content"
                style={{ height: selected === item.id ? "100px" : "0px" }}
              >
                <p className="questions__description">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
