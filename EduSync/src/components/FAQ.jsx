import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const FAQ = () => {
  const faqData = [
    { id: 'q1', question: 'What is EduSync all about?', answer: 'EduSync is an innovative digital platform designed to empower parents as active partners in their childrens education. We provide a comprehensive suite of resources. ' },
    { id: 'q2', question: 'How can EduSync help me as a parent?', answer: 'EduSync offers a wide range of resources and tools tailored to meet the needs of parents supporting their childrens learning journey. From educational .' },
    { id: 'q3', question: 'What kind of resources are available on EduSync?', answer: 'and education. These include guides on effective study techniques, tips for fostering a positive learning environment at home.' },
  ];

  const [activeAnswer, setActiveAnswer] = useState(null);

  const toggleAnswer = (id) => {
    setActiveAnswer((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className='w-11/12 mx-auto pt-24 mb-20'>
      <div className='text-3xl font-bold text-blue-700 mt-5 mb-8 sm:text-center'>
        Frequently asked questions
      </div>
      <div className="faq-container flex flex-col gap-2">
        {
          faqData.map((faq) => (
          <div key={faq.id} className='flex flex-col gap-1 py-2 border-b-2 border-gray-700 bg-[#999DAA] bg-blue-200 border-opacity-30  px-4 rounded-xl'>
            <div className="question flex flex-row justify-between    px-4 py-2 rounded-xl  " onClick={() => toggleAnswer(faq.id)}>
              <span className='text-black '>{faq.question}</span>
              {activeAnswer === faq.id ? (
                <SlArrowUp className="text-black ml-2" />
              ) : (
                <SlArrowDown className="text-black ml-2" />
              )}

            </div>
            {activeAnswer === faq.id && (
              <div className="answer px-4 bg-blue-500 text-white  py-2 rounded-xl">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
