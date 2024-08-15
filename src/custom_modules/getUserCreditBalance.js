import Cookies from 'js-cookie';
import axios from 'axios';

export async function getUserCreditBalance() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const retrieveUserCreditBalanceUrl = backendUrl + 'front-api/user-credit-balance';

    // console.log('init the custom module getUserCreditBalance()');
    // console.log(`backendUrl in the custom module getUserCreditBalance(): ${backendUrl}`);
    // console.log(`retrieveUserCreditBalanceUrl in the custom module getUserCreditBalance(): ${retrieveUserCreditBalanceUrl}`);

    const accessToken = Cookies.get('accessToken');
    
    // console.log("accessToken in getUserCreditBalance() module: ");
    // console.log(accessToken);

    try {

        const response = await axios.get(retrieveUserCreditBalanceUrl, {

            params : {

                accessToken: accessToken

            }

        });

        // console.log('response.data: ')
        // console.log(response.data);
        
        if (response.data.newCreditBalance || response.data.newCreditBalance === 0) {

            return response.data.newCreditBalance

        }

    } catch (error) {

        console.error(error);
        return false;

    }

};