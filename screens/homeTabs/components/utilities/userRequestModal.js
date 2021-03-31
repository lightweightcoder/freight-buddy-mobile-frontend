// create the button text that represents the next available action
// that prompts the requester to update the request status.
// returns empty string if there is no available action.
// Also creates the next status coressponding to the button text
// eslint-disable-next-line import/prefer-default-export
export function getUpdateRequestStatusButtonTextAndNewStatus(status) {
  // user should press the button when a helper has offered to purchase the item for him
  if (status === 'requested') {
    return { text: 'Someone has offered help', newStatus: 'accepted' };
  }

  // user should press the button when helper has informed him that the item is shipped out
  if (status === 'accepted') {
    return { text: 'Helper has sent for delivery', newStatus: 'shipped' };
  }

  // user should press the button when he has received the item
  if (status === 'shipped') {
    return { text: 'I have received the item', newStatus: 'completed' };
  }

  // no available action.
  return { text: '', newStatus: '' };
}
