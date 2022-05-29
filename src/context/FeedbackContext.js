import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedBack] = useState([]);

  const [feedbackEdit, setFeedBackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();
    setFeedBack(data);
    setIsLoading(false);
  };

  //Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE'
      });

      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };

  //Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback)
    });

    const data = await response.json();

    setFeedBack([data, ...feedback]);
  };

  //Edit feedback
  const editFeedback = (item) => {
    setFeedBackEdit({
      item,
      edit: true
    });
  };

  //Update feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updItem)
    });

    const data = await response.json();

    setFeedBack(
      feedback.map((item) => {
        return item.id === id ? { ...item, ...data } : item;
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
