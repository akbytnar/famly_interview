import SessionData from "./SessionData";
import axios from "axios/index";

let RequestsController;

export default RequestsController = (function () {

    let getChildren = function () {
        return axios.get(`https://tryfamly.co/api/daycare/tablet/group`, {
            params: {
                accessToken: SessionData.token,
                groupId: SessionData.groupId,
                institutionId: SessionData.institutionId
            }
        }).then(response => {
            return response.data.children;
        });
    };
    let checkIn = function (childId, pickupTime) {
        const params = new URLSearchParams();
        params.append('accessToken', SessionData.token);
        params.append('pickupTime', pickupTime);
        return axios.post('https://tryfamly.co/api/v2/children/' + childId + '/checkins', params).then(response => {
            return response;
        });
    };
    let checkOut = function (childId) {
        const params = new URLSearchParams();
        params.append('accessToken', SessionData.token);
        return axios.post('https://tryfamly.co/api/v2/children/' + childId + '/checkout', params).then(response => {
            return response;
        });
    };

    return {
        getChildren,
        checkIn,
        checkOut

    }
})()