const Notification = ({ message, type }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    bordeRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (type === 'error') notificationStyle.color = 'red'

  console.log(notificationStyle);

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification