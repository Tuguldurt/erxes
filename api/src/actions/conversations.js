import EJSON from 'meteor-ejson';
import { call, subscribeMessages } from '../erxes';
import uploadHandler from '../uploadHandler';


export const readMessages = conversationId =>
  () => call('customerReadMessages', conversationId);

export const changeActiveConversation = conversationId => ({
  type: 'CHANGE_CONVERSATION',
  conversationId,
});

export const changeConversation = conversationId =>
  (dispatch) => {
    if (conversationId) {
      subscribeMessages(conversationId);
    }

    dispatch(changeActiveConversation(conversationId));
  };

export const sendMessage = (message, attachments) =>
  (dispatch, getState) => {
    // current conversation
    const currentConversationId = getState().messenger.currentConversation;

    // message object
    const doc = {
      conversationId: currentConversationId,
      message,
      attachments,
    };

    return call('sendMessage', doc)
      .then(({ conversationId }) => {
        // if there is no current conversation new conversation will be created
        if (!currentConversationId) {
          subscribeMessages(conversationId);
          dispatch(changeActiveConversation(conversationId));
        }
      });
  };

export const sendFile = file =>
  (dispatch, getState) => {
    uploadHandler({
      file,
      uploadAction: ({ data, fileInfo }) => {
        dispatch({ type: 'SENDING_ATTACHMENT' });

        // file object
        const doc = {
          name: file.name,
          data: EJSON.toJSONValue(data),
        };

        call('sendFile', doc).then(response => {
          dispatch({ type: 'ATTACHMENT_SENT' });

          const attachment = Object.assign({ url: response.url }, fileInfo);

          // send message with attachment
          // QUESTION: Do we need to make 2 calls to send a message with attachment?
          this.sendMessage('This message has an attachment', [attachment])(dispatch, getState);
        });
      },
    });
  };