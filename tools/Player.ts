import { ref, remove } from 'firebase/database';
import { set } from 'react-hook-form';
import { auth, database } from '../pages/_app';

export const handleOnClickPlay = (id: string) => {
  set(ref(database, `watching/${auth.currentUser?.uid}`), id);
};

export const handleOnClickStop = () => {
  remove(ref(database, `watching/${auth.currentUser?.uid}`));
};
