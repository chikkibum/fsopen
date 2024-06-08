// Notification.jsx

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
