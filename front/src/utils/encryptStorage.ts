import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptedStorage = async <T>(key: string, data: T) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('setEncryptedStorage error', error);
  }
};

const getEncryptedStorage = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('getEncryptedStorage error', error);
  }
};

const removeEncryptedStorage = async (key: string) => {
  try {
    const data = await getEncryptedStorage(key);

    if (data) {
      await EncryptedStorage.removeItem(key);
    }
  } catch (error) {
    console.log('removeEncryptedStorage error', error);
  }
};

export {setEncryptedStorage, getEncryptedStorage, removeEncryptedStorage};
