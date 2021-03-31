/* eslint-disable no-undef */
// this file contains tests for functions within App.js
import { expect } from 'chai';

function getUpdateRequestStatusButtonTextAndNewStatus(status) {
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

  // no available action
  return '';
}

describe('App', () => {
  describe('userRequestModal operations', () => {
    describe('get button text and new status for updating a request\'s status', () => {
      it('when request status is \'requested\'', () => {
        const result = getUpdateRequestStatusButtonTextAndNewStatus('requested');
        expect(result.text).to.equal('Someone has offered help');
        expect(result.newStatus).to.equal('accepted');
      });

      it('when request status is \'accepted\'', () => {
        const result = getUpdateRequestStatusButtonTextAndNewStatus('accepted');
        expect(result.text).to.equal('Helper has sent for delivery');
        expect(result.newStatus).to.equal('shipped');
      });

      it('when request status is \'shipped\'', () => {
        const result = getUpdateRequestStatusButtonTextAndNewStatus('shipped');
        expect(result.text).to.equal('I have received the item');
        expect(result.newStatus).to.equal('completed');
      });
    });
  });
});
