import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox($name1: String!, $name2: String!) {
        createChatBox(name1: $name1, name2: $name2) {
            type
            msg
        }
    }
`;

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($from: String!, $to: String!, $body: String!) {
        createMessage(from: $from, to: $to, body: $body) {
            type
            msg
        }
    }
`;

export const START_LOGIN_MUTATION = gql`
    mutation startLogin($username: String!, $password: String!) {
        startLogin(username: $username, password: $password) {
            type
            msg
        }
    }
`;

export const START_SIGNUP_MUTATION = gql`
    mutation startSignup($username: String!, $password: String!) {
        startSignup(username: $username, password: $password) {
            type
            msg
        }
    }
`;

export const DELETE_CACHE = gql`
    mutation deleteCache($name1: String!, $name2: String!) {
        deleteCache(name1: $name1, name2: $name2) {
            type
            msg
        }
    }
`;