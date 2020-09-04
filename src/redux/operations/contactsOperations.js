import axios from "axios";
import contactsActions from "../contacts/contactsActions";

const addContactOperation = (contact) => async (dispatch) => {
  // добавить лоадер On
  // dispatch(contactsActions.addContactReequest()); // сброс ошибки (который делается не так)
  try {
    const result = await axios.post(
      "https://hw-07-async-redux.firebaseio.com/contacts.json",
      contact
    );
    dispatch(
      contactsActions.addContactSuccess({
        ...contact,
        id: result.data.name,
      })
    );
  } catch (error) {
    console.log("error-add", error);
    dispatch(contactsActions.addErrorContact(error));
  } finally {
    // LoaderOff()
  }
};

const getContactOperation = () => async (dispatch) => {
  // добавить лоадер On
  // dispatch(contactsActions.addToContacts()); // сброс ошибки (который делается не так)
  try {
    const result = await axios.get(
      "https://hw-07-async-redux.firebaseio.com/contacts.json"
    );
    const entries = Object.entries(result.data);
    const items = entries.map((item) => ({ id: item[0], ...item[1] }));
    dispatch(contactsActions.getContactSuccess(items));
  } catch (error) {
    console.log("error-get", error);
    dispatch(contactsActions.getErrorContact(error));
  } finally {
    // LoaderOff()
  }
};

const removeContactOperation = (id) => async (dispatch) => {
  try {
    const result = await axios.delete(
      `https://hw-07-async-redux.firebaseio.com/contacts/${id}.json`
    );
    dispatch(contactsActions.removeContact(id));
  } catch (error) {
    // error
  } finally {
    // LoaderOff()
  }
  //   dispatch(actions.removeContactRequest());
  //   axios
  //     .delete(https://redux-async.firebaseio.com/contacts/${id}.json)
  // .then(() => {
  //   console.log(id,"SuccessID")
  //   dispatch(actions.removeContactSuccess(id))})
  //     .catch(error => {
  //       console.log(error,"error")
  //       dispatch(actions.removeContactError(error))});
};

export default {
  addContactOperation,
  getContactOperation,
  removeContactOperation,
};
