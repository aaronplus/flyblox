export const getFormattedDate = (current_datetime) => {
  let formatted_date =
    current_datetime.getDate() +
    '/' +
    (current_datetime.getMonth() + 1) +
    '/' +
    current_datetime.getFullYear()
  return formatted_date
}

export const getCommentFormattedDate = (datetime) => {
  datetime = new Date(datetime)
  const date = datetime.getDay()
  const month = datetime.getMonth() + 1
  const year = datetime.getFullYear()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const seconds = datetime.getSeconds()

  const formattedDate =
    hour + ':' + minute + ' , ' + date + '/' + month + '/' + year
  return formattedDate
}
