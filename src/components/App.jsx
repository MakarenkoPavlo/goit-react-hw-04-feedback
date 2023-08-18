import React, { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import styles from './App.module.css'; 
import classNames from 'classnames';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);

  const options = Object.keys(feedback);

  const handleLeaveFeedback = (option) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }));
    setIsFeedbackGiven(true);
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((total, value) => total + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  const containerClass = classNames(styles.container, {
    [styles.containerWithFeedback]: isFeedbackGiven
  });

  const sectionClass = classNames(styles.section, {
    [styles.sectionWithFeedback]: isFeedbackGiven
  });

  return (
    <div className={containerClass}>
      <Section title="Please leave feedback" className={sectionClass}>
        <FeedbackOptions options={options} onLeaveFeedback={handleLeaveFeedback} />
      </Section>

      {totalFeedback > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};

export default App;
