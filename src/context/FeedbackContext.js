import { createContext, useState } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedBack] = useState([
    {
      id: 1,
      text: 'This is feedback item one',
      rating: 10
    },
    {
      id: 2,
      text: 'This is feedback item two',
      rating: 9
    },
    {
      id: 3,
      text: 'This is feedback item three',
      rating: 7
    }
  ]);

  const [feedbackEdit, setFeedBackEdit] = useState({
    item: {},
    edit: false
  });

  //Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };

  //Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedBack([newFeedback, ...feedback]);
  };

  //Edit feedback
  const editFeedback = (item) => {
    setFeedBackEdit({
      item,
      edit: true
    });
  };

  //Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedBack(
      feedback.map((item) => {
        return item.id === id ? { ...item, ...updItem } : item;
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
