
import {
    GET_MEMBERS,
    GET_MEMBERS_SUCCESS,
    GET_CHATS,
    GET_CHATS_SUCCESS,
    GET_CHATS_ERROR,
    CHANGE_CHAT,
    CREATE_CHAT,
    SEARCH_MEMBER,
    SEND_MESSAGE,
    UPDATE_STATUS
} from '../constants/actionTypes';


import contactsData from "../data/chat.members.json";
import chatsData from "../data/chat.chats.json";



export const getMembers = () => ({
    type: GET_MEMBERS
});

export const getMembersSuccess = (members, currentUser) => {
    return ({
        type: GET_MEMBERS_SUCCESS,
        payload: { members, currentUser }
    })
};

export const getAllMembers = () => dispatch => {
    dispatch(getMembers());
    const members = contactsData.data;
    const currentUser = members[0];
    dispatch(getMembersSuccess(members, currentUser));
};


export const beginChats = (userId) => ({
    type: GET_CHATS,
    payload:  userId
});
export const getChatsSuccess = (chats, selectedUser) => ({
    type: GET_CHATS_SUCCESS,
    payload: { chats, selectedUser }
});

export const getchatsError = (error) => ({
    type: GET_CHATS_ERROR,
    payload: error
});

export const getAllChats = (userId) => dispatch => {
    dispatch(beginChats());
    let chats = chatsData.data;
    chats = chats.filter(x => x.users.includes(userId));
    const selectedUser = chats[0].users.find(x => x != userId);
    dispatch(getChatsSuccess(chats, selectedUser));
}

export const changeChat = (userId) => ({
    type: CHANGE_CHAT,
    payload: userId
});

export const searchMember = (keyword) => ({
    type: SEARCH_MEMBER,
    payload: keyword
});

export const sendMessageToChat = (currentUserId,selectedUserId,message,allchats) => ({
    type: SEND_MESSAGE,
    payload: {currentUserId,selectedUserId,message,allchats}
});

export const sendMessage = (currentUserId,selectedUserId,message,allChats) => dispatch => {

    dispatch(sendMessageToChat(currentUserId,selectedUserId,message,allChats));

    let chat = allChats.find(x => x.users.includes(currentUserId) && x.users.includes(selectedUserId))
    const now = new Date();
    const time =  now.getHours() + ":" + now.getMinutes();

    if (chat) {
        chat.messages.push({
            sender: currentUserId,
            time: time,
            text: message
        });
        chat.lastMessageTime = time;
        let chats = (allChats.filter(x => x.id != chat.id));
        chats.splice(0, 0, chat)

        dispatch(getChatsSuccess(chats,selectedUserId));
    }
}

export const createChat = (currentUserId,selectedUserId,allChats) => ({
    type: CREATE_CHAT,
    payload: {currentUserId,selectedUserId,allChats}
});

export const createNewChat = (currentUserId,selectedUserId,allChats) => dispatch => {
    dispatch(createChat(currentUserId,selectedUserId,allChats));

    let conversation = {
        id: allChats.length + 1,
        users: [currentUserId, selectedUserId],
        lastMessageTime: "-",
        messages: []
    };
    allChats.splice(0, 0, conversation)

    dispatch(getChatsSuccess(allChats,selectedUserId));
}

export const CurrentUserUpdateStatus = (currentStatus) => ({
    type: UPDATE_STATUS,
    payload: currentStatus
});
