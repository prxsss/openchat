import useGetUsers from '../hooks/useGetUsers';

import { HiMiniUserPlus } from 'react-icons/hi2';
import AddFriendCards from './AddFriendCards';

const AddFriendButton = () => {
  const { users, getUsers, loading } = useGetUsers();

  const handleSearch = (e) => {
    getUsers(e.target.value);
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-circle btn-primary absolute bottom-20 right-6 shadow-lg"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        <HiMiniUserPlus size={21} />
      </button>
      <dialog id="my_modal_3" className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Add Friend</h3>
          <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={handleSearch}
                type="text"
                className="grow"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="mt-4">
            <AddFriendCards users={users} loading={loading} />
          </div>
        </div>
      </dialog>
    </>
  );
};
export default AddFriendButton;
